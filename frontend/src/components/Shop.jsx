import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Shop.css";

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
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const [orderDetails, setOrderDetails] = useState(null);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleConfirmOrder = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + 10; // Subtotal + Delivery Fee
    setOrderDetails({
      items: cartItems,
      name: customerDetails.name,
      address: customerDetails.address,
      paymentMethod: customerDetails.paymentMethod,
      total,
    });
    setStep(3);
  };

  return (
    <Container className="shop-container">
      <h2 className="cart-title">
        {step === 1 ? "Shopping Cart" : step === 2 ? "Shipping & Checkout" : "Order Confirmation"}
      </h2>

      <div className="progress-steps">
        <span className={`step ${step === 1 ? "active" : ""}`}>1. Shopping Cart</span>
        <span className={`step ${step === 2 ? "active" : ""}`}>2. Shipping & Checkout</span>
        <span className={`step ${step === 3 ? "active" : ""}`}>3. Confirmation</span>
      </div>

      {step === 1 && (
        <>
          <Row>
            <Col md={8}>
              <Table className="cart-table">
                <thead>
                  <tr>
                    <th>Product Details</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.qty}</td>
                      <td>${(item.price * item.qty).toFixed(2)}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                          🗑
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Card className="summary-card">
                <Card.Body>
                  <h5>Total Cart</h5>
                  <p>
                    Subtotal: <strong>${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</strong>
                  </p>
                  <p>Delivery Charge: <strong>$10.00</strong></p>
                  <h5>
                    Total: <strong>${(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + 10).toFixed(2)}</strong>
                  </h5>
                  <Button className="checkout-btn" onClick={() => setStep(2)}>Checkout</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {step === 2 && (
        <Row>
          <Col md={8}>
            <Card className="checkout-card">
              <Card.Body>
                <h5>Shipping Information</h5>
                <Form>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select
                      value={customerDetails.paymentMethod}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, paymentMethod: e.target.value })}
                    >
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Cash on Delivery</option>
                    </Form.Select>
                  </Form.Group>
                  <Button className="mt-3" variant="secondary" onClick={() => setStep(1)}>Back to Cart</Button>
                  <Button className="mt-3ms-2" onClick={handleConfirmOrder}>Confirm Order</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {step === 3 && orderDetails && (
        <Card className="confirmation-card">
          <Card.Body>
            <h4>🎉 Thank You for Your Purchase!</h4>
            <p>Your order has been successfully placed.</p>
            <p>A confirmation email will be sent shortly.</p>

            <h5>Order Summary:</h5>
            <ul>
              {orderDetails.items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Total: </strong>${orderDetails.total.toFixed(2)}</p>
            <p><strong>Customer Name:</strong> {orderDetails.name}</p>
            <p><strong>Delivery Address:</strong> {orderDetails.address}</p>
            <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>

            <Button className="haiuyyy"onClick={() => setStep(1)}>Back to Shop</Button>
            
            <Button className="haiuyyy1">Track Your Order</Button>
          </Card.Body>
        </Card>
      )}

      <h3 className="popular-title">Popular Products</h3>
      <Row>
        {[
          { name: "Headset T50RP MK3N - Black and Red", sold: "200", price: "100" },
          { name: "Joystick Game Controller", sold: "10", price: "100" },
          { name: "Japple iPhone X 256GB 3GB RAM", sold: "245", price: "100" },
          { name: "HBEATS SOLO PRO 1 Wireless Headphone", sold: "1K+", price: "100" },
        ].map((product, index) => (
          <Col md={3} key={index}>
            <Card className="popular-product">
              <Card.Body>
                <span className="rating">⭐ 5.0</span>
                <h6>{product.name}</h6>
                <p>{product.sold} items sold</p>
                <h5>${product.price}</h5>
                <Button className="buy-btn">Buy</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;
