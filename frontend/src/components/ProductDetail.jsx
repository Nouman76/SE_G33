import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import img from "../assets/product.png";
import { useCart } from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const apiBaseUrl = process.env.REACT_APP_BACKEND_URI;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loginError, setLoginError] = useState("");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [id, apiBaseUrl]);

  const handleAddToCart = () => {
    setLoginError("");

    if (!isLoggedIn) {
      setLoginError("Please login to add and purchase products");
      return;
    }

    addToCart(product);
    window.location.href = "../shoppage";
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-page">
      {loginError && (
        <div className="error-banner">
          {loginError}
        </div>
      )}

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
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review, idx) => (
                <div key={idx} className="review">
                  <div className="review-header">
                    <span className="review-author">{review.buyer}</span>
                    <span className="review-rating">⭐ {review.rating}/5</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
