import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './components/Home';
import ShopCategory from './components/ShopCategory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopcategory" element={<ShopCategory />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
