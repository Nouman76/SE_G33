import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Container, Row, Col } from "bootstrap-4-react";
import "../styles/SellerSignup.css";

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    storeName: "",
    address: "",
    selectedCategories: [],
  });

  const categories = [
    "Cat Food",
    "Dog Foods",
    "Cat Accessories",
    "Dog Accessories",
    "Pet Medicines",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => {
      let updatedCategories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [category, ...prev.selectedCategories];

      return { ...prev, selectedCategories: updatedCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      storeName: formData.storeName,
      address: formData.address,
      categories: formData.selectedCategories.join(", "),
    };

    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        templateParams,
        "your_user_id" // Replace with your EmailJS user/public key
      )
      .then(
        (response) => {
          alert("Signup successful! We will contact you soon.");
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            storeName: "",
            address: "",
            selectedCategories: [],
          });
        },
        (error) => {
          alert("Error sending data. Please try again.");
        }
      );
  };

  return (
    <div className="seller-signup-page">
      <Container>
        <Row>
          <Col>
            <div className="signup-title">Seller Signup</div>
          </Col>
        </Row>

        <form className="signup-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </Col>
            <Col md={6}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Store Name"
                required
              />
            </Col>
            <Col md={6}>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Store Address"
                required
              />
            </Col>
          </Row>

          <div className="category-selection">
            <p>Select Categories You Want to Sell:</p>
            <div className="category-list">
              {formData.selectedCategories.map((cat) => (
                <button
                  key={cat}
                  className="selected-category"
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat} ✖
                </button>
              ))}
              {categories
                .filter((cat) => !formData.selectedCategories.includes(cat))
                .map((category) => (
                  <button
                    key={category}
                    className="category-btn"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </div>

          <button type="submit" className="custom-btn">
            Submit
          </button>
        </form>
      </Container>
    </div>
  );
};

export default SellerSignup;
