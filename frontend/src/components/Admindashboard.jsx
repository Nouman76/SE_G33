// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admindashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/admin/add-product">Add Product</Link></li>
          {/* <li><Link to="/admin/delete-product">Delete Product</Link></li> */}
          <li><Link to="/admin/view-products">View My Products</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
