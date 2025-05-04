import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "bootstrap-4-react";
import axios from "axios";
import "../styles/ShopPage.css"; 
import img from "../assets/product.png"; 

const ShopPage = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching products for:", categoryName || "All Products");
    fetchProducts(categoryName);
  }, [categoryName]);

  const fetchProducts = async (category) => {
    try {
      let url = "http://localhost:8000/products";
      if (category) {
        url += `?search=${encodeURIComponent(category)}`;
      }

      const response = await axios.get(url);
      console.log("API Response:", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products!");
    }
  };

  return (
    <div className="shop-page">
      <Container>
        <Row>
          <Col md={6} className="category-title">
            <div className="category-title-text">
              Showing Products {categoryName ? `for: ${categoryName}` : " - All"}
            </div>
          </Col>
          <Col md={6} className="view-all-container">
            <div
              className="view-all-btn"
              onClick={() => navigate(`/shoppage`)} 
              style={{ cursor: 'pointer' }}
            >
              View All
            </div>
          </Col>
        </Row>

        <Row className="display-products">
          
          {products.length > 0 ? (
            products.map((product, index) => (
              <Col md={4} key={index}>
                <Row className="product-row">
                 
                  <Col md={5}>
                    <div className="product-img-container">
                      <img src={img} alt={`${product.name} Image`} className="product-img" />
                    </div>
                  </Col>
                 
                  <Col md={7}>
                    <div className="product-details">
                      <div className="product-category">{product.category}</div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">Rs. {product.price}</div>
                      <div
                        className="shop-now"
                        onClick={() => window.location.href = `/product-detail/${product._id}`}
                      >
                        Buy
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))
          ) : (
            <Col md={12}>
              <p>No products found {categoryName ? `for ${categoryName}` : ""}.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ShopPage;
