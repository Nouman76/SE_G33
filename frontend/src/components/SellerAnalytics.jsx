import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'bootstrap-4-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SellerAnalytics.css';

const SellerAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    localStorage.removeItem("sellerId");
    
    navigate("/admin");
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        console.log('Fetching analytics data...');
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await axios.get('http://localhost:8000/seller/analytics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Analytics response:', response.data);
        if (!response.data.success || !response.data.analytics) {
          throw new Error('Invalid analytics data received');
        }

        const safeAnalytics = {
            ...response.data.analytics,
            totalSoldProducts: response.data.analytics.totalSoldProducts || 0,
            totalSales: response.data.analytics.totalSales || 0,
            totalRevenue: response.data.analytics.totalRevenue || 0,
            products: (response.data.analytics.products || []).map(p => ({
              ...p,
              price: parseFloat(p.price) || 0,
              salesCount: parseInt(p.salesCount) || 0,
              revenue: parseFloat(p.revenue) || 0
            })),
            topProducts: (response.data.analytics.topProducts || []).map(p => ({
              ...p,
              price: parseFloat(p.price) || 0,
              salesCount: parseInt(p.salesCount) || 0,
              revenue: parseFloat(p.revenue) || 0
            }))
          };

        setAnalytics(safeAnalytics);
      } catch (err) {
        console.error('Failed to load analytics:', err);
        setError(err.message || 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <nav className="dashboard-nav">
          <div className="admin-title">Admin Panel</div>
          <div className="title-border"></div>
          <ul>
            <Link to="/admindashboard" className="nav-link">
              Dashboard
            </Link>
           
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
        <div className="dynamic-content">
          <h2>Sales Analytics Dashboard</h2>
          <div className="text-center my-5">Loading sales data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <nav className="dashboard-nav">
          <div className="admin-title">Admin Panel</div>
          <div className="title-border"></div>
          <ul>
            <Link to="/admindashboard" className="nav-link">
              Dashboard
            </Link>
           
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
        <div className="dynamic-content">
          <h2>Sales Analytics Dashboard</h2>
          <div className="alert alert-danger">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics || !analytics.products || analytics.products.length === 0) {
    return (
      <div className="admin-layout">
        <nav className="dashboard-nav">
          <div className="admin-title">Admin Panel</div>
          <div className="title-border"></div>
          <ul>
            <Link to="/admindashboard" className="nav-link">
              Dashboard
            </Link>
           
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
        <div className="dynamic-content">
          <h2>Sales Analytics Dashboard</h2>
          <div className="alert alert-info">
            No products have been sold yet.
          </div>
        </div>
      </div>
    );
  }

  const sortedProducts = [...analytics.products]
    .filter(product => (product.salesCount || 0) > 0)
    .sort((a, b) => b.salesCount - a.salesCount);
  
  const topThreeProducts = sortedProducts.slice(0, 3);

  return (
    <div className="admin-layout">
      <nav className="dashboard-nav">
        <div className="admin-title">Admin Panel</div>
        <div className="title-border"></div>
        <ul>
          <Link to="/admindashboard" className="nav-link">
            Dashboard
          </Link>
         
          <li className="logout-button" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>

      <div className="dynamic-content">
        <h2>Sales Analytics Dashboard</h2>
        
        <Row className="summary-cards mb-4">
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Total Sold Products</h5>
                <h3>{analytics.totalSoldProducts}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Total Units Sold</h5>
                <h3>{analytics.totalSales}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Total Revenue</h5>
                <h3>Rs.{(analytics.totalRevenue || 0).toFixed(2)}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {topThreeProducts.length > 0 && (
          <>
            <h3 className="mt-4">Top Selling Products</h3>
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topThreeProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name || 'N/A'}</td>
                    <td>Rs.{(product.price || 0).toFixed(2)}</td>
                    <td>{product.salesCount}</td>
                    <td>Rs.{(product.revenue || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        <h3 className="mt-4">All Sold Products</h3>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name || 'N/A'}</td>
                <td>Rs.{(product.price || 0).toFixed(2)}</td>
                <td>{product.salesCount}</td>
                <td>Rs.{(product.revenue || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SellerAnalytics;