import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "bootstrap-4-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:8000/buyer/signup", formData);
      console.log(response.data); // Log the response for debugging
      setMessage("Signup successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/login"); // Redirect to Buyer Dashboard
      }, 1000);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <Container>
        <Row>
          <div className="form-wrapper">
            <div className="admin-heading">Buyer Sign Up</div>
            <form onSubmit={handleSignup}>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="custom-input"
                  required
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
                  required
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
                  required
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="custom-input"
                  required
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="custom-input"
                  required
                />
              </div>

              <div className="button-wrapper">
                <button type="submit" className="custom-button">Sign Up</button>
              </div>
            </form>
            <div className="signup-text">
                Already have an account? <Link to="/login" className="signup-link">Sign In</Link>
              </div>
            {message && <p className="login-message">{message}</p>}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
