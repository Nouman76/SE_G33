import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../styles/Viewproduct.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

   const fetchProducts = async () => {
     try {
       const sellerData = localStorage.getItem("seller");
   
       if (!sellerData) {
         alert("Seller data not found! Please log in again.");
         return;
       }
   
       const seller = JSON.parse(sellerData); // Convert string to object
       const sellerId = seller._id; // Extract seller ID
   
       console.log("Seller ID:", sellerId);
   
       if (!sellerId) {
         alert("Seller ID not found! Please log in again.");
         return;
       }
   
       const response = await axios.get(`http://localhost:8000/products?sellerId=${sellerId}`);
       setProducts(response.data);
     } catch (error) {
       alert("Error fetching products!");
     }
   };

  const handleIncreaseStock = async (id, stock) => {
    try {
      await axios.put(`http://localhost:8000/products/${id}`, { stock: stock + 1 });
      fetchProducts();
    } catch (error) {
      alert("Error updating stock!");
    }
  };

  const handleDecreaseStock = async (id, stock) => {
    if (stock === 1) {
      handleDelete(id);
      return;
    }
    try {
      await axios.put(`http://localhost:8000/products/${id}`, { stock: stock - 1 });
      fetchProducts();
    } catch (error) {
      alert("Error updating stock!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Error deleting product!");
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product); 
    setEditingProduct(product._id);
    setEditedProduct(product);
  };

  const handleEditChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/products/${editingProduct}`, editedProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert("Error updating product!");
    }
  };

  return (
    <div className="view-products-container">
  <h2 className="view-products-header">My Products</h2>
  <div className="view-products-grid">
    {products.map((product) => (
      <div key={product._id} className="view-products-card">
        <strong className="product-name">{product.name}</strong>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: <strong>${product.price}</strong></p>
        <p className="product-stock">Stock: <strong>{product.stock}</strong></p>
        
        <div className="buttons">
          <button onClick={() => handleIncreaseStock(product._id, product.stock)}>+</button>
          <input type="number" value={product.stock} readOnly />
          <button onClick={() => handleDecreaseStock(product._id, product.stock)}>-</button>
        </div>
        
        <div className="icons">
          <FaTrash className="icon" onClick={() => handleDelete(product._id)} />
          <FaEdit className="icon" onClick={() => { console.log("Edit button clicked"); handleEdit(product); }} />

        </div>
      </div>
    ))}
  </div>



      {editingProduct && (
        <div className="edit-form-container">
          <h3>Edit Product</h3>
          <form onSubmit={handleEditSubmit}>
            <input type="text" name="name" value={editedProduct.name} onChange={handleEditChange} placeholder="Product Name" required />
            <input type="text" name="description" value={editedProduct.description} onChange={handleEditChange} placeholder="Description" required />
            <input type="number" name="price" value={editedProduct.price} onChange={handleEditChange} placeholder="Price" required />
            <input type="text" name="category" value={editedProduct.category} onChange={handleEditChange} placeholder="Category" required />
            <input type="number" name="stock" value={editedProduct.stock} onChange={handleEditChange} placeholder="Stock" required />
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;