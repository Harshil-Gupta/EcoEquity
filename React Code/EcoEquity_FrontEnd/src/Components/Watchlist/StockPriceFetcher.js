import {useEffect } from "react";
// https://finnhub.io/dashboard
// This URL works.
// You guys can use this to fetch current stock price

const StockPriceFetcher = () => {
  useEffect(() => {
    const fetchStockPrice = async () => {
      const apiKey = "ckfgplhr01qovk252d50ckfgplhr01qovk252d5g";
      const symbol = 'AAPL';
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
        );
        const data = await response.json();
        if (data.c) {
          console.log("Price " + parseFloat(data.c).toFixed(2));
        } else {
          console.error("Failed to fetch stock price.");
        }
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default StockPriceFetcher;
