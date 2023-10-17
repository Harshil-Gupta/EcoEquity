// InvestmentAmountCalculator.js

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

function InvestmentAmountCalculator() {
  const [monthlySIP, setMonthlySIP] = useState(0);
  const [timePeriod, setTimePeriod] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const calculateSIP = () => {
    const n = timePeriod;
    const monthlyRate = interestRate / 12 / 100;
    const futureValues = [];
    let totalInvestment = 0;

    for (let i = 1; i <= n; i++) {
      const invested = monthlySIP * i * 12;
      totalInvestment += invested;
      const futureValue =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, i * 12) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const gains = futureValue - invested;
      futureValues.push({ year: i, invested, gains });
      setResult(invested+gains)
    }

    // setResult(totalInvestment + futureValues[n - 1].gains);

    const labels = futureValues.map((item) => `Year ${item.year}`);
    const investedData = futureValues.map((item) => item.invested);
    const gainsData = futureValues.map((item) => item.gains);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Invested',
          data: investedData,
          backgroundColor: 'purple',
        },
        {
          label: 'Gains',
          data: gainsData,
          backgroundColor: 'green',
        },
      ],
    });
  };

  return (
    <>
      <Form.Group controlId="monthlySIP">
        <Form.Label>Monthly SIP Amount (₹)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter monthly SIP amount"
          onChange={(e) => setMonthlySIP(parseFloat(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="timePeriod">
        <Form.Label>Time Period (Years)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter time period in years"
          onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="interestRate">
        <Form.Label>Growth Rate (per annum)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter annual growth rate"
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </Form.Group>
      <br />
      <Button variant="primary" onClick={calculateSIP}>
        Calculate
      </Button>
      <br/><br/>

      {result !== null && (
        <>
          <h3 className="text-center">Result</h3>
          <div className="result text-center">
            Future Value: <span>₹ {result.toFixed(2)}</span>
          </div>
          <br />
          {chartData && (
            <Card>
              <Card.Body>
                <h3>Bar Chart</h3>
                <div className="d-flex justify-content-center">
                  <Bar
                    data={chartData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          stacked: true,
                          ticks: {
                            callback: function (value, index, values) {
                              return '₹' + value;
                            },
                          },
                        },
                        x: {
                          stacked: true,
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </>
  );
}

export default InvestmentAmountCalculator;
