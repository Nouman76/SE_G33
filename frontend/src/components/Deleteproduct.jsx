import React, { useState } from "react";
import axios from "axios";
import "../styles/Deleteproduct.css";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/products/${productId}`);
      alert("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      alert("Error deleting product!");
    }
  };

  return (
    <div className="delete-product-container">
      <h2>Delete Product</h2>
      <input 
        type="text" 
        placeholder="Enter Product ID" 
        value={productId} 
        onChange={(e) => setProductId(e.target.value)} 
        required 
      />
      <button className="delete-product-button" onClick={handleDelete}>
        Delete Product
      </button>
    </div>
  );
};

export default DeleteProduct;
