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
import { CartProvider } from "./components/CartContext"; // Import CartProvider
import SellerAnalytics from "./components/SellerAnalytics";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute"; 
import BlogPage from "./components/Blogpage";
import AboutUs from "./components/Aboutus"; // Import AboutUs component




function AppContent() {
  const location = useLocation();
  
  // Hide Header and Footer on all admin-related pages
  const isAdminPage = location.pathname.startsWith("/admin") || 
  location.pathname.startsWith("/seller/analytics")||
  location.pathname.startsWith("/sellersignup") ;

  return (
    <div className="App">
      {!isAdminPage && <Header />}
      <CartProvider> {/* Wrap Routes with CartProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shopcategory" element={<ShopCategory />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nearestpetcare" element={<NearestPetCare />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shoppage" element={<ShopPage />} />
          <Route path="/shop-category/:categoryName" element={<ShopPage />} />
               {/* Admin login page (unprotected) */}
               <Route path="/admin" element={<Admin />} />
          
          {/* Protected admin/seller routes */}
          <Route path='/seller/analytics' element={
            <ProtectedRoute>
              <SellerAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/sellersignup" element={
            
              <SellerSignup />
            
          } />
          <Route path="/admindashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/add-product" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/delete-product" element={
            <ProtectedRoute>
              <DeleteProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/view-products" element={
            <ProtectedRoute>
              <ViewProducts />
            </ProtectedRoute>
          } />
        </Routes>
      </CartProvider>
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
