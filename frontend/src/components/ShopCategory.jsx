import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ added to handle API calls
import "../styles/ShopCategory.css";
import img from "../assets/product.png";

const categories = [
  { title: "Best Selling - Cat Food", category: "Cat Food" },
  { title: "Best Selling - Dog Food", category: "Dog Food" },
  { title: "Best Selling - Cat Accessories", category: "Cat Accessories" },
  { title: "Best Selling - Dog Accessories", category: "Dog Accessories" },
];

const ShopCategory = () => {
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    // Fetch products for each category from backend
    categories.forEach(async (cat) => {
      try {
        const response = await axios.get(`http://localhost:8000/products?search=${encodeURIComponent(cat.category)}`);
        // Store the fetched products for each category
        setCategoryProducts(prev => ({
          ...prev,
          [cat.category]: response.data.slice(0, 3), // Fetch top 3 products
        }));
      } catch (error) {
        console.error(`Error fetching products for ${cat.category}:`, error);
        setCategoryProducts(prev => ({ ...prev, [cat.category]: [] }));
      }
    });
  }, []);

  return (
    <div className="shop-category">
      <Container>
        {categories.map((cat, catIndex) => (
          <div className="shop-category-cat" key={catIndex}>
            {/* Section Header */}
            <Row>
              <Col md={6} className="category-title">
                <div className="category-title-text">{cat.title}</div>
              </Col>
              <Col md={6} className="view-all-container">
                <div
                  className="view-all-btn"
                  onClick={() => navigate(`/shoppage`)} // Navigate to shop page without category filter
                  style={{ cursor: 'pointer' }}
                >
                  View All ➝
                </div>
              </Col>
            </Row>

            {/* Product Display Section */}
            <Container>
              <div className="display-products">
                <Row>
                  {/* Display up to 3 products for each category */}
                  {(categoryProducts[cat.category] || []).map((product, index) => (
                    <Col md={4} key={index}>
                      <Row className="product-row">
                        {/* Image on Left */}
                        <Col md={5}>
                          <div className="product-img-container">
                            <img src={img} alt={`${cat.category} Product`} className="product-img" />
                          </div>
                        </Col>
                        {/* Product Details on Right */}
                        <Col md={7}>
                          <div className="product-details">
                            <div className="product-category">{cat.category}</div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">Rs. {product.price}</div>
                            <div
                              className="shop-now"
                              onClick={() => navigate(`/product/${product._id}`)} 
                            >
                              Shop Now ➝
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default ShopCategory;
