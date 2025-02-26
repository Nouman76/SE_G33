import React from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import SearchIcon from "../assets/search.svg"; // Replace with your actual image path
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="header">
      <Container>
        <Row className="header-row">
          <Col md={2} className="logo-container">
            <span className="top-logo">PET STORE</span>
          </Col>
          <Col md={8} className="search-bar-container">
            <input type="text" className="search-bar" placeholder="Search..." />
          </Col>
          <Col md={2} className="search-btn-container">
            <button className="search-btn">
              <img src={SearchIcon} alt="Search" className="search-icon" /> Search
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
