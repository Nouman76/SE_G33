import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus, FaMinus, FaSave, FaTimes } from "react-icons/fa";
import img from "../assets/product.png";
import "../styles/Viewproduct.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Extract unique categories
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const sellerData = localStorage.getItem("seller");
   
      if (!sellerData) {
        alert("Seller data not found! Please log in again.");
        return;
      }
   
      const seller = JSON.parse(sellerData);
      const sellerId = seller._id;
   
      console.log("Seller ID:", sellerId);
   
      if (!sellerId) {
        alert("Seller ID not found! Please log in again.");
        return;
      }
   
      const response = await axios.get(`http://localhost:8000/products?sellerId=${sellerId}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products!");
    } finally {
      setLoading(false);
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
    if (stock <= 1) {
      if (window.confirm("Are you sure you want to remove this product? Stock will be set to 0.")) {
        try {
          await axios.put(`http://localhost:8000/products/${id}`, { stock: 0 });
          fetchProducts();
        } catch (error) {
          alert("Error updating stock!");
        }
      }
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
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:8000/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Error deleting product!");
      }
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

  // Function to truncate description text
  const truncateDescription = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const filteredProducts = products
    .filter(product => filterCategory ? product.category === filterCategory : true)
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     product.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="vip-products-container">
      <h1 className="vip-products-header">My Products</h1>
      
      <div className="vip-products-controls">
        <div className="vip-search-filter-container">
          <div className="vip-search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="vip-search-input"
            />
          </div>
          
          <div className="vip-filter-container">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="vip-category-filter"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button className="vip-refresh-button" onClick={fetchProducts}>
          Refresh Products
        </button>
      </div>

      {loading ? (
        <div className="vip-loading-spinner">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="vip-no-products">
          <p>No products found. {searchTerm || filterCategory ? "Try adjusting your search or filter." : ""}</p>
        </div>
      ) : (
        <div className="vip-products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="vip-product-card">
              <div className="vip-product-image">
                <img src={product.imageUrl || img} alt={product.name} />
                <div className="vip-product-category">{product.category}</div>
              </div>
              
              <div className="vip-product-details">
                <h3 className="vip-product-name">{product.name}</h3>
                <p className="vip-product-description" title={product.description}>
                  {truncateDescription(product.description)}
                </p>
                
                <div className="vip-product-meta">
                  <div className="vip-price-stock">
                    <p className="vip-product-price">${product.price.toFixed(2)}</p>
                    <p className={`vip-product-stock ${product.stock < 5 ? 'vip-low-stock' : ''}`}>
                      {product.stock === 0 ? (
                        <span className="vip-out-of-stock">Out of Stock</span>
                      ) : (
                        <>Stock: <strong>{product.stock}</strong></>
                      )}
                    </p>
                  </div>
                  
                  <div className="vip-stock-controls">
                    <button 
                      className="vip-stock-btn vip-decrease" 
                      onClick={() => handleDecreaseStock(product._id, product.stock)}
                      disabled={product.stock <= 0}
                    >
                      <FaMinus />
                    </button>
                    <span className="vip-stock-value">{product.stock}</span>
                    <button 
                      className="vip-stock-btn vip-increase" 
                      onClick={() => handleIncreaseStock(product._id, product.stock)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                
                <div className="vip-product-actions">
                  <button 
                    className="vip-edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="vip-delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="vip-edit-modal-overlay">
          <div className="vip-edit-modal">
            <div className="vip-edit-modal-header">
              <h3>Edit Product</h3>
              <button 
                className="vip-close-modal-btn"
                onClick={() => setEditingProduct(null)}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="vip-edit-product-form">
              <div className="vip-form-group">
                <label htmlFor="name">Product Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={editedProduct.name} 
                  onChange={handleEditChange} 
                  placeholder="Product Name" 
                  required 
                />
              </div>
              
              <div className="vip-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description" 
                  value={editedProduct.description} 
                  onChange={handleEditChange} 
                  placeholder="Description" 
                  required 
                />
              </div>
              
              <div className="vip-form-row">
                <div className="vip-form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input 
                    type="number" 
                    id="price"
                    name="price" 
                    value={editedProduct.price} 
                    onChange={handleEditChange} 
                    placeholder="Price" 
                    step="0.01"
                    min="0.01" 
                    required 
                  />
                </div>
                
                <div className="vip-form-group">
                  <label htmlFor="stock">Stock</label>
                  <input 
                    type="number" 
                    id="stock"
                    name="stock" 
                    value={editedProduct.stock} 
                    onChange={handleEditChange} 
                    placeholder="Stock" 
                    min="0" 
                    required 
                  />
                </div>
              </div>
              
              <div className="vip-form-group">
                <label htmlFor="category">Category</label>
                <input 
                  type="text" 
                  id="category"
                  name="category" 
                  value={editedProduct.category} 
                  onChange={handleEditChange} 
                  placeholder="Category" 
                  required 
                />
              </div>
              
              <div className="vip-form-group">
                <label htmlFor="imageUrl">Image URL (optional)</label>
                <input 
                  type="text" 
                  id="imageUrl"
                  name="imageUrl" 
                  value={editedProduct.imageUrl || ""} 
                  onChange={handleEditChange} 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              
              <div className="vip-form-actions">
                <button type="submit" className="vip-save-btn">
                  <FaSave /> Save Changes
                </button>
                <button 
                  type="button" 
                  className="vip-cancel-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;