import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './components/Home';
import ShopCategory from './components/ShopCategory';
import Signup from './components/Signup';
import Login from './components/Login';
import ContactUs from './components/Contactus'; // Import ContactUs
import Shop from './components/Shop'; // Import Shop
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopcategory" element={<ShopCategory />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} /> {/* Add ContactUs */}
          <Route path="/shop" element={<Shop />} /> {/* Add Shop */}
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
