import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'bootstrap-4-react';
import '../styles/Home.css';
import image1 from '../assets/home.png';
import gamingIcon from '../assets/cat_food.png';
import smartphoneIcon from '../assets/dog_food.png';
import laptopIcon from '../assets/cat_a.png';
import tvIcon from '../assets/dog_a.png';
import cameraIcon from '../assets/pet_med.png';
import ShopCategory from './ShopCategory';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = (category) => {
    console.log(`Redirecting to category: ${category}`);
    navigate(`/shop-category/${encodeURIComponent(category)}`);
  };

  return (
    <div className='home-main'>
      <Container className="home">
        <Row className="home-row">
           <Col md={12} className="full-width-image">
            <img
              src={image1}
              alt="Product 1"
              className="img-fluid1"
              onClick={() => handleRedirect(1)}
            />
          </Col>
        </Row>

       <Container>
       <Row className="categories-section">
            {[
              { icon: gamingIcon, label: 'Cat Food' },
              { icon: smartphoneIcon, label: 'Dog Food' },
              { icon: laptopIcon, label: 'Cat Accessories' },
              { icon: tvIcon, label: 'Dog Accessories' },
              { icon: cameraIcon, label: 'Pet Medicine' },
            ].map((item, index) => (
              <Col
                key={index}
                md={2}
                className="category-item"
                onClick={() => handleRedirect(item.label)}
                style={{ cursor: "pointer" }}
              >
                <img src={item.icon} alt={item.label} className="category-icon" />
                <div className="category-text">{item.label}</div>
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
