import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "bootstrap-4-react";
import axios from "axios";
import "../styles/ShopPage.css"; // Reuse styles from ShopCategory.css
import img from "../assets/product.png"; // Default product image

const ShopPage = () => {
  const { categoryName } = useParams(); // Get the category from the URL if it exists
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
          <Col md={6} className="category-header">
            <div className="category-title">
              Showing Products {categoryName ? `for: ${categoryName}` : " - All"}
            </div>
          </Col>
          <Col md={6} className="view-all">
            <div
              className="view-all-btn"
              onClick={() => navigate(`/shoppage`)} // Navigate to shop page without category filter
              style={{ cursor: "pointer" }}
            >
              View All
            </div>
          </Col>
        </Row>

        <Row className="product-list">
          {/* Display products in a similar layout */}
          {products.length > 0 ? (
            products.map((product, index) => (
              <Col md={4} key={index}>
                <Row className="product-card">
                  {/* Product Image */}
                  <Col md={5} className="product-image-col">
                    <div className="product-img-cont">
                      <img src={img} alt={`${product.name} Image`} className="product-img" />
                    </div>
                  </Col>

                  {/* Product Description */}
                  <Col md={7} className="product-description-col">
                    <div className="product-description">
                      {/* Product Category */}
                      <Row>
                        <Col md={12}>
                          <div className="product-category">{product.category}</div>
                        </Col>
                      </Row>

                      {/* Product Name */}
                      <Row>
                        <Col md={12}>
                          <div className="product-name">{product.name}</div>
                        </Col>
                      </Row>

                      {/* Price and Buy Button */}
                      <Row>
                        <Col md={6} className="product-price-col">
                          <div className="product-price">Rs. {product.price}</div>
                        </Col>
                        <Col md={6} className="product-buy-btn-col">
                        <div
  className="buy-btn"
  onClick={() => navigate(`/product/${product._id}`)} // Corrected path
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
