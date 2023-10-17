import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import AccordionFAQ from "./AccordionFAQ";
import "./CAGRCalculator.css";

const CAGRCalculator = () => {
  const [initialValue, setInitialValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [numberOfYears, setNumberOfYears] = useState("");
  const [futureValue, setFutureValue] = useState(null);

  // Data for bar graph and pie chart
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    if (futureValue !== null) {
      // Generate data for bar graph
      const barData = {
        labels: Array.from(
          { length: numberOfYears },
          (_, i) => `Year ${i + 1}`
        ),
        datasets: [
          {
            label: "Growth Over the Years",
            data: Array.from(
              { length: numberOfYears },
              (_, i) => initialValue * Math.pow(1 + interestRate / 100, i)
            ),
            backgroundColor: "#5A287D",
          },
        ],
      };
      setBarChartData(barData);

      // Generate data for pie chart
      const pieData = {
        labels: ["Initial Value", "Return"],
        datasets: [
          {
            data: [initialValue, futureValue - initialValue],
            backgroundColor: [
              "#5A287D",
              "yellow",
            ],
          },
        ],
      };
      setPieChartData(pieData);
    }
  }, [initialValue, interestRate, numberOfYears, futureValue]);

  const calculateFutureValue = () => {
    const cagr = Math.pow(1 + interestRate / 100, numberOfYears);
    const futureVal = initialValue * cagr;
    setFutureValue(futureVal);
  };

  return (
    <>
    <Container className="containerofCAGR">
      <h1 className="h1ofCAGR">CAGR Calculator with Charts</h1>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="initialValue">
              <Form.Label>Initial Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter initial value"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="interestRate">
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="numberOfYears">
              <Form.Label>Number of Years</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of years"
                value={numberOfYears}
                onChange={(e) => setNumberOfYears(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Button
              variant="primary"
              onClick={calculateFutureValue}
              className="btn-primaryofCAGR"
            >
              Calculate Future Value
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {futureValue !== null && (
            <>
              <h3>Future Value</h3>
              <p>{`${futureValue.toFixed(2)}`}</p>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {futureValue !== null && (
            <div>
              <h3>Yearly Growth Table</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(
                    { length: parseInt(numberOfYears) + 1 },
                    (_, i) => (
                      <tr key={i}>
                        <td>{`Year ${i}`}</td>
                        <td>{`$${(
                          initialValue * Math.pow(1 + interestRate / 100, i)
                        ).toFixed(2)}`}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {barChartData.labels && (
            <div>
              <h3>Bar Graph</h3>
              <Bar data={barChartData} />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="pieChartCol">
          {pieChartData.labels && (
            <div>
              <h3>Pie Chart</h3>
              <Pie data={pieChartData} className="pieChartForCAGR" />
              <br/><br/><br/>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
        <AccordionFAQ />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CAGRCalculator;
