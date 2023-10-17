// ROICalculator.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import './ROICalculator.css';
import ROIFaq from './ROIFaq.js';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const ROICalculator = () => {
  // State variables for input values, results, and button click
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roi, setROI] = useState('');
  const [chartData, setChartData] = useState(null);
  const [investmentGain, setInvestmentGain] = useState('');
  const [annualizedROI, setAnnualizedROI] = useState('');
  const [investmentLength, setInvestmentLength] = useState('');
  const [invested, setInvested] = useState('');
  const [profitPercentage, setProfitPercentage] = useState('');
  const [calculateClicked, setCalculateClicked] = useState(false);

  // Function to calculate ROI and other values
  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (!isNaN(initial) && !isNaN(final)) {
      const roiValue = ((final - initial) / initial) * 100;
      setROI(roiValue.toFixed(2));

      const data = {
        labels: ['Initial Investment', 'ROI'],
        datasets: [
          {
            data: [initial, final - initial],
            backgroundColor: ['#5A287D', 'yellow'], // Purple colors
          },
        ],
      };
      setChartData(data);

      // Calculate investment gain
      const investmentGainValue = final - initial;
      setInvestmentGain(investmentGainValue.toFixed(2));

      // Calculate investment length
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInDays = (end - start) / (1000 * 3600 * 24);
      setInvestmentLength(differenceInDays.toFixed(0));

      // Calculate annualized ROI
      const annualizedROIValue =
        ((Math.pow(1 + roiValue / 100, 365 / differenceInDays) - 1) * 100).toFixed(2);
      setAnnualizedROI(annualizedROIValue);

      // Calculate invested amount
      setInvested(initial);

      // Calculate profit percentage
      const profitPercentageValue = (investmentGainValue / initial) * 100;
      setProfitPercentage(profitPercentageValue.toFixed(2));
    } else {
      // Reset all values if inputs are not valid
      setROI('');
      setChartData(null);
      setInvestmentGain('');
      setAnnualizedROI('');
      setInvestmentLength('');
      setInvested('');
      setProfitPercentage('');
    }

    // Set the state variable to true when Calculate ROI button is clicked
    setCalculateClicked(true);
  };
  useEffect(()=>{
    calculateROI();
  },[]);

  return (
    <>
    
    <Container className="containerofROI">
      <Row>
        <Col md={6} className="offset-md-3 mx-auto" >
          <h1 className="text-center">ROI Calculator</h1>
          <Form>
            <Form.Group controlId="initialInvestment">
              <Form.Label>Initial Investment ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter initial investment"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="finalValue">
              <Form.Label>Final Value ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter final value"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button className="purple" onClick={calculateROI}>
              Calculate ROI
            </Button>
            <br/><br/>
          </Form>
        </Col>
        
        </Row>
        <Row>
        <Col md={6} className="offset-md-3 mx-auto">
          <div >
            {roi !== '' && (
              <div className="result-table">
                <h2 className="text-center">Results</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Investment Gain:</td>
                      <td>${investmentGain}</td>
                    </tr>
                    <tr>
                      <td>ROI:</td>
                      <td>{roi}%</td>
                    </tr>
                    <tr>
                      <td>Annualized ROI:</td>
                      <td>{annualizedROI}%</td>
                    </tr>
                    <tr>
                      <td>Investment Length (Days):</td>
                      <td>{investmentLength}</td>
                    </tr>
                    <tr>
                      <td>Invested Amount:</td>
                      <td>${invested}</td>
                    </tr>
                    <tr>
                      <td>Profit Percentage:</td>
                      <td>{profitPercentage}%</td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            )}
            {chartData && (
              <div className="pie-chart-container">
                <Pie
                  data={chartData}
                  options={{
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 15,
                        fontColor: 'white',
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <br/><br/>
    <ROIFaq />
    </Container>
    </>
  );
};

export default ROICalculator;
