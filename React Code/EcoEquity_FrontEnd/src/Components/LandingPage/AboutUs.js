import React, { useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./AboutUs.css"; 

function AboutUs() {
  return (
    <Container>
      <h4 className="mt-4 text-center Heading">Welcome to EcoEquity: <br/>Where Ethics Meet Investment Strategies</h4>
      <Row>
        {/* Card 1: Our Mission */}
        <Col xs={12} sm={6} md={4} className="col-lg-4 d-flex align-items-stretch pb-4">
          <Card style={{ backgroundColor: "#d9cbee", textAlign: "center" }}>
            <Card.Body >
              <Card.Title><h4>Our Mission</h4></Card.Title>
              <Card.Text>
                <h3 className="CardText">
                  Empower individuals to achieve financial success through
                  informed investment choices.
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2: Our Focus */}
        <Col xs={12} sm={6} md={4} className="col-lg-4 d-flex align-items-stretch pb-4">
        <Card style={{ backgroundColor: "#d9cbee", textAlign: "center" }}>
            <Card.Body>
              <Card.Title><h4>Our Focus</h4></Card.Title>
              <Card.Text>
                <h3 className="CardText">
                  Provide personalized investment solutions, foster financial
                  education, and ensure asset security.
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3: Our Services */}
        <Col xs={12} sm={6} md={4} className="col-lg-4 d-flex align-items-stretch pb-4">
        <Card style={{ backgroundColor: "#d9cbee", textAlign: "center" }}>
            <Card.Body>
              <Card.Title><h4>Our Services</h4></Card.Title>
              <Card.Text>
                <h3 className="CardText">
                  We offer a wide range of investment services, including
                  portfolio management, ESG education, Stock Watchlist.
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
