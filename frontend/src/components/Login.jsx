import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash} from "react-icons/fa"; // Icons
import "../styles/Login.css"; // Ensure styling matches

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="login-page d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-center font-weight-bold">Sign In</h2>

      {/* Input Fields */}
      <div className="login-form">
        <input type="email" placeholder="Email" className="form-control rounded-pill mb-3" />

        <div className="position-relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="form-control rounded-pill"
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="text-right mt-2">
          Forgot your password? <Link to="/reset-password" className="text-success">Click Here</Link>
        </p>

        <button className="btn btn-warning w-100 rounded-pill mt-3">Sign In</button>

        <div className="text-center mt-3">Or</div>

        {/* Social Login Buttons
        <button className="btn btn-light w-100 rounded-pill mt-2 d-flex align-items-center justify-content-center">
          <FaGoogle className="mr-2" /> Sign In with Gooling
        </button>

        <button className="btn btn-light w-100 rounded-pill mt-2 d-flex align-items-center justify-content-center">
          <FaCloud className="mr-2" /> Sign In with Banana Cloud
        </button> */}
      </div>

      <p className="mt-3">
        Don't have an account yet? <Link to="/signup" className="text-success">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
