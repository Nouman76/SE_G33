import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './components/Landing';
import Home from './components/Home'; // Assume you have a Home component
import './App.css'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
