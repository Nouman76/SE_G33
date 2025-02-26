import React from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import "../styles/ShopCategory.css";
import img from "../assets/home1.png";

const ShopCategory = () => {
  return (
    <div className="shop-category">
      <Container>
        {/* Section Header */}
        <div className="shop-category-cat">
          <Row>
            <Col md={6} className="category-title">
              <div className="category-title-text">Best Selling - Cat Food</div>
            </Col>
            <Col md={6} className="view-all-container">
              <div className="view-all-btn">View All ➝</div>
            </Col>
          </Row>
        </div>

        {/* Product Display Section */}
       <Container>
       <div className="display-products">
          <Row>
            {/* 3 Equal Columns */}
            {[1, 2, 3].map((_, index) => (
              <Col md={4} key={index}>
                <Row className="product-row">
                  {/* Image on Left */}
                  <Col md={5}>
                    <div className="product-img-container">
                      <img src={img} alt="Sample Product" className="product-img" />
                    </div>
                  </Col>
                  {/* Product Details on Right */}
                  <Col md={7}>
                    <div className="product-details">
                      <div className="product-category">Cat Food</div>
                      <div className="product-name">Sample Product {index + 1}</div>
                      <div className="shop-now" onClick={() => window.location.href = "/product-detail"}>
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
      </Container>
    </div>
  );
};

export default ShopCategory;
