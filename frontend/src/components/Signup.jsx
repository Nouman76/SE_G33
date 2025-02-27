import React, { useState } from "react";
import { Container, Row} from "bootstrap-4-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Signup.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-main">
      <Container>
        <Row>
          <div className="form-wrapper">
              <h2 className="signup-title">Sign Up</h2>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="custom-input"
                />
              </div>

              <div className="password-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="custom-input"
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="button-wrapper">
                <button className="custom-button">Sign Up</button>
              </div>

              <div className="signin-text">
                Already have an account? <a href="/login" className="signin-link">Sign In</a>
              </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
