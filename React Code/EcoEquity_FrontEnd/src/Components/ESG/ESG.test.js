import { render, screen } from '@testing-library/react';
import ESG from './ESG';

test('renders ESG section title', () => {
  render(<ESG />);
  const titleElement = screen.getByText(/Environmental, Social, & Governance Section/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders ESG card', () => {
  render(<ESG />);
  const cardElement = screen.getByText(/What is ESG?/i);
  expect(cardElement).toBeInTheDocument();
});

test('renders ESG footer', () => {
  render(<ESG />);
  const footerElement = screen.getByText(/Learn More about ESG/i);
  expect(footerElement).toBeInTheDocument();
});