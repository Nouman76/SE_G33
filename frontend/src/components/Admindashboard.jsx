import React, { useState } from "react";
import AddProduct from "./Addproduct";
import ViewProducts from "./Viewproduct";
import "../styles/Admindashboard.css";
import { Link, useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear all seller-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    localStorage.removeItem("sellerId");
    
    // Redirect to admin login page
    navigate("/admin");
  };
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="admin-title">Admin Panel</div>
        <div className="title-border"></div> {/* Border under heading */}
        <ul>
          <li onClick={() => setSelectedPage("add-product")}>
            Add Product
          </li>
          <li onClick={() => setSelectedPage("view-products")}>
            View My Products
          </li>
          <Link to="/seller/analytics" className="nav-link">
  View Analytics
</Link>
{/* Logout Button */}
<li className="logout-button" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>

      {/* Dynamic Content Area */}
      <div className="dynamic-content">
        {selectedPage === "add-product" && <AddProduct />}
        {selectedPage === "view-products" && <ViewProducts />}
      </div>
    </div>
  );
};

export default AdminDashboard;
