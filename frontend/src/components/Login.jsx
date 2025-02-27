import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row} from "bootstrap-4-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; 

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-main">
      <Container>
        <Row>
          <div className="form-wrapper">
              <h2 className="login-title">Sign In</h2>

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

              <div className="forgot-password">
                <Link to="/reset-password" className="forgot-link">Forgot your password?</Link>
              </div>

              <div className="button-wrapper">
                <button className="custom-button">Sign In</button>
              </div>

              <div className="or-text">Or</div>

              <div className="signup-text">
                Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
              </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
