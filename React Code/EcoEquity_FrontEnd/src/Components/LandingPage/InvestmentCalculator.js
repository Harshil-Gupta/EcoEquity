import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './InvestmentCalculator.css';

const InvestmentCalculator = ({ selectedSymbol, chartData }) => {
  const [investmentAmount, setInvestmentAmount] = useState(1000); // Default investment amount
  const [investmentTime, setInvestmentTime] = useState(365); // Default investment time (in days)
  const [estimatedFinalValue, setEstimatedFinalValue] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    // Calculate the estimated final value based on the selected stock's data
    const calculateEstimatedFinalValue = () => {
      const selectedStockData = chartData[selectedSymbol] || [];
      if (selectedStockData.length > 0) {
        const dataPoints = selectedStockData.map((point) => point.y);
        const totalGrowth = dataPoints.reduce((acc, value, index) => {
          if (index < dataPoints.length - 1) {
            // Calculate the growth between current and next data point
            return acc + (dataPoints[index + 1] - value);
          }
          return acc;
        }, 0);
        const averageGrowthRate = totalGrowth / selectedStockData.length;
        const estimatedValue = investmentAmount + (averageGrowthRate * investmentTime);
        setEstimatedFinalValue(estimatedValue);
        setGrowthRate(averageGrowthRate);
      }
    };

    calculateEstimatedFinalValue();
  }, [selectedSymbol, chartData, investmentTime, investmentAmount]);

  // Calculate the estimated earnings or loss
  const estimatedEarnings = estimatedFinalValue - investmentAmount;
  const earningsStatement = estimatedEarnings > 0
    ? `You have earned $${estimatedEarnings.toFixed(2)}`
    : `You have a ${estimatedEarnings === 0 ? 'zero' : 'loss of'} $${Math.abs(estimatedEarnings).toFixed(2)}`;

  // Determine label and color based on profit or loss
  const label = estimatedEarnings > 0 ? 'Profit' : estimatedEarnings < 0 ? 'Loss' : 'Investment';
  const chartColors = estimatedEarnings > 0 ? ['purple', 'green'] : estimatedEarnings < 0 ? ['purple', 'red'] : ['purple', 'transparent'];

  // Calculate the total amount
  const totalAmount = investmentAmount !== null ? investmentAmount + estimatedEarnings : null;

  // Pie chart data
  const pieChartData = {
    labels: ["Investment", label],
    datasets: [
      {
        data: [investmentAmount !== null ? investmentAmount : 0, estimatedEarnings],
        backgroundColor: chartColors,
      },
    ],
  };

  // Pie chart options (including reduced width and height)
  const pieChartOptions = {
    maintainAspectRatio: false, // Disable aspect ratio to customize width and height
    // ...other options...
  };

  const handleInvestmentAmountChange = (e) => {
    const newValue = parseFloat(e.target.value); // Parse input as a float
    setInvestmentAmount(!isNaN(newValue) ? newValue : null); // Set to null if it's not a valid number
  };

  const handleInvestmentTimeChange = (e) => {
    const newValue = parseInt(e.target.value, 10); // Parse input as an integer
    setInvestmentTime(!isNaN(newValue) ? newValue : null); // Set to null if it's not a valid number
  };

  return (
    <div className="investment-calculator">
      <h1 className="HeadingOfTable">Know what will be your returns from {selectedSymbol} stock</h1>
      <div className='inputText'>
        <label htmlFor="investmentAmount">Enter Investment Amount:</label>
        <input
          type="number"
          id="investmentAmount"
          value={investmentAmount !== null ? investmentAmount : ''}
          onChange={handleInvestmentAmountChange}
        />
      </div>
      <br/>
      <div className='inputText'>
        <label htmlFor="investmentTime">Enter Investment Time (in days):</label>
        <input
          type="number"
          id="investmentTime"
          value={investmentTime !== null ? investmentTime : ''}
          onChange={handleInvestmentTimeChange}
        />
      </div>
      <br/>
      <div className="investment-result">
        <h2>Estimated Final Value:</h2>
        <p style={{ color: estimatedEarnings > 0 ? 'green' : estimatedEarnings < 0 ? 'red' : '' }}>{earningsStatement}</p>
        <h2>Total Amount After {investmentTime} Days:</h2>
        {totalAmount !== null ? (
          <p>${totalAmount.toFixed(2)}</p>
        ) : (
          <p>Please enter a valid investment amount and time.</p>
        )}
      </div>
      <h6>Growth Rate: {growthRate.toFixed(2)}</h6>

      {/* Pie Chart */}
      <div className="pie-chart">
        <Doughnut data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default InvestmentCalculator;
