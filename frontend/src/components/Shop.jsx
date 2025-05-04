import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "bootstrap-4-react";
import emailjs from "emailjs-com";
import "../styles/Shop.css";
import successIcon from "../assets/Group.svg";
import trashIcon from "../assets/trash.svg";
import { useCart } from "./CartContext";
import axios from "axios";

const Shop = () => {
  const { cartItems, removeFromCart } = useCart();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});  
  const [isMounted, setIsMounted] = useState(false);
  const { clearCart } = useCart();
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

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return <div>Loading cart...</div>;

  const calculateTotalPrice = (items) =>
    items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      from_name: `${customerDetails.firstName} ${customerDetails.lastName}`,
      address: customerDetails.address,
      city: customerDetails.city,
      zip: customerDetails.zip,
      phone: customerDetails.phone,
      email: customerDetails.email,
      total: (calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2),
      items: JSON.stringify(cartItems.map(item => ({ name: item.name, qty: item.qty }))),
    };

    emailjs
      .send(
        "service_gclxhhj",
        "template_zgzn3b9",
        emailData,
        "ci0v7i3gwQlwXyWJ5"
      )
      .then(() => {
        alert("Details Sent Successfully!");
        handleConfirmOrder();
      })
      .catch((error) => {
        alert("Error Sending Email: " + error.text);
      });
  };

  const handleConfirmOrder = async () => {
    const newErrors = {};
    let generalError = "";
  
    Object.entries(customerDetails).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = true;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage("All fields are required.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Login is required to place an order.");
      return;
    }
  
    const subtotal = calculateTotalPrice(cartItems);
    if (subtotal === 0) {
      setErrorMessage("No products added to cart.");
      return;
    }
  
    try {
      await Promise.all(
        cartItems.map(async (item) => {
          const response = await axios.get(
            `http://localhost:8000/products/${item._id || item.id}`
          );
          if (response.data.stock < item.qty) {
            throw new Error(
              `Not enough stock for ${item.name}. Available: ${response.data.stock}`
            );
          }
        })
      );
  
      const productsToAdd = cartItems.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
      }));
  
      await axios.post(
        "http://localhost:8000/buyer/add-purchases",
        { products: productsToAdd },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const total = subtotal + deliveryCharge;
      setOrderDetails({
        items: cartItems,
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        address: customerDetails.address,
        paymentMethod: "Cash on Delivery",
        total,
      });
  
      setErrorMessage("");
      setErrors({});
      setStep(3);
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(error.message || "Failed to complete purchase. Please try again.");
    }
  };
  return (
    <div className="shop-container">
      <Container>
        <div className="cart-title">Cart</div>

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
        {errorMessage && (
          <div className="global-error-message">{errorMessage}</div>
        )}


        {step === 1 && (
          <div className="cart-step">
            <Row>
              <Col md={8}>
                <div className="products-in-cart">
                  <Row className="cart-header">
                    <Col md={6}>Product Details</Col>
                    <Col md={2}>Price</Col>
                    <Col md={1}>QTY</Col>
                    <Col md={2}>Subtotal</Col>
                    <Col md={1} className="text-center"></Col>
                  </Row>

                  {cartItems.map((item) => (
                    <Row key={item.id || item._id} className="cart-item">
                      <Col md={6} className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                      </Col>
                      <Col md={2}>Rs.{item.price.toFixed(2)}</Col>
                      <Col md={1}>{item.qty}</Col>
                      <Col md={2}>Rs.{(item.price * item.qty).toFixed(2)}</Col>
                      <Col md={1} className="text-center" 
                        onClick={() => handleRemove(item.id || item._id)}>
                        <img src={trashIcon} alt="Remove" className="trash-icon" />
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>


              <Col md={4}>
                <div className="cart-summary">
                  <div className="cart-weight">Total Cart</div>
                  <div className="divider"></div>
                  <div className="summary-section">
                    <div className="summary-title">Subtotal:</div>
                    <span className="summary-value">Rs.{calculateTotalPrice(cartItems).toFixed(2)}</span>
                  </div>
                  <div className="summary-section">
                    <div className="summary-title">Delivery Charge:</div>
                    <span className="summary-value">Rs.{deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-section total">
                    <div className="summary-title">Total:</div>
                    <span className="summary-value">Rs.{(calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}</span>
                  </div>
                  <div className="checkout-btn" onClick={() => setStep(2)}>Checkout</div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {step === 2 && (
         <div className="checkout-step">
         <Row>
           <Col md={8}>
             <div className="billing-details">
               <Row>
                 <div className="billing-title">Billing Details</div>
               </Row>
       
               <div className="divider"></div>
       
               <div className="get-details">
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="First Name"
                         value={customerDetails.firstName}
                         onChange={(e) =>
                         setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                         className={errors.firstName ? "input-error" : ""}
                          />
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Last Name"
                         value={customerDetails.lastName}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                          className={errors.lastName ? "input-error" : ""}
                           />
                         
                     </div>
                   </Col>
                 </Row>
       
                 <Row>
                   <Col md={12}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Address"
                         value={customerDetails.address}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, address: e.target.value })}
                          className={errors.address ? "input-error" : ""}
                           />
                     </div>
                   </Col>
                 </Row>
       
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Town/City"
                         value={customerDetails.city}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, city: e.target.value })}
                          className={errors.city ? "input-error" : ""}
                           />
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Postal Code"
                         value={customerDetails.zip}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, zip: e.target.value })}
                          className={errors.zip ? "input-error" : ""}
                           />
              
                     </div>
                   </Col>
                 </Row>
       
                 
                 <Row>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="text"
                         placeholder="Phone Number"
                         value={customerDetails.phone}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                          className={errors.phone ? "input-error" : ""}
                           />
                           
                     </div>
                   </Col>
                   <Col md={6}>
                     <div className="input-container">
                       <input
                         type="email"
                         placeholder="Email"
                         value={customerDetails.email}
                         onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, email: e.target.value })}
                          className={errors.email ? "input-error" : ""}
                           />
                           
                     </div>
                   </Col>
                 </Row>
               </div>
       
               <div className="divider"></div>
       
               <div className="save-btn" onClick={handleSubmit}>Save</div>
             </div>
           </Col>
       
           <Col md={4}>
               <div className="cart-summary">
                  <div className="cart-weight">Total Cart</div>
                  <div className="divider"></div>
                  <div className="summary-section">
                    <div className="summary-title">Subtotal:</div>
                    <span className="summary-value">Rs.{calculateTotalPrice(cartItems).toFixed(2)}</span>
                  </div>
                  <div className="summary-section">
                    <div className="summary-title">Delivery Charge:</div>
                    <span className="summary-value">Rs.{deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-section total">
                    <div className="summary-title">Total:</div>
                    <span className="summary-value">Rs.{(calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}</span>
                  </div>
                  <div className="payment-method">
                  <div className="payment-title">Select Payment Method</div>
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={true} 
                      readOnly
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                </div>

                <div className="checkout-btn" onClick={handleConfirmOrder}>Place Order</div>
                </div>
           </Col>
         </Row>
       </div>
        )}

        {step === 3 && (
          <div className="confirmation-step">
            <div className="order-success">
              <img src={successIcon} alt="Success" className="success-icon" />
              <div className="success-title">Your Order Has Been Fulfilled</div>
              <div className="success-subtext">I'm grateful. We've received your order.</div>
            </div>

            <div className="order-summary">
              <div className="summary-title">Order Details</div>
              <div className="divider"></div>

              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-label">Item Name:</div>
                  <div className="item-name">{item.name}</div>
                </div>
              ))}

              <div className="order-item">
                <div className="item-label">Subtotal:</div>
                <div className="item-value">Rs.{calculateTotalPrice(cartItems).toFixed(2)}</div>
              </div>

              <div className="order-item">
                <div className="item-label">Delivery Charge:</div>
                <div className="item-value">Rs.{deliveryCharge.toFixed(2)}</div>
              </div>

              <div className="order-item">
                <div className="item-label">Total:</div>
                <div className="total-price">
                Rs.{(+calculateTotalPrice(cartItems) + deliveryCharge).toFixed(2)}
                </div>
              </div>

              <div className="divider"></div>

              <div className="order-item">
                <div className="item-label">Name:</div>
                <div className="item-value">{customerDetails.firstName} {customerDetails.lastName}</div>
              </div>

              <div className="order-item">
                <div className="item-label">Address:</div>
                <div className="item-value">{customerDetails.address}, {customerDetails.city}</div>
              </div>
              <a
                href="https://www.tcsexpress.com/track/"
                target="_blank"
                rel="noopener noreferrer"
                className="track-link"
              >
                <div className="track-order-btn">Track Your Order</div>
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Shop;
