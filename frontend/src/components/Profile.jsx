import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    orders: [],
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  useEffect(() => {
    // Fetch user details from the API when the component loads
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging line
        const response = await axios.get("http://localhost:8000/buyer/profile", {
            
          headers: {
            

            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setPasswordError("Both fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/buyer/changepassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsPasswordUpdated(true);
        setPasswordError("");
      }
    } catch (error) {
      setPasswordError("Old password is incorrect.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p><strong>Orders:</strong></p>
        <ul>
          {user.orders && user.orders.length > 0 ? (
            user.orders.map((order, index) => (
              <li key={index}>Order #{order.id} - {order.date}</li>
            ))
          ) : (
            <li>No orders yet</li>
          )}
        </ul>
      </div>

      <h3>Change Password</h3>
      {isPasswordUpdated && <p className="success-message">Password changed successfully!</p>}
      {passwordError && <p className="error-message">{passwordError}</p>}

      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
