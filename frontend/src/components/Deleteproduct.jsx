import React, { useState } from "react";
import axios from "axios";
import "../styles/Deleteproduct.css";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!productId) {
      setErrorMessage("Please enter a Product ID.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/products/${productId}`);
      setSuccessMessage("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      setErrorMessage("Error deleting product!");
    }
  };

  return (
    <div className="delete-product-container">
      <h2>Delete Product</h2>

      {successMessage && <div className="ssssuccess-message">{successMessage}</div>}
      {errorMessage && <div className="eeeerror-message">{errorMessage}</div>}

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
