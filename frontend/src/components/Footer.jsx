import React from 'react';
import { Container } from 'bootstrap-4-react';
import '../styles/Footer.css';
import LinkedInIcon from '../assets/Linkedin.svg';
import FacebookIcon from '../assets/Facebook.svg';
import InstagramIcon from '../assets/Instagram.svg';

const Footer = () => {
  return (
      <div className="footer">
         <Container>
        <div className="footer-container">
            <div className="footer-section">
              <h2 className="logo">PAW PAL</h2>
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
              <li><a href="/gaming">Cat Food</a></li>
              <li><a href="/computer">Dog Food</a></li>
              <li><a href="/laptop">Cat Accessories</a></li>
              <li><a href="/handphone">Dog Accessories</a></li>
              <li><a href="/accessories">Pets Medicine</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="/shop">Shop</a></li>
              <li><a href="/service-device">Nearby Hospitals</a></li>
              <li><a href="https://www.tcsexpress.com/track/" target="_blank" rel="noopener noreferrer">Track Order</a></li>

              <li><a href="/business">Order History</a></li>
              <li><a href="/business">Register Store</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>+6231273732463</li>
              <li><a href="mailto:admin@qommarket.xom">admin@se_g33.xom</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="footer-legal">© se_g33.xom. All rights reserved</p>
          <a href="/terms-and-conditions" className="footer-terms">Terms & Condition</a>
        </div>
      </Container>
      </div>
    
  );
};

export default Footer;