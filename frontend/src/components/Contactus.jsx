import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contactus.css";

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setPhoneNumber(value);
  };

  return (
    <Container fluid className="contact-us-page py-5">
      <Row className="justify-content-center">
        <Col md={12} className="text-center">
          <h2 className="contact-us-title">Contact Us</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h4 className="contact-us-leave-message">Leave a Message</h4>
          <div className="contact-us-yellow-underline"></div>
          <p className="contact-us-text-muted">
            If you have any questions, send us a message below, and we will get back to you.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Form className="contact-us-form">
            <Row>
              <Col md={6} className="mb-3">
                <Form.Control className="contact-us-form-control" type="text" placeholder="Name" required />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Control className="contact-us-form-control" type="email" placeholder="Email" required />
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Control className="contact-us-form-control" type="text" placeholder="Address" required />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Control className="contact-us-form-control"
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength="15"
                  required
                />
              </Col>
            </Row>

            <Form.Control className="contact-us-message-box" as="textarea" rows="4" placeholder="Message" required />

            <Button variant="warning" className="contact-us-btn-warning" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12} className="px-0">
          <div className="contact-us-map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="400"
              style={{ border: 0, filter: "grayscale(100%)" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
