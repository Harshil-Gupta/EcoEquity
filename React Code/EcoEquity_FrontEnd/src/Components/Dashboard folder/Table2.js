import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Paper, Typography, TextField } from "@mui/material";

function Table2() {
  const userName = localStorage.getItem("user");
  const [transactions, setTransactions] = useState([]);
  const [filterStockName, setFilterStockName] = useState("");
  const [filterTickerName, setFilterTickerName] = useState("");
  const [filterOwnedQuantity, setFilterOwnedQuantity] = useState(0);
  const [filterAvgBuyPrice, setFilterAvgBuyPrice] = useState(0);
  const [filterCurrentlyInvested, setFilterCurrenltyInvested] = useState(0);


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
      console.error("Error getting user name:", error);
      throw error;
    }
  };

  const fetchAvgBuyPrice = async (stockName) => {
    try {
      const response = await axios.get(
        `http://localhost:8086/stocks/${userName}/avgprice/${stockName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting user name:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDetails();
        const transactionsWithDetails = await Promise.all(
          data.map(async (transaction) => {
            const ownedstocks = await fetchOwnedStocks(transaction.stockName);
            const avgBuyPrice = await fetchAvgBuyPrice(transaction.stockName);
            console.log(
              "ownedStocks: " + ownedstocks + " avgBuyPrice: " + avgBuyPrice
            );
            return {
              ...transaction,
              ownedstocks: ownedstocks,
              avgbuyprice: avgBuyPrice,
            };
          })
        );
        setTransactions(transactionsWithDetails);
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

  const seenStockNames = [];

  const uniqueTransactions = transactions.filter((transaction) => {
    if (seenStockNames.includes(transaction.stockName)) {
      return false;
    }

    seenStockNames.push(transaction.stockName);
    return true;
  });

  const handleStockNameFilterChange = (event) => {
    setFilterStockName(event.target.value);
  };

  const handleTickerNameFilterChange = (event) => {
    setFilterTickerName(event.target.value);
  };

  const handleOwnedQuantityChange = (event) => {
    setFilterOwnedQuantity(event.target.value);
  }

  const handleAvgBuyPriceChange = (event) => {
    setFilterAvgBuyPrice(event.target.value);
  }

  const handleCurrentlyInvestedChange = (event) => {
    setFilterCurrenltyInvested(event.target.value)
  }

  const filteredTransactions = uniqueTransactions.filter((transaction) => {
    const stockNameMatch =
      filterStockName === "" || transaction.stockName.includes(filterStockName);
    const tickerNameMatch =
      filterTickerName === "" || transaction.tickerName.includes(filterTickerName);
    const ownedQtyMatch =
      filterOwnedQuantity === "" || transaction.ownedstocks >= parseInt(filterOwnedQuantity); 
    const avgBuyPriceMatch =
      filterAvgBuyPrice === "" || transaction.avgbuyprice >= parseInt(filterAvgBuyPrice);
    const currentlyInvestedMatch =
      filterCurrentlyInvested === "" || (transaction.ownedstocks * transaction.avgbuyprice) >= parseInt(filterCurrentlyInvested);

    return stockNameMatch && tickerNameMatch && ownedQtyMatch && avgBuyPriceMatch && currentlyInvestedMatch;
  });

  // If no filter applied, display unique
  // Else display filtered transactions

  const transactionsToDisplay = filterStockName || filterTickerName || filterOwnedQuantity || filterAvgBuyPrice || filterCurrentlyInvested
    ? filteredTransactions
    : uniqueTransactions;

  return (
    <>
      <Paper elevation={15} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          {userName}'s Stock Portfolio
        </Typography>
        
      </Paper>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th><TextField
            label="Filter Stock Name"
            value={filterStockName}
            variant="outlined"
            onChange={handleStockNameFilterChange}
          /></th>
              <th><TextField
            label="Filter Ticker Name"
            value={filterTickerName}
            onChange={handleTickerNameFilterChange}
          /></th>
              <th><TextField
            label="Filter Average Buy Price"
            id="outlined-number"
              type="number"
            value={filterAvgBuyPrice}
            onChange={handleAvgBuyPriceChange}
          /></th>
              <th><TextField
              id="outlined-number"
              type="number"
            label="Filter Owned Quantity"
            value={filterOwnedQuantity}
            onChange={handleOwnedQuantityChange}
          /></th>
              <th>
              <TextField
            label="Filter Currently Invested"
            id="outlined-number"
              type="number"
            value={filterCurrentlyInvested}
            onChange={handleCurrentlyInvestedChange}
          />
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Stock Name</th>
              <th>Stock Listed As</th>
              <th>Average Buy Price per Stock</th>
              <th>Currently Owned Stocks</th>
              <th>Currently Invested per Stock</th>
            </tr>
          </thead>
          <tbody>
            {transactionsToDisplay.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.stockName}</td>
                <td>{transaction.tickerName}</td>
                <td>${transaction.avgbuyprice.toFixed(2)}</td>
                <td>{transaction.ownedstocks}</td>
                <td>
                  $
                  {(transaction.ownedstocks * transaction.avgbuyprice).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr></tr>
            <tr>
              <td colSpan="5">
                <b>Currently Invested Total Amount: </b>
              </td>
              <td>
                <b>
                  $
                  {transactionsToDisplay
                    .reduce(
                      (total, transaction) =>
                        total +
                        transaction.ownedstocks * transaction.avgbuyprice,
                      0
                    )
                    .toFixed(2)}
                </b>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}

export default Table2;
