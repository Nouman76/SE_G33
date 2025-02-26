import React from 'react';
import '../styles/Footer.css';
import LinkedInIcon from '../assets/Linkedin.svg';
import FacebookIcon from '../assets/Facebook.svg';
import InstagramIcon from '../assets/Instagram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="logo">ECOMMERCE</h2>
          <p className="footer-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at congue risus. Sed commodo dapibus urna eget malesuada. Suspendisse sed lectus ex.
          </p>
          <div className="social-icons">
            <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
            <img src={FacebookIcon} alt="Facebook" className="social-icon" />
            <img src={InstagramIcon} alt="Instagram" className="social-icon" />
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><a href="/gaming">Gaming</a></li>
            <li><a href="/computer">Computer</a></li>
            <li><a href="/laptop">Laptop</a></li>
            <li><a href="/handphone">Handphone</a></li>
            <li><a href="/accessories">Accessories</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="/shop">Shop</a></li>
            <li><a href="/service-device">Service Device</a></li>
            <li><a href="/training">Training</a></li>
            <li><a href="/business">Business</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li>+6231273732463</li>
            <li><a href="mailto:admin@qommarket.xom">admin@qommarket.xom</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <p className="footer-legal">© qommarket.xom. All rights reserved</p>
        <a href="/terms-and-conditions" className="footer-terms">Terms & Condition</a>
      </div>
    </footer>
  );
};

export default Footer;
