import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import Home from "./components/Home";
import ShopCategory from "./components/ShopCategory";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ContactUs from "./components/Contactus";
import Shop from "./components/Shop";
import Admin from "./components/Admin";
import AdminDashboard from "./components/Admindashboard";
import AddProduct from "./components/Addproduct";
import DeleteProduct from "./components/Deleteproduct";
import ViewProducts from "./components/Viewproduct";
import SellerSignup from "./components/SellerSignup";
import ShopPage from "./components/ShopPage";
import Profile from "./components/Profile";
import NearestPetCare from './components/NearestPetCare';
import ProductDetail from "./components/ProductDetail";

import "./App.css";

function AppContent() {
  const location = useLocation();
  
  // Hide Header and Footer on all admin-related pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shopcategory" element={<ShopCategory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nearestpetcare" element={<NearestPetCare />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shoppage" element={<ShopPage />} />
        <Route path="/shop-category/:categoryName" element={<ShopPage />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        {/* Admin-related routes without Header/Footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminsignup" element={<SellerSignup />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/delete-product" element={<DeleteProduct />} />
        <Route path="/admin/view-products" element={<ViewProducts />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
