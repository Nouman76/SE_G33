import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import img from "../assets/product.png";
import { useCart } from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}`)
      .then(res => {
        const productData = res.data;
        console.log("Fetched product:", productData); // Debug
        setProduct(productData);
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Adding to cart:", {
        ...product,
        id: product._id // Ensure ID is properly set
      });
      addToCart(product);
    }
  };

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
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
