// FinancialCalculator.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import FinancialCalculator from './SIPCalculator';

test('renders FinancialCalculator component', () => {
  render(<FinancialCalculator />);
  
  // You can add more specific assertions as needed
  const calculatorTitle = screen.getByText('SIP Calculator');
  const monthlySIPInput = screen.getByLabelText('Monthly SIP Amount (₹)');
  const timePeriodInput = screen.getByLabelText('Time Period (Years)');
  const interestRateInput = screen.getByLabelText('Growth Rate (per annum)');
  const calculateButton = screen.getByText('Calculate');
  const sipFAQ = screen.getByText('What is an SIP (Systematic Investment Plan) calculator?');
  
  expect(calculatorTitle).toBeInTheDocument();
  expect(monthlySIPInput).toBeInTheDocument();
  expect(timePeriodInput).toBeInTheDocument();
  expect(interestRateInput).toBeInTheDocument();
  expect(calculateButton).toBeInTheDocument();
  expect(sipFAQ).toBeInTheDocument();
});
