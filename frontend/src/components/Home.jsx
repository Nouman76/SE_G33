import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'bootstrap-4-react';
import '../styles/Home.css';
import image1 from '../assets/home3.png';
import image2 from '../assets/home2.png';
import image3 from '../assets/home1.png';
import gamingIcon from '../assets/gaming.svg';
import smartphoneIcon from '../assets/smartphone.svg';
import laptopIcon from '../assets/laptop.svg';
import tvIcon from '../assets/tv.svg';
import cameraIcon from '../assets/camera.svg';
import ShopCategory from './ShopCategory';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className='home-main'>
      <Container className="home">
        <Row className="home-row">
          <Col md={7} className="left-column">
            <img
              src={image1}
              alt="Product 1"
              className="img-fluid1 clickable h-100"
              onClick={() => handleRedirect(1)}
            />
          </Col>
          <Col md={5} className="right-column">
            <Row>
              <img
                src={image2}
                alt="Product 2"
                className="img-fluid clickable"
                onClick={() => handleRedirect(2)}
              />
            </Row>
            <Row>
              <img
                src={image3}
                alt="Product 3"
                className="img-fluid clickable"
                onClick={() => handleRedirect(3)}
              />
            </Row>
          </Col>
        </Row>

       <Container>
       <Row className="categories-section">
          {[
            { icon: gamingIcon, label: 'Cat Food' },
            { icon: smartphoneIcon, label: 'Dog Food' },
            { icon: laptopIcon, label: 'Cat Accessories' },
            { icon: tvIcon, label: 'Dog Accessories' },
            { icon: cameraIcon, label: 'Pets Medicine' },
          ].map((item, index) => (
            <Col key={index} md={2} className="category-item">
              <img src={item.icon} alt={item.label} className="category-icon" />
              <p className="category-text">{item.label}</p>
            </Col>
          ))}
        </Row>
       </Container>
      </Container>

      <ShopCategory />

    </div>
  );
};

export default Home;
