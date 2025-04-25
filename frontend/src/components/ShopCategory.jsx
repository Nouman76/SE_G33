import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../styles/ShopCategory.css";
import img from "../assets/product.png";

const categories = [
  { title: "Best Selling - Cat Food", category: "Cat Food" },
  { title: "Best Selling - Dog Food", category: "Dog Food" },
  { title: "Best Selling - Cat Accessories", category: "Cat Accessories" },
  { title: "Best Selling - Dog Accessories", category: "Dog Accessories" },
  { title: "Best Selling - Pet Medicines", category: "Pet Medicine" },
];

const ShopCategory = () => {
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState({});

  const handleRedirect = (category) => {
    console.log(`Redirecting to category: ${category}`);
    navigate(`/shop-category/${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    categories.forEach(async (cat) => {
      try {
        const response = await axios.get(`http://localhost:8000/products?search=${encodeURIComponent(cat.category)}`);
        setCategoryProducts(prev => ({
          ...prev,
          [cat.category]: response.data.slice(0, 3), 
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
            <Row>
              <Col md={6} className="category-title">
                <div className="category-title-text">{cat.title}</div>
              </Col>
              <Col md={6} className="view-all-container">
                <div
                  className="view-all-button"
                  onClick={() => handleRedirect(cat.category)} 
                  style={{ cursor: 'pointer' }}
                >
                  View All ➝
                </div>
              </Col>
            </Row>
            <Container>
              <div className="display-products">
                <Row>
                  {(categoryProducts[cat.category] || []).map((product, index) => (
                    <Col md={4} key={index}>
                      <Row className="product-row">
                        <Col md={5}>
                          <div className="product-img-container">
                            <img src={img} alt={`${cat.category} Product`} className="product-img" />
                          </div>
                        </Col>
                        <Col md={7}>
                          <div className="product-details">
                            <div className="product-category">{cat.category}</div>
                            <div className="product-name">{product.name}</div>
                            <div className="price-buy-container">
                              <div className="product-price">Rs. {product.price}</div>
                              <div
                                className="buy-button"
                                onClick={() => navigate(`/product/${product._id}`)}
                              >
                                Buy
                              </div>
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
