import React, { useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import Menu from "../assets/menu.svg";
import FavouritesIcon from "../assets/heart.svg";
import CartIcon from "../assets/bag.svg";
import ProfileIcon from "../assets/profile.svg";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="custom-navbar">
      <Container fluid>
        <Container>
          <Row>
            <Col md={2} className="all-category-btn">
              <img src={Menu} alt="Menu Icon" className="menu-icon me-2" />
              <span>All Category</span>
            </Col>

            <Col md={8} className="navu">
              <ul className="nav-links list-unstyled">
                <li>
                  <button onClick={() => window.location.href = "#home"}>Home</button>
                </li>
                <li>
                  <button onClick={() => window.location.href = "#about"}>About</button>
                </li>
                <li>
                  <button onClick={() => window.location.href = "#shop"}>Shop</button>
                </li>
                <li>
                  <button onClick={() => window.location.href = "#blog"}>Blog</button>
                </li>
                <li>
                  <button onClick={() => window.location.href = "#contact"}>Contact</button>
                </li>
              </ul>
            </Col>

            <Col md={2} className="icons-section">
              <div className="nav-icons">
                <img src={FavouritesIcon} alt="Favourites" />
                <img src={CartIcon} alt="Cart" />
                <img src={ProfileIcon} alt="Profile" />
              </div>
            </Col>

            <Col xs={12} className="d-md-none text-center mt-3">
              <button className="btn btn-primary nav-toggle-btn" onClick={toggleNav}>
                {isNavCollapsed ? "Menu" : "Close"}
              </button>
              {!isNavCollapsed && (
                <ul className="nav-links-collapsed list-unstyled text-center mt-3">
                  <li>
                    <button onClick={() => window.location.href = "#home"}>Home</button>
                  </li>
                  <li>
                    <button onClick={() => window.location.href = "#about"}>About</button>
                  </li>
                  <li>
                    <button onClick={() => window.location.href = "#shop"}>Shop</button>
                  </li>
                  <li>
                    <button onClick={() => window.location.href = "#blog"}>Blog</button>
                  </li>
                  <li>
                    <button onClick={() => window.location.href = "#contact"}>Contact</button>
                  </li>
                </ul>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Navbar;
