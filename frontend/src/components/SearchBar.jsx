import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import SearchIcon from "../assets/search.svg";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products"); // Fetch all products once
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []); // Fetch products only once on mount

  useEffect(() => {
    if (!query.trim()) {
      setResults([]); // Clear results if input is empty
      return;
    }

    // **Filter products that match the query (case-insensitive)**
    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  }, [query, allProducts]); // Re-filter when query changes

  return (
    <div className="header">
      <Container>
        <Row className="header-row">
          <Col md={2} className="logo-container">
            <span className="top-logo">PET STORE</span>
          </Col>
          <Col md={8} className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={2} className="search-btn-container">
            <button className="search-btn">
              <img src={SearchIcon} alt="Search" className="search-icon" /> Search
            </button>
          </Col>
        </Row>

        {/* 🔍 Live Search Results Popup */}
        {results.length > 0 && (
          <div className="search-results">
            {results.map((product) => (
              <div key={product._id} className="search-result-item">
                <img src={product.image} alt={product.name} className="search-result-img" />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SearchBar;
