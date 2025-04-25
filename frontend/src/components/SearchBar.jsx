import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "bootstrap-4-react";
import SearchIcon from "../assets/search.svg";
import productImg from "../assets/product.png"; 
import "../styles/SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        console.log("Fetched product data:", data);

        setAllProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
    setShowResults(true);
  }, [query, allProducts]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowResults(false);
    setQuery("");
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/shoppage?search=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <Container>
        <Row className="header-row">
          <Col md={2} className="logo-container">
            <Link to="/" className="top-logo">PAW PAL</Link>
          </Col>
          <Col md={8} className="search-container">
            <div className="search-bar-wrapper">
              <input
                type="text"
                className="search-bar"
                placeholder="Search for pet products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              
              {showResults && results.length > 0 && (
                <div className="search-results">
                  {results.map((product) => (
                    <div 
                      key={product._id} 
                      className="search-result-item"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="search-result-img-container">
                        <img 
                          src={productImg}
                          alt={product.name} 
                          className="search-result-img" 
                        />
                      </div>
                      <div className="search-result-details">
                        <p className="search-result-name">{product.name}</p>
                        <p className="search-result-price">Rs.{product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="see-all-results" onClick={handleSearchSubmit}>
                    See all results for "{query}"
                  </div>
                </div>
              )}
              
              {showResults && query.trim() && results.length === 0 && (
                <div className="search-results">
                  <div className="no-results">No products found matching "{query}"</div>
                </div>
              )}
            </div>
          </Col>
          <Col md={2} className="search-btn-container">
            <button className="search-btn" onClick={handleSearchSubmit}>
              <img src={SearchIcon} alt="Search" className="search-icon" /> Search
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;