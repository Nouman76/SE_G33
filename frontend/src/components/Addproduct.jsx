import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Form } from "bootstrap-4-react";
import "../styles/Addproduct.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Cat Food", 
    seller: "", 
  });

  const [sellerId, setSellerId] = useState("");

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token); 
        setSellerId(decoded.id); 
      }
    }, []);
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8000/products", { ...productData, seller: sellerId });
        alert("Product added successfully!");
        setProductData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          seller: "", 
        });
      } catch (error) {
        alert("Error adding product!");
      }
    };

  return (
    <Container className="add-product-container">
      {/* Title Section */}
      <Row>
        <Col>
          <div className="title">Add Product</div>
        </Col>
      </Row>

      {/* Product Name */}
      <Row>
        <Col md={12}>
          <div className="product-label">Product Name</div>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>

      {/* Description */}
      <Row>
        <Col md={12}>
          <div className="description-label">Description</div>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>

      {/* Price */}
      <Row>
        <Col md={12}>
          <div className="product-label">Price</div>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>

      {/* Stock */}
      <Row>
        <Col md={12}>
          <div className="product-label">Stock</div>
          <input
            type="number"
            name="stock"
            placeholder="Enter available stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>

      {/* Category Dropdown */}
      <Row>
        <Col md={12}>
          <div className="product-label">Category</div>
          <Form.Select
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          >
            <option value="Cat Food">Cat Food</option>
            <option value="Cat Accessories">Cat Accessories</option>
            <option value="Dog Food">Dog Food</option>
            <option value="Dog Accessories">Dog Accessories</option>
            <option value="Pet Medicine">Pet Medicine</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row>
        <Col md={12}>
          <div className="add-product-btn" onClick={handleSubmit}>
            Add Product
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
