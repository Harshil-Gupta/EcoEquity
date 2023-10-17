import React, { useEffect, useState } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import { Paper, Typography } from "@mui/material";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const userName = localStorage.getItem("user");

  const getAllDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8086/stocks/" + userName
      );
      return response.data;
    } catch (error) {
      console.error("Error getting user name:", error);
      throw error;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDetails();  
        const transactionsWithOwnedStocks = await Promise.all(
          data.map(async (transaction) => {
            const ownedStocks = await fetchOwnedStocks(transaction.stockName);
            return { ...transaction, ownedStocks };
          })
        );
  
        setTransactions(transactionsWithOwnedStocks);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
  }, []);
  

  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    color: "white",
    backgroundColor: "#5A287D",
  };
  return (
    <>
    <div style={{ paddingTop: "75px" }}>
      <Paper elevation={15} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          {userName}'s Transactions
        </Typography>
      </Paper>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Stock Name</th>
              <th>Stock Listed As</th>
              <th>Stock Price at the time you Bought or Sold</th>
              <th>Operation you performed</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.stockName}</td>
                <td>{transaction.tickerName}</td>
                <td>${(transaction.stockPrice).toFixed(2)}</td>
                <td> {transaction.type === "Buy" ? "Bought " : "Sold "} {transaction.quantity}
                   {transaction.quantity > 1? " shares" : " share"}
                  </td>
                <td>${(transaction.stockPrice * transaction.quantity).toFixed(2)}</td>
                <td>Success</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    </>
  );
}

export default Transactions;
