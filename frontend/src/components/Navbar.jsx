import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import { useLocation, useNavigate} from "react-router-dom";
import FavouritesIcon from "../assets/heart.svg";
import CartIcon from "../assets/bag.svg";
import ProfileIcon from "../assets/profile.svg";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [activePath, setActivePath] = useState("");
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Save this logic for the profile page
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="custom-navbar">
      <Container>
        <Row>

          <Col md={2} className="all-category-btn">
              <span
               onClick={() => navigate(`/nearestpetcare`)}
               style={{ cursor: "pointer" }}>Nearby Pet Hospitals</span>
          </Col>

          <Col md={8} className="navu">
            <ul className="nav-links list-unstyled">
              <li>
                <button
                  className={activePath === "/" ? "active-btn" : ""}
                  onClick={() => (window.location.href = "./")}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className={activePath === "/about" ? "active-btn" : ""}
                  onClick={() => (window.location.href = "#about")}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className={activePath === "/shop" ? "active-btn" : ""}
                  onClick={() => (window.location.href = "./shoppage")}
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  className={activePath === "/blog" ? "active-btn" : ""}
                  onClick={() => (window.location.href = "#blog")}
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  className={activePath === "/contact" ? "active-btn" : ""}
                  onClick={() => (window.location.href = "./contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </Col>

          <Col md={2} className="icons-section">
            <div className="nav-icons">
              <img src={FavouritesIcon} alt="Favourites" />
              <img
                src={CartIcon}
                alt="Cart"
                className="clickable-icon"
                onClick={() => (window.location.href = "/shop")}
              />
              <img
                src={ProfileIcon}
                alt="Profile"
                className="clickable-icon"
                onClick={() => (window.location.href = isLoggedIn ? "/profile" : "/signup")}
              />
            </div>
          </Col>

          <Col xs={12} className="d-md-none text-center mt-3">
            <button className="btn btn-primary nav-toggle-btn" onClick={toggleNav}>
              {isNavCollapsed ? "Menu" : "Close"}
            </button>
            {!isNavCollapsed && (
              <ul className="nav-links-collapsed list-unstyled text-center mt-3">
                <li>
                  <button
                    className={activePath === "/" ? "active-btn" : ""}
                    onClick={() => (window.location.href = "#home")}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className={activePath === "/about" ? "active-btn" : ""}
                    onClick={() => (window.location.href = "#about")}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    className={activePath === "/shop" ? "active-btn" : ""}
                    onClick={() => (window.location.href = "#shop")}
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    className={activePath === "/blog" ? "active-btn" : ""}
                    onClick={() => (window.location.href = "#blog")}
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    className={activePath === "/contact" ? "active-btn" : ""}
                    onClick={() => (window.location.href = "#contact")}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
