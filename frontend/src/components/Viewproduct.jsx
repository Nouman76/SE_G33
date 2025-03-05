import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Viewproduct.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        alert("Error fetching products!");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="view-products-container">
      <h2 className="view-products-header">My Products</h2>
      <ul className="view-products-list">
        {products.map((product) => (
          <li key={product._id} className="view-products-item">
            <strong>{product.name}</strong> - ${product.price} (Stock: {product.stock})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProducts;
