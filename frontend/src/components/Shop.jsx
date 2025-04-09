import React, { useState } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import emailjs from "emailjs-com"; // Import EmailJS
import "../styles/Shop.css";
import successIcon from "../assets/Group.svg";
import trashIcon from "../assets/trash.svg";

const Shop = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Azus Zens 123 Metallic Color i5 Ryzen Generation 10 16” FHD Laptop",
      price: 100.0,
      qty: 1,
    },
  ]);

  const [step, setStep] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [orderDetails, setOrderDetails] = useState(null);
  const deliveryCharge = 10.0;

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailData = {
      to_email: "noumanasad27@gmail.com",
      from_name: `${customerDetails.firstName} ${customerDetails.lastName}`,
      address: customerDetails.address,
      city: customerDetails.city,
      zip: customerDetails.zip,
      phone: customerDetails.phone,
      email: customerDetails.email,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        emailData,
        "YOUR_PUBLIC_KEY"
      )
      .then((response) => {
        alert("Details Sent Successfully!");
        handleConfirmOrder(); // Proceed to next step after successful submission
      })
      .catch((error) => {
        alert("Error Sending Email: " + error.text);
      });
  };

  const handleConfirmOrder = () => {
    const total = calculateTotalPrice(cartItems) + deliveryCharge;
    setOrderDetails({
      items: cartItems,
      name: `${customerDetails.firstName} ${customerDetails.lastName}`,
      address: customerDetails.address,
      paymentMethod: "Cash on Delivery",
      total,
    });

    setStep(3);
  };

  return (
    <div className="shop-container">
      <Container>
        {/* Section Headings */}
        <div className="cart-title">Cart</div>

        {/* Progress Indicator */}
        <div className="progress-container">
          <Row>
            {["Shopping Cart", "Shipping & Checkout", "Confirmation"].map((title, index) => (
              <Col md={4} key={index}>
                <div className={`progress-step ${step === index + 1 ? "active" : ""}`}>
                  <span className="step-number">{index + 1}</span>
                  <div className="step-text">{title}</div>
                </div>
                <div className={`step-divider ${step === index + 1 ? "active-divider" : ""}`}></div>
              </Col>
            ))}
          </Row>
        </div>

        {/* 🛒 Shopping Cart Section */}
        {step === 1 && (
            <div className="cart-step">
            <Row>
              <Col md={8}>
                <div className="products-in-cart">
                  {/* Cart Header */}
                  <Row className="cart-header">
                    <Col md={6} className="cart-header-item">Product Details</Col>
                    <Col md={2} className="cart-header-item">Price</Col>
                    <Col md={1} className="cart-header-item">QTY</Col>
                    <Col md={2} className="cart-header-item">Subtotal</Col>
                    <Col md={1} className="cart-header-item text-center"></Col>
                  </Row>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <Row key={item.id} className="cart-item">
                      {/* Product Details */}
                      <Col md={6} className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                      </Col>

                      {/* Price */}
                      <Col md={2} className="cart-item-price">${item.price.toFixed(2)}</Col>

                      {/* Quantity */}
                      <Col md={1} className="cart-item-qty">{item.qty}</Col>

                      {/* Subtotal */}
                      <Col md={2} className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</Col>

                      {/* Remove Button */}
                      <Col md={1} className="cart-item-remove text-center" onClick={() => handleRemove(item.id)}>
                        <img src={trashIcon} alt="Remove" className="trash-icon" />
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>



              {/* Cart Summary Section */}
              <Col md={4}>
                <div className="cart-summary">
                  <div className="cart-weight">Total Cart</div>
                  <div className="divider"></div>
                  <div className="summary-section">
                    <div className="summary-title">Subtotal:</div>
                    <span className="summary-value">${calculateTotalPrice(cartItems).toFixed(2)}</span>
                  </div>
                  <div className="summary-section">
                    <div className="summary-title">Delivery Charge:</div>
                    <span className="summary-value">${deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-section total">
                    <div className="summary-title">Total:</div>
                    <span className="summary-value">${(calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}</span>
                  </div>
                  <div className="checkout-btn" onClick={() => setStep(2)}>Checkout</div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* 🚚 Shipping & Checkout Section */}
        {step === 2 && (
         <div className="checkout-step">
         <Row>
           {/* Billing Details Section */}
           <Col md={8}>
             <div className="billing-details">
               <Row>
                 <div className="billing-title">Billing Details</div>
               </Row>
       
               <div className="divider"></div>
       
               <div className="get-details">
                 {/* First Name & Last Name */}
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="First Name"
                         value={customerDetails.firstName}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Last Name"
                         value={customerDetails.lastName}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                 </Row>
       
                 {/* Address */}
                 <Row>
                   <Col md={12}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Address"
                         value={customerDetails.address}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                 </Row>
       
                 {/* City & Postal Code */}
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Town/City"
                         value={customerDetails.city}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Postal Code"
                         value={customerDetails.zip}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, zip: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                 </Row>
       
                 {/* Phone & Email */}
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Phone Number"
                         value={customerDetails.phone}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="email"
                         placeholder="Email"
                         value={customerDetails.email}
                         onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                         required
                       />
                     </div>
                   </Col>
                 </Row>
               </div>
       
               <div className="divider"></div>
       
               {/* Save Button */}
               <div className="save-btn" onClick={handleSubmit}>Save</div>
             </div>
           </Col>
       
           {/* Shopping Cart Summary Section */}
           <Col md={4}>
               <div className="cart-summary">
                  <div className="cart-weight">Total Cart</div>
                  <div className="divider"></div>
                  <div className="summary-section">
                    <div className="summary-title">Subtotal:</div>
                    <span className="summary-value">${calculateTotalPrice(cartItems).toFixed(2)}</span>
                  </div>
                  <div className="summary-section">
                    <div className="summary-title">Delivery Charge:</div>
                    <span className="summary-value">${deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-section total">
                    <div className="summary-title">Total:</div>
                    <span className="summary-value">${(calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}</span>
                  </div>
                  <div className="payment-method">
  <div className="payment-title">Select Payment Method</div>
  <div className="payment-option">
    <input
      type="radio"
      id="cod"
      name="paymentMethod"
      value="Cash on Delivery"
      checked={true} // Default selection
      readOnly
    />
    <label htmlFor="cod">Cash on Delivery</label>
  </div>
</div>

                  <div className="checkout-btn" onClick={() => setStep(3)}>Place Order</div>
                </div>
           </Col>
         </Row>
       </div>
        )}

        {/* ✅ Order Confirmation Section */}
        {step === 3 && (
          <div className="confirmation-step">
            {/* Success Message Block */}
            <div className="order-success">
              <img src={successIcon} alt="Success" className="success-icon" />
              <div className="success-title">Your Order Has Been Fulfilled</div>
              <div className="success-subtext">I'm grateful. We've received your order.</div>
            </div>

            {/* Order Summary Block */}
            <div className="order-summary">
              <div className="summary-title">Order Details</div>
              <div className="divider"></div>

              {/* Order Items List */}
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-label">Item Name:</div>
                  <div className="item-name">{item.name}</div>
                </div>
              ))}

              {/* Subtotal */}
              <div className="order-item">
                <div className="item-label">Subtotal:</div>
                <div className="item-value">${calculateTotalPrice(cartItems).toFixed(2)}</div>
              </div>

              {/* Delivery Charge */}
              <div className="order-item">
                <div className="item-label">Delivery Charge:</div>
                <div className="item-value">${deliveryCharge.toFixed(2)}</div>
              </div>

              {/* Total */}
              <div className="order-item">
                <div className="item-label">Total:</div>
                <div className="total-price">
                  ${(+calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}
                </div>
              </div>

              <div className="divider"></div>

              {/* Placeholder for Name & Address */}
              <div className="order-item">
                <div className="item-label">Name:</div>
                <div className="item-value">{customerDetails.firstName} {customerDetails.lastName}</div>
              </div>

              <div className="order-item">
                <div className="item-label">Address:</div>
                <div className="item-value">{customerDetails.address}, {customerDetails.city}</div>
              </div>
              <div className="track-order-btn">Track Your Order</div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Shop;
