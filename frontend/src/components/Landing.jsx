import React from 'react';
import '../styles/Landing.css'; // Custom CSS

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-12">
            <h1 className="title">Welcome to Paws & Co.</h1>
            <p className="motto">
              <span>Because Every Pet Deserves Love & Care</span>
            </p>
            <p className="description">
              At Paws & Co., we believe that your pets are more than just animals; they are family. Our mission is to provide pet owners with a one-stop destination for high-quality, affordable products that ensure the well-being of your furry friends. Whether it's nutritious food, fun toys, or cozy accessories, we have everything you need to keep your pet happy and healthy.
            </p>
            <button className="explore-btn" onClick={() => window.location.href = '/home'}>
              Explore Products
            </button>
            <button className="begin-btn" onClick={() => window.location.href = '/home'}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
