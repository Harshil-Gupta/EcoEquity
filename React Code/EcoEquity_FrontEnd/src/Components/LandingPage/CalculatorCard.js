import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const cardStyle = {
  minHeight: '100px', // Adjust the height as needed
};

const CalculatorCard = ({ title, path }) => (
  <Link to={path} style={{ textDecoration: 'none'}}>
    <Card  className="cardClass" style={{ backgroundColor: "white", textAlign: "center" , height:"120px"}}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
    
  </Link>
);

export default CalculatorCard;
