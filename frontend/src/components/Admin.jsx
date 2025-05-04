import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/seller/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("seller", JSON.stringify(response.data.seller));
      localStorage.setItem("sellerId", response.data.seller._id);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <Container>
        <Row>
          <div className="form-wrapper">
            <div className="admin-heading">Seller Sign In</div>
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
            <div className="signup-text">
              Want to Register your Store on our Platform?{" "}
              <Link to="/sellersignup" className="signup-link">Sign Up</Link>
            </div>

            {message && <p className="login-message success">{message}</p>}
            {error && <p className="login-message error">{error}</p>}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
