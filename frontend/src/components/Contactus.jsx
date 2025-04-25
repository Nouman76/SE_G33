import React, { useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import emailjs from "@emailjs/browser";
import "../styles/Contactus.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    const templateParams = {
      name: name,
      email: email,
      address: address,
      phone: phoneNumber,
      message: message,
    };

    emailjs
      .send("service_gclxhhj", "template_oc9jg9q", templateParams, "ci0v7i3gwQlwXyWJ5")
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          alert("We have received your query! We'll get back to you shortly.");
          setName("");
          setEmail("");
          setAddress("");
          setPhoneNumber("");
          setMessage("");

          setError(""); 
        },
        (error) => {
          console.log("Error sending email:", error);
          alert("Sorry, there was an error sending your message. Please try again.");
        }
      );
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

        {error && <div className="error-message">{error}</div>}

        <div className="contact-form">
          <Row>
            <Col md={6}>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
              <textarea
                className="message-box"
                placeholder="Message"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </Col>
          </Row>

          <button className="custom-buttton" onClick={handleSubmit}>
            Send Message
          </button>
        </div>

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
