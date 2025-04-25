import React from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import '../styles/Aboutus.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'CEO',
      image: '/placeholder-team-1.jpg',
      bio: 'Sarah brings over 15 years of experience in the pet industry and is passionate about animal welfare.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'COO',
      image: '/placeholder-team-2.jpg',
      bio: 'Michael oversees all operations and ensures we deliver the best quality products to our customers.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'CTO',
      image: '/placeholder-team-3.jpg',
      bio: 'Emily leads our technology team and develops innovative solutions for an enhanced shopping experience.'
    },
  ];

  return (
    <div className="about-us-page">
      <Container>
        <section className="company-intro">
          <div className="section-title">About The Company</div>
          <div className="underline"></div>
          <div className="company-description">
            Paw Pal is your go-to source for top-quality pet care products and accessories. We offer a wide range of products, from
            premium pet food and treats to the latest toys and smart pet devices. Our mission is to bring the
            best pet care solutions to everyone, with competitive prices and outstanding customer service. Shop with us and
            experience the future of pet care.
          </div>
          
          <div className="video-placeholder">
            <div className="play-button">
              <i className="fa fa-play"></i>
            </div>
          </div>
        </section>

        <Row className="mission-vision-section">
          <Col md={6}>
            <div className="mission-box">
              <div className="section-title">Our Mission</div>
              <div className='mission-box-description'>
                At Paw Pal, we're dedicated to enhancing the lives of pets and their owners through quality products, 
                expert advice, and a commitment to animal welfare. We believe every pet deserves the best care, 
                and every pet owner deserves access to top-quality products at fair prices.
              </div>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="vision-box">
              <div className="section-title">Our Vision</div>
              <div className='vision-box-description'>
                We envision a world where every pet receives the care they deserve. Our goal is to become the most 
                trusted name in pet supplies, known for our quality products, ethical business practices, and 
                dedication to the well-being of all animals.
              </div>
            </div>
          </Col>
        </Row>

        <section className="team-section">
          <div className="section-title text-center">Our Team</div>
          <div className="team-description text-center">
            Our core team manages Paw Pal and its divisions to deliver the best pet care products and services.
          </div>
          
          <Row className="team-members">
            {teamMembers.map(member => (
              <Col md={4} key={member.id} className="mb-4">
                <div className="team-member-card">
                  <div className="member-image"></div>
                  <div className="member-name">{member.name}</div>
                  <div className="member-title">{member.title}</div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <section className="values-section">
          <div className="section-title text-center">Our Values</div>
          <Row>
            <Col md={4}>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa fa-heart"></i>
                </div>
                <div className='value-card-title'>Pet Welfare</div>
                <div className='value-card-description'>We prioritize the health and happiness of all animals in everything we do.</div>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa fa-check-circle"></i>
                </div>
                <div className='value-card-title'>Quality</div>
                <div className='value-card-description'>We only offer products that meet our strict quality and safety standards.</div>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa fa-users"></i>
                </div>
                <div className='value-card-title'>Community</div>
                <div className='value-card-description'>We support pet owners through education and exceptional service.</div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;