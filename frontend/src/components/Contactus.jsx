import React, { useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import "../styles/Contactus.css";

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setPhoneNumber(value);
  };

  return (
    <div className="contact-page">
      <Container>
        <Row>
          <Col>
            <div className="contact-title">Contact Us</div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="contact-subtitle">Leave a Message</div>
            <div className="yellow-underline"></div>
            <p className="contact-description">
              If you have any questions, please send us a message using the adjacent form, and we will get back to you as soon as possible.
            </p>
          </Col>
        </Row>

        <div className="contact-form">
          <Row>
            <Col md={6}>
              <input type="text" placeholder="Name" required />
            </Col>
            <Col md={6}>
              <input type="email" placeholder="Email" required />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <input type="text" placeholder="Address" required />
            </Col>
            <Col md={6}>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="15"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <textarea className="message-box" placeholder="Message" rows="4" required></textarea>
            </Col>
          </Row>

          <button className="custom-btn">Send Message</button>
        </div>

        {/* Google Map Section */}
        <Row>
          <Col>
            <div className="map-container">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?..."
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
