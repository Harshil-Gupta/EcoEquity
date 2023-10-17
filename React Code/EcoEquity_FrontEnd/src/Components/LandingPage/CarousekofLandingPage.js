import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselofLandingPage.css'; // Import your custom CSS file

const CarouselofLandingPage = () => {
  return (
    <div className="carousel-container">
      <Container>
        <Row>
          <Col>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <Carousel interval={3000} controls={false}>
                <Carousel.Item>
                  <div className="row align-items-center">
                    <div className="col-md py-2 text-center"> {/* Center-align content */}
                      <div className="text-white text-content">
                        <h1 className='HeroHeading'>Diversify Your Portfolio</h1>
                        <p>Explore a world of investment opportunities to achieve financial stability and growth</p>
                      </div>
                      <div className="button-container">
                        <p  style={{color:"white"}}>To Get Started Register Now</p>
                        <Link to="/register"><Button variant="primary" className="signup-button">Register</Button></Link>
                        <Link to="/login"><Button variant="warning" className="login-button">Login</Button></Link>
                      </div>
                    </div>
                    <div className="col-md py-2">
                      <img
                        className="d-block img-fluid border-image "
                        src="https://i.ibb.co/1MysVrX/create-investme-1.png" 
                        
                        alt="First slide"
                        style={{ height: "400px",width:"400px", border:"2px solid black" }}
                      />
                    </div>
                  </div>
                </Carousel.Item>

                <Carousel.Item>
                  <div className="row align-items-center">
                    <div className="col-md py-2 text-center"> {/* Center-align content */}
                      <div className="text-white text-content">
                        <h1 className='HeroHeading'>Building Wealth, One Step at a Time</h1>
                        <p>Take the first step towards financial prosperity today. </p>
                      </div>
                      <div className="button-container">
                        <p  style={{color:"white"}}>To Get Started Register Now</p>
                        <Link to="/register"><Button variant="primary" className="signup-button">Register</Button></Link>
                        <Link to="/login"><Button variant="warning" className="login-button">Login</Button></Link>
                      </div>
                    </div>
                    <div className="col-md py-2">
                      <img
                        className="d-block img-fluid border-image"
                        src="https://i.ibb.co/WsxyqVW/create-3-invest-0.png"
                        alt="Second slide"
                        style={{ height: "400px",width:"400px", border:"2px solid black" }}
                      />
                    </div>
                  </div>
                </Carousel.Item>

                <Carousel.Item>
                  <div className="row align-items-center">
                    <div className="col-md py-2 text-center"> {/* Center-align content */}
                      <div className="text-white text-content">
                        <h1 className='HeroHeading'>Investing in a Changing World</h1>
                        <p>Navigate the ever-evolving investment landscape with confidence</p>
                      </div>
                      <div className="button-container">
                        <p  style={{color:"white"}}>To Get Started Register Now</p>
                        <Link to="/register"><Button variant="primary" className="signup-button">Register</Button></Link>
                        <Link to="/login"><Button variant="warning" className="login-button">Login</Button></Link>
                      </div>
                    </div>
                    <div className="col-md py-2">
                      <img
                        className="d-block img-fluid border-image"
                        src="https://i.ibb.co/7zdjDq1/create-3-invest-0-1.png"
                        alt="Third slide"
                        style={{ height: "400px",width:"400px", border:"2px solid black" }}
                      />
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarouselofLandingPage;
