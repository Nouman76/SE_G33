import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "bootstrap-4-react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    orders: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...user });

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/buyer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setFormValues(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      setPasswordError("Old password is incorrect.");
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/buyer/updateprofile",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(formValues);
        setEditMode(false);
        setIsProfileUpdated(true);
        setTimeout(() => setIsProfileUpdated(false), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <Container>
        <div className="profile-container">
          <Row>
            <Col>
              <div className="contact-title">User Profile</div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formValues.address}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <div><strong>Name:</strong> {user.name}</div>
                  <div><strong>Address:</strong> {user.address}</div>
                </>
              )}
            </Col>
            <Col md={6}>
              {editMode ? (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone Number:</strong> {user.phoneNumber}</div>
                </>
              )}
            </Col>
          </Row>

          {editMode ? (
            <Row>
              <Col>
                <button className="custom-btn mr-2" onClick={handleProfileUpdate}>
                  Save Changes
                </button>
                <button className="custom-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <button className="custom-btn" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </Col>
            </Row>
          )}

          {isProfileUpdated && (
            <div className="success-message mt-2">Profile updated successfully!</div>
          )}

          <Row className="mt-4">
            <Col>
              <div className="contact-subtitle">Orders</div>
              <div className="yellow-underline"></div>
              {user.orders && user.orders.length > 0 ? (
                user.orders.map((order, index) => (
                  <div key={index}>
                    <strong>Order #{order.id}</strong> - {order.date}
                  </div>
                ))
              ) : (
                <div>No orders yet</div>
              )}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <button className="custom-btn" onClick={handleLogout}>
                Log out
              </button>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <div className="contact-subtitle">Change Password</div>
              <div className="yellow-underline"></div>
              {isPasswordUpdated && (
                <div className="success-message">Password changed successfully!</div>
              )}
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}

              <form onSubmit={handlePasswordChange} className="contact-form">
                <Row>
                  <Col md={6}>
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Col>
                </Row>

                <button type="submit" className="custom-btn mt-3">
                  Change Password
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
