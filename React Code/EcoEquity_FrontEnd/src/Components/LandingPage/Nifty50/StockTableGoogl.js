import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Nifty50.css";
import { Link } from "react-router-dom";
import {SymbolOverview} from "react-ts-tradingview-widgets";

const STOCKS = [
  { name: "Apple", roi: 225.44 },
  { name: "Google", roi: 148.04 },
  { name: "Microsoft", roi: 202.24 },
];
const INITIAL_INVESTMENT = 1000; // Initial investment amount in dollars


const StockROI = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const calculateROI = () => {
      const stockResults = STOCKS.map((stock) => {
        const calculatedROI = stock.roi;
        const currentInvestmentValue =
          (INITIAL_INVESTMENT * (1 + calculatedROI / 100)).toFixed(2);

        return {
          name: stock.name,
          roi: calculatedROI.toFixed(2),
          currentValue: currentInvestmentValue,
        };
      });

      setStockData(stockResults);
    };

    calculateROI();
  }, []);

  return (
    <div>
      <h1 style={{ color: "purple" }} className="Nifty50-h1">
      Hello Investor, Begin Your Investment Journey Today!
      </h1>
      <div className="container Chart-box offset-md-3 mx-auto">
        <div className="chart-container">
          {/* Center the SymbolOverview component horizontally */}
          <section style={{ margin: "0 auto" }}>
            <SymbolOverview
              colorTheme="light"
              autosize={false} // Disable autosize
              chartType="candlesticks"
              downColor="#800080"
              borderDownColor="#800080"
              wickDownColor="#800080"
              height="400px" // Set the desired height
              width="100%" // Set the desired width
              widgetFontColor="#5A287D"
            />
          </section>
        </div>
      </div><br/><br/>

      <div className="card-container offset-md-3 mx-auto Nifty50 container">
        <Row>
          {stockData.map((stock, index) => (
            <Col className="col-lg-4 d-flex align-items-stretch pb-4" key={index}>
              <Card style={{ backgroundColor: "white", textAlign: "center" }} className="card1">
                <Card.Body>
                  <Card.Title className="CardTitle">
                    {stock.name} Stock
                  </Card.Title>
                  {/* <Card.Text className="card-main">
                    If you had invested <b>${INITIAL_INVESTMENT}</b> in {stock.name} five years ago, you would now have approximately received a return on investment (ROI) of {stock.roi}%, resulting in a current value of <b>${stock.currentValue}</b>.
                  </Card.Text>      */}
                  <Card.Text className="card-main">
                    Investing <b>${INITIAL_INVESTMENT}</b> in {stock.name} five years ago would now be worth <b>${stock.currentValue}</b>, resulting in ROI of {stock.roi}%.
                  </Card.Text>               
                  For more Insights
                  <br/>
                  <Link to="/login"><Button variant="warning" className="login-button">Login</Button></Link>
                  {/* Add Sign In button or other UI elements as needed */}
                </Card.Body>
              </Card>
              <br/>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default StockROI;
