import React, { useState } from "react";
import axios from "axios";
import "../styles/Addproduct.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    seller: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/products", productData);
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
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={productData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={productData.stock} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={productData.category} onChange={handleChange} required />
        <input type="text" name="seller" placeholder="Seller ID" value={productData.seller} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
