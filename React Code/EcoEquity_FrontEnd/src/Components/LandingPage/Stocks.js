import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Dropdown } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import './StockTable.css';
import InvestmentCalculator from './InvestmentCalculator';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState('IBM'); // Default selection
  const chartRef = useRef(null);
  const apiKey = 'demo';
  const stockSymbols = [
    'IBM',
    'TSCO.LON',
    'SHOP.TRT',
    'GPV.TRV',
    'MBG.DEX',
    'AAPL'
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDataArray = [];
        const chartData = {};

        for (const symbol of stockSymbols) {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
          );

          const timeSeries = response.data['Time Series (Daily)'];

          if (timeSeries) {
            const data = Object.keys(timeSeries).map((time) => ({
              x: new Date(time),
              y: parseFloat(timeSeries[time]['4. close']),
            }));

            const latestTime = Object.keys(timeSeries)[0];
            const latestStockData = timeSeries[latestTime];

            const stockData = {
              symbol: symbol,
              price: parseFloat(latestStockData['4. close']),
              change: parseFloat(latestStockData['4. close']) - parseFloat(latestStockData['1. open']),
            };

            stockDataArray.push(stockData);
            chartData[symbol] = data;
          }
        }

        setStocks(stockDataArray);
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();

    const intervalId = setInterval(fetchStockData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        backgroundColor: 'black', // Purple background color for tooltip
      },
    },
    elements: {
      point: {
        radius: 0, // Hide data points
      },
    },
    datasets: [
      {
        label: `${selectedSymbol} Price`,
        data: chartData[selectedSymbol] || [],
        fill: true,
        backgroundColor: 'purple', // Purple background color for chart
        borderColor: 'white', // White line color
        borderWidth: 2,
      },
    ],
  };

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event);
  };
  if (stocks.length <=1){
    console.log(stocks)
    return(
      <div className="center-container">
      <h1 className='HeadingOfTable'>Loading Stock Data</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className='HeadingOfTable'>Take a look at a few of these Stock Watch: Prices and Changes</h1>
      <div className="dropdown">
      </div>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td className="purple-text">${stock.price.toFixed(2)}</td>
              <td className={`change-text ${stock.change > 0 ? 'up' : 'down'}`}>
                {stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h1 className="HeadingOfTable">Select a Stock Below to See Graphical behaviour of Stock:</h1>
      <Dropdown onSelect={handleSymbolChange}>
        <Dropdown.Toggle variant="custom" id="dropdown-custom">
          {selectedSymbol}
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown">
          {stockSymbols.map((symbol) => (
            <Dropdown.Item key={symbol} eventKey={symbol}>
              {symbol}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <br/>
      <div className="chart-card">
        <h2>{selectedSymbol} Stock Price Chart</h2>
        <Line
          ref={chartRef}
          data={{
            datasets: [
              {
                label: `${selectedSymbol} Price`,
                data: chartData[selectedSymbol] || [], // Use selected symbol's data
                fill: false,
                backgroundColor: 'black', // Purple background color for chart
                borderColor: '#5A287D', // White line color
                borderWidth: 2,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>
      <InvestmentCalculator selectedSymbol={selectedSymbol} chartData={chartData} />
    </div>
  );
};

export default StockTable;
