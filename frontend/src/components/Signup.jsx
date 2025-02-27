import React, { useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons
import "../styles/Signup.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to allow only digits in phone number field
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="signup-page d-flex flex-column align-items-center justify-content-center vh-100">
      <Container>
        <Row className="justify-content-center d-flex">
          <Col md={6} lg={5} className="d-flex flex-column align-items-center">
            
            {/* Sign Up Heading */}
            <h2 className="text-center mb-10 font-weight-bold">Sign Up</h2>

            {/* Form Wrapper */}
            <div className="w-100 d-flex flex-column align-items-center">
              <form className="signup-form">
                <div className="form-group">
                  <input type="text" id="name" className="form-control rounded-pill" placeholder="Full Name" />
                </div>

                <div className="form-group">
                  <input type="email" id="email" className="form-control rounded-pill" placeholder="Email" />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="phone"
                    className="form-control rounded-pill"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                  />
                </div>

                {/* Password Field with Eye Icon */}
                <div className="form-group position-relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="form-control rounded-pill pr-5"
                    placeholder="Password"
                  />
                  <span className="password-toggle position-absolute" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button type="submit" className="btn btn-warning w-100 rounded-pill mt-3">
                  Sign Up
                </button>
              </form>
            </div>

            {/* Sign In Link */}
            <p className="text-center mt-4">
              Already have an account? <a href="/login" className="text-success">Sign In</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
