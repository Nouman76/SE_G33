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

  const [review, setReview] = useState({
    productId: "", 
    rating: 1,
    comment: "",
  });

  const [showReviewForm, setShowReviewForm] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("fetchUserData called");
      try {
        const token = localStorage.getItem("token");
        console.log("Profile token:", token);

        const response = await axios.get("http://localhost:8000/buyer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile API response:", response.data);

        const userData = response.data;
        if (userData.orders && userData.orders.length > 0) {
          userData.orders = userData.orders.sort((a, b) => b.quantity - a.quantity);
        }
        console.log("User _id:", userData.id);
        setUser(userData);
        setFormValues(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("Error response:", error.response?.data);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!review.productId) {
        alert("Product ID is missing.");
        return;
      }
      console.log("buyerId:", user.name);
      console.log("Review submitted for Product ID:", review.productId);

      const response = await axios.post(
        `http://localhost:8000/products/${review.productId}/review`,
        {
          buyerId: user.name,
          rating: review.rating,
          comment: review.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Review added successfully!") {
        alert("Review added successfully!");
        setReview({ productId: "", rating: 1, comment: "" });
        setShowReviewForm(false); 
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Error adding review.");
    }
  };

  const handleProductReview = (productId) => {
    setReview({ ...review, productId }); 
    setShowReviewForm(true); 
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
                    className="profile-namee"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="profile-addres"
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
                    className="profile-emaill"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="profile-phonee"
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
              <div className="contact-subtitle">My Orders</div>
              <div className="yellow-underline"></div>
              {user.orders && user.orders.length > 0 ? (
                <div className="orders-list">
                  {user.orders.map((order, index) => (
                    <div key={order._id || index} className="order-card">
                      <div className="order-header">
                        <span className="order-date">Ordered on {new Date(order.purchasedAt).toLocaleDateString()}</span>
                        <span className="order-quantity">Quantity: {order.quantity}</span>
                      </div>
                      <div className="order-details">
                        <div className="product-name">{order.name}</div>
                        <div className="order-price">Rs.{order.price.toFixed(2)}</div>
                      </div>
                      <div className="order-total">
                        <span>Total: Rs.{(order.price * order.quantity).toFixed(2)}</span>
                      </div>
                      <div className="review-form">
                        <button
                          className="custom-btn"
                          onClick={() => handleProductReview(order.productId)} 
                        >
                          Leave a Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">No orders yet</div>
              )}
            </Col>
          </Row>

          {/* Review Form */}
          {showReviewForm && (
            <Row className="mt-4">
              <Col>
                <form onSubmit={handleReviewSubmit}>
                  <div>
                    <label>Rating: </label>
                    <select
                      name="rating"
                      value={review.rating}
                      onChange={handleReviewChange}
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Comment: </label>
                    <textarea
                      name="comment"
                      value={review.comment}
                      onChange={handleReviewChange}
                    />
                  </div>
                  <button type="submit" className="custom-btn">Submit Review</button>
                </form>
              </Col>
            </Row>
          )}

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
                      className="profile-pasword"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="password"
                      className="profile-pasword"
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
