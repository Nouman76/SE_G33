// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import img from "../assets/product.png"; // fallback image if needed

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image || img} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> Rs. {product.price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
