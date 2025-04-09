import React, { useState } from "react";
import AddProduct from "./Addproduct";
import ViewProducts from "./Viewproduct";
import "../styles/Admindashboard.css";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState(null);

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
