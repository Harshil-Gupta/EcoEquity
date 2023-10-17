import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentPriceFetcher = () => {
  const userName = localStorage.getItem('user');
  const stockOptions = [
    'NatWest Group', 'Apple', 'Google', 'Visa',
    'Tesla', 'Microsoft', 'Amazon', 'Facebook',
    'Walmart', 'Berkshire Hathaway Inc'
  ];

  const getTickerName = {
    'NatWest Group': 'NWG',
    'Google': 'GOOGL',
    'Apple': 'AAPL',
    'Visa': 'V',
    'Tesla': 'TSLA',
    'Microsoft': 'MSFT',
    'Amazon': 'AMZN',
    'Facebook': 'META',
    'Walmart': 'WMT',
    'Berkshire Hathaway Inc': 'BRK.A'
  };

  const fetchStockPrice = async (symbol) => {
    const apiKey = 'ckfgplhr01qovk252d50ckfgplhr01qovk252d5g';
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      const data = await response.json();

      if (data.c) {
        return parseFloat(data.c).toFixed(2);
      } else {
        console.error('Failed to fetch stock price.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      return null;
    }
  };

  const fetchOwnedStocks = async (stockName) => {
    try {
      const response = await axios.get(
        `http://localhost:8086/stocks/${userName}/qty/${stockName}`
      );
      return response.data;
    } catch (error) {
      console.error('Error getting user name:', error);
      throw error;
    }
  };

  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      let totalPrice = 0;
      for (let i = 0; i < stockOptions.length; i++) {
        const ticker = getTickerName[stockOptions[i]];
        const qty = await fetchOwnedStocks(stockOptions[i]);
        if (qty === 0) continue;

        const price = await fetchStockPrice(ticker);
        if (price === null) continue;

        console.log("price: " + price + " qty: " + qty + " for stock: " + stockOptions[i]);
        totalPrice += parseFloat(price) * qty;
      }
      setCurrentPrice(totalPrice);
    };

    fetchPrices();
  }, []); 

  return <>{(currentPrice).toFixed(2)}</>;
};

export default CurrentPriceFetcher;
