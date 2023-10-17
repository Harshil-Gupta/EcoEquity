import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CAGRCalculator from './CAGRCalculator';

test('renders CAGR Calculator title', () => {
  render(<CAGRCalculator />);
  const title = screen.getByText('CAGR Calculator with Charts');
  expect(title).toBeInTheDocument();
});


test('displays yearly growth table', () => {
  render(<CAGRCalculator />);
  const initialValueInput = screen.getByPlaceholderText('Enter initial value');
  const interestRateInput = screen.getByPlaceholderText('Enter interest rate');
  const numberOfYearsInput = screen.getByPlaceholderText('Enter number of years');
  const calculateButton = screen.getByText('Calculate Future Value');

  fireEvent.change(initialValueInput, { target: { value: '1000' } });
  fireEvent.change(interestRateInput, { target: { value: '5' } });
  fireEvent.change(numberOfYearsInput, { target: { value: '10' } });
  fireEvent.click(calculateButton);

  const yearlyGrowthTable = screen.getByText(/Yearly Growth Table/);
  expect(yearlyGrowthTable).toBeInTheDocument();

  // Check if at least one row exists in the table
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBeGreaterThan(1);
});

test('displays bar graph', () => {
  render(<CAGRCalculator />);
  const initialValueInput = screen.getByPlaceholderText('Enter initial value');
  const interestRateInput = screen.getByPlaceholderText('Enter interest rate');
  const numberOfYearsInput = screen.getByPlaceholderText('Enter number of years');
  const calculateButton = screen.getByText('Calculate Future Value');

  fireEvent.change(initialValueInput, { target: { value: '1000' } });
  fireEvent.change(interestRateInput, { target: { value: '5' } });
  fireEvent.change(numberOfYearsInput, { target: { value: '10' } });
  fireEvent.click(calculateButton);

  const barGraph = screen.getByText(/Bar Graph/);
  expect(barGraph).toBeInTheDocument();
  // You might need to use a more specific selector to ensure the Bar component is rendered.
  // For example, you can check for the existence of a specific class or id in the rendered Bar component.
});

test('displays pie chart', () => {
  render(<CAGRCalculator />);
  const initialValueInput = screen.getByPlaceholderText('Enter initial value');
  const interestRateInput = screen.getByPlaceholderText('Enter interest rate');
  const numberOfYearsInput = screen.getByPlaceholderText('Enter number of years');
  const calculateButton = screen.getByText('Calculate Future Value');

  fireEvent.change(initialValueInput, { target: { value: '1000' } });
  fireEvent.change(interestRateInput, { target: { value: '5' } });
  fireEvent.change(numberOfYearsInput, { target: { value: '10' } });
  fireEvent.click(calculateButton);

  const pieChart = screen.getByText(/Pie Chart/);
  expect(pieChart).toBeInTheDocument();
  // You might need to use a more specific selector to ensure the Pie component is rendered.
  // For example, you can check for the existence of a specific class or id in the rendered Pie component.
});
