import React, { useState } from "react";
import { Container, Row } from "bootstrap-4-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const Admin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:8000/seller/login", formData);
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/admindashboard"); // Redirect to Admin Dashboard
      }, 1000);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <Container>
        <Row>
          <div className="form-wrapper">
            <h2 className="admin-title">Admin Sign In</h2>
            <form onSubmit={handleLogin}>
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

              <div className="button-wrapper">
                <button type="submit" className="custom-button">Sign In</button>
              </div>
            </form>
            {message && <p className="login-message">{message}</p>}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
