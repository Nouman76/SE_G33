import React from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import "../styles/ShopCategory.css";
import img from "../assets/product.png";

const categories = [
  { title: "Best Selling - Cat Food", category: "Cat Food" },
  { title: "Best Selling - Dog Food", category: "Dog Food" },
  { title: "Best Selling - Cat Accessories", category: "Cat Accessories" },
  { title: "Best Selling - Dog Accessories", category: "Dog Accessories" },
];

const ShopCategory = () => {
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
                <div className="view-all-btn">View All ➝</div>
              </Col>
            </Row>

            {/* Product Display Section */}
            <Container>
              <div className="display-products">
                <Row>
                  {[1, 2, 3].map((_, index) => (
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
                            <div className="product-name">Sample {cat.category} {index + 1}</div>
                            <div
                              className="shop-now"
                              onClick={() => window.location.href = "/product-detail"}
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
