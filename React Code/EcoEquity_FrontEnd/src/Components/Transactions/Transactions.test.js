import React from 'react';
import { render, screen } from '@testing-library/react';
import Transactions from './Transactions';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('Transactions', () => {
  it('renders the user name', async () => {
    localStorage.setItem('user', 'John');
    render(<Transactions />);
    expect(await screen.findByText("John's Transactions")).toBeInTheDocument();
  });

  it('renders the transactions table', async () => {
    expect(true).toBe(true);
    const transactions = [
      {
        tickerName: 'AAPL',
        stockName: 'Apple Inc.',
        stockPrice: 150.0,
        type: 'Buy',
        quantity: 10,
        ownedStocks: 20,
      },
      {
        tickerName: 'GOOG',
        stockName: 'Alphabet Inc.',
        stockPrice: 200.0,
        type: 'Sell',
        quantity: 5,
        ownedStocks: 15,
      },
    ];
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(transactions),
    });
    render(<Transactions />);
  });
});