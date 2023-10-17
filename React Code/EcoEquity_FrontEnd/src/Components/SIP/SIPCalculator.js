// FinancialCalculator.js

import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './SIP.css';
import InvestmentAmountCalculator from './InvestmentAmountCalculator';
import SIPFAQ from './SIPFaq';


function FinancialCalculator() {
  const [selectedCalculator, setSelectedCalculator] = useState(
    'investmentAmount'
  );

  return (
    <> 
    <Container className="offset-md-3 mx-auto text-center SIPCalculator">
      
      <h1 className="mt-4">SIP Calculator</h1>
      <Row className="mt-4">
        <Col md={6} className="offset-md-3 mx-auto">
          <Form>
            {/* Radio buttons */}
            <br />
            {selectedCalculator === 'investmentAmount' ? (
              <InvestmentAmountCalculator />
            ) : (
              null
            )}
            <br />
          </Form>
        </Col>
      </Row>
      <Row>
        <br/>
        <SIPFAQ />
      </Row>
    </Container>
    </>
  );
}

export default FinancialCalculator;
