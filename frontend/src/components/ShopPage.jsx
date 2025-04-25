import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "bootstrap-4-react";
import axios from "axios";
import "../styles/ShopPage.css";
import img from "../assets/product.png";
import Chatbot from "./Chatbot"; // Import the Chatbot component

// Helper function to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShopPage = () => {
  const { categoryName } = useParams();
  const queryParams = useQuery();
  const searchQuery = queryParams.get("search");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products first
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Apply filters when category or search query changes
    applyFilters();
  }, [categoryName, searchQuery, products]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/products");
      const fetchedProducts = Array.isArray(response.data) 
        ? response.data 
        : response.data.products || [];
        
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    // Filter by category if exists
    if (categoryName && categoryName !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }
    
    // Filter by search query if exists
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleSort = (type) => {
    let sorted = [...filteredProducts];
    
    if (type === "lowtohigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "hightolow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(sorted);
  };

  // Reset filters and show all products
  const handleViewAll = () => {
    navigate('/shoppage');
    setFilteredProducts(products);
  };

  // Clear search
  const handleClearSearch = () => {
    if (categoryName) {
      navigate(`/shoppage/category/${categoryName}`);
    } else {
      navigate('/shoppage');
    }
  };

  return (
    <div className="shop-page">
      <Container>
        <Row>
          <Col md={6} className="category-header">
            <div className="category-title">
              {searchQuery ? (
                <>Search Results for: <span className="hhighlight-term">"{searchQuery}"</span></>
              ) : categoryName ? (
                <>Category: <span className="hhighlight-term">{categoryName}</span></>
              ) : (
                "All Products"
              )}
            </div>
          </Col>
          <Col md={6} className="view-all">
            <div className="view-all-btn" onClick={handleViewAll}>
              View All
            </div>
            {searchQuery && (
              <div className="clear-search-btn" onClick={handleClearSearch}>
                Clear Search
              </div>
            )}
          </Col>
        </Row>

        {/* Sort Filter */}
        <Row className="sort-filter-row">
          <Col md={12} className="sort-buttons">
            <span onClick={() => handleSort("lowtohigh")} className="sort-btn">Low to High</span>
            <span onClick={() => handleSort("hightolow")} className="sort-btn">High to Low</span>
            <span onClick={() => applyFilters()} className="sort-btn">Reset</span>
          </Col>
        </Row>

        {/* Show loading indicator */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <Row className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Col md={4} key={product._id || index}>
                  <Row className="product-card">
                    <Col md={5} className="product-image-col">
                      <div className="product-img-cont">
                        <img 
                          src={product.image || img} 
                          alt={`${product.name} Image`} 
                          className="product-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = img;
                          }}
                        />
                      </div>
                    </Col>
                    <Col md={7} className="product-description-col">
                      <div className="product-description">
                        <Row><Col md={12}><div className="product-category">{product.category}</div></Col></Row>
                        <Row>
                          <Col md={12}>
                            <div className="product-name">
                              {/* Highlight search term in product name */}
                              {searchQuery ? (
                                <span dangerouslySetInnerHTML={{
                                  __html: product.name.replace(
                                    new RegExp(searchQuery, 'gi'),
                                    match => `<span class="highlight-term">${match}</span>`
                                  )
                                }} />
                              ) : (
                                product.name
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="product-price-col">
                            <div className="product-price">Rs. {product.price.toFixed(2)}</div>
                          </Col>
                          <Col md={6} className="product-buy-btn-col">
                            <div
                              className="buy-btn"
                              onClick={() => navigate(`/product/${product._id}`)}
                            >
                              Buy
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))
            ) : (
              <Col md={12} className="no-products-message">
                <p>
                  {searchQuery 
                    ? `No products found matching "${searchQuery}"` 
                    : categoryName 
                      ? `No products found in ${categoryName} category` 
                      : "No products available"}
                </p>
                {(searchQuery || categoryName) && (
                  <button className="view-all-products-btn" onClick={handleViewAll}>
                    View All Products
                  </button>
                )}
              </Col>
            )}
          </Row>
        )}
      </Container>
      
      {/* Add the Chatbot component */}
      <Chatbot />
    </div>
  );
};

export default ShopPage;