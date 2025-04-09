import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../styles/ShopPage.css";

const ShopPage = () => {
  const { categoryName } = useParams();  // Get the category from the URL if it exists
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products for:", categoryName || "All Products");
    fetchProducts(categoryName);
  }, [categoryName]);

  const fetchProducts = async (category) => {
    try {
      let url = "http://localhost:8000/products";
      if (category) {
        url += `?search=${encodeURIComponent(category)}`;
      }

      const response = await axios.get(url);
      console.log("API Response:", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products!");
    }
  };

  return (
    <div className="shop-page">
      <h2>Showing Products {categoryName ? `for: ${categoryName}` : " - All"}</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <p><em>{product.category}</em></p>
            </div>
          ))
        ) : (
          <p>No products found{categoryName ? " in this category" : ""}.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
