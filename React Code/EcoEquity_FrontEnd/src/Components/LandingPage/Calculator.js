import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalculatorCard from './CalculatorCard'; // Import the CalculatorCard component here
import './Calculator.css';

const Calculator = () => {
  return (
    <div className='CalculatorContainer container'>
      <h1 className="mt-4 mb-3 headingTestofCal" style={{ textAlign: "center"}}>Financial Calculators</h1>
      <p className='calText' style={{ textAlign: "center"}}>Explore our suite of powerful financial calculators to make smarter investment decisions. Calculate your potential returns with the ROI Calculator, plan your savings goals with the Systematic Investment Plan calculator, and analyze growth rates with the CAGR Calculator. Start optimizing your financial future today!</p>
      <Row>
        <Col md={6} lg={4} className="mb-3">
          <CalculatorCard title="Return on Investment (ROI) Calculator" path="/roi-calculator" />
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <CalculatorCard title="SIP Calculator" path="/SIP Calculator" />
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <CalculatorCard title="Compound Annual Growth Rate (CAGR) Calculator" path="/CagrCalculator" />
        </Col>
      </Row>
    </div>
  );
};

export default Calculator;
