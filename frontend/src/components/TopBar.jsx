import React from "react";
import { Container, Row, Col } from "bootstrap-4-react"; // Using React-Bootstrap 4
import PhoneLogo from "../assets/call-calling.svg";
import Arrow from "../assets/arrow-down.svg";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="d-flex align-items-center">
              <img src={PhoneLogo} alt="Phone Icon" width="18" height="18" className="mr-2" />
              <span>+06554655842</span>
            </Col>

            <Col md={6} className="text-center">
              <marquee direction="right">
                30% OFF ALL ELECTRONIC PRODUCTS! SPECIAL THIS MONTH. CODE:{" "}
                <span className="font-weight-bold">JKR123</span>
              </marquee>
            </Col>

            <Col md={3} className="d-flex justify-content-end">
              <div className="d-flex align-items-center mr-3">
                English <img src={Arrow} alt="Dropdown Arrow" className="ml-1" />
              </div>
              <div className="d-flex align-items-center mr-3">
                USD <img src={Arrow} alt="Dropdown Arrow" className="ml-1" />
              </div>
              <div className="d-flex align-items-center">
                Settings <img src={Arrow} alt="Dropdown Arrow" className="ml-1" />
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default TopBar;
