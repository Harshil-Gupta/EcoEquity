import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import {
  AdvancedRealTimeChart,
  Ticker,
  FundamentalData,
  SymbolInfo,
} from "react-ts-tradingview-widgets";
import Table from "react-bootstrap/Table";
import Header from '../Dashboard folder/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  InputAdornment,
  Input,
  Paper,
  Typography,
} from "@mui/material";
function TradingView() {
  const [selectedSymbol, setSelectedSymbol] = useState("NWG");
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [walletValue, setWalletValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState("");

  const userName = localStorage.getItem("user");
  useEffect(() => {
    userWalletDetails();
  }, []);

  const userWalletDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8085/users/detailswallet/" + userName
      );
      setWalletValue(response.data);
    } catch (err) {
      console.log(err);
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

  const fetchStockPrice = async (symbol) => {
    const apiKey = "ckfgplhr01qovk252d50ckfgplhr01qovk252d5g";
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      const data = await response.json();

      if (data.c) {
        return parseFloat(data.c).toFixed(2);
      } else {
        console.error("Failed to fetch stock price.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching stock price:", error);
      return null;
    }
  };

  const handleStockSelect = async (stock) => {
    setSelectedSymbol(stock);
    try {
      const selectedStockDetails = stockOptions.find(
        (option) => option.ticker === stock
      );

      if (selectedStockDetails) {
        const fetchedPrice = await fetchStockPrice(stock);
        const UserownedStocks = await fetchOwnedStocks(selectedStockDetails.name);
        const updatedStocks = [
          ...selectedStocks,
          {
            symbol: stock,
            name: selectedStockDetails.name,
            price: fetchedPrice,
            quantity: 0,
            ownedStocks: UserownedStocks,
          },
        ];
        setSelectedStocks(updatedStocks);
      }
    } catch (error) {
      console.error("Error selecting stock:", error);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity < 0) {
      toast.error("You cannot enter negative value");
      return;
    }
    const updatedStocks = [...selectedStocks];
    updatedStocks[index].quantity = quantity;
    setSelectedStocks(updatedStocks);

  };
  const getOwnedQty = async (stockname) => {
    try {
      const response = await axios.get(
        "http://localhost:8086/stocks/" + userName + "/qty/" + stockname
      );
      return response.data;
    } catch (error) {
      console.error("Error getting quantity owned by user:", error);
      throw error;
    }
  };

  const stockOptions = [
    { name: "NatWest Group", ticker: "NWG" },
    { name: "Apple", ticker: "AAPL" },
    { name: "Google", ticker: "GOOGL" },
    { name: "Visa", ticker: "V" },
    { name: "Tesla", ticker: "TSLA" },
    { name: "Microsoft", ticker: "MSFT" },
    { name: "Amazon", ticker: "AMZN" },
    { name: "Facebook", ticker: "META" },
    { name: "Walmart", ticker: "WMT" },
    { name: "Berkshire Hathaway Inc", ticker: "BRK.A" },
  ];

  const gettickername = {
    "NatWest Group": "NWG",
    Apple: "AAPL",
    Google: "GOOGL",
    Visa: "V",
    Tesla: "TSLA",
    Microsoft: "MSFT",
    Amazon: "AMZN",
    Facebook: "META",
    Walmart: "WMT",
    "Berkshire Hathaway Inc": "BRK.A",
  };

  const walletConnectMongoDB = async (newWalletValue) => {
    let JsonData = JSON.stringify(newWalletValue);
    let config = {
      method: "put",
      maxBodyLength: 10,
      url: "http://localhost:8085/users/wallet/" + userName,
      headers: {
        "Content-Type": "application/json",
      },
      data: JsonData,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log("Wallet value updated successfully " + response.data);
      })
      .catch((error) => {
        console.error("Error updating wallet value:", error);
      });
  };
  const handleBuy = async (stock) => {
    if (stock.quantity === 0 || walletValue === 0 || stock.quantity === "0") {
      toast.error(
        "You have selected no shares to buy or you have no money in your wallet"
      );
      return;
    } else if (walletValue < stock.price * stock.quantity) {
      toast.error("You do not have enough money to buy these shares");
      return;
    }

    let stocksOwned = await getOwnedQty(stock.name);
    console.log(
      "Stocks previously owned of that particular stock:" + stocksOwned
    );
    const newStockOwned = parseInt(stock.quantity) + parseInt(stocksOwned);
    console.log("Stocks now owned of that particular stock:" + newStockOwned);
    updateOwnedStocks(stock.name, newStockOwned);


    let Stockdata = JSON.stringify({
      username: userName,
      stockName: stock.name,
      stockPrice: stock.price,
      quantity: stock.quantity,
      tickerName: gettickername[stock.name],
      type: "Buy",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8086/stocks",
      headers: {
        "Content-Type": "application/json",
      },
      data: Stockdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    let newWalletValue = walletValue - stock.price * stock.quantity;
    toast.success(
      stock.quantity +
        " " +
        stock.name +
        " shares bought for $" +
        (stock.price * stock.quantity).toFixed(2) +
        " @ $" +
        stock.price +
        " each."
    );
    setWalletValue(newWalletValue);
    walletConnectMongoDB(newWalletValue);
  };

  const handleSell = async (stock) => {
    if (stock.quantity === 0 || stock.quantity === "0") {
      toast.error("You have selected no shares to sell");
      return;
    }

    let stocksOwned = await getOwnedQty(stock.name);
    console.log(
      "Stocks previously owned of that particular stock:" + stocksOwned
    );
    const newStockOwned = parseInt(stocksOwned) - parseInt(stock.quantity);
    if (newStockOwned < 0) {
      const str = "Reason: Owned stocks are less than selected stocks";
      toast.error("Could not sell")
      toast.warn(str)
      console.log(str);
      return;
    }
    updateOwnedStocks(stock.name, newStockOwned);
    console.log("Stocks now owned of that particular stock:" + newStockOwned);
    
    let Stockdata = JSON.stringify({
      username: userName,
      stockName: stock.name,
      stockPrice: stock.price,
      quantity: stock.quantity,
      tickerName: gettickername[stock.name],
      type: "Sell",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8086/stocks",
      headers: {
        "Content-Type": "application/json",
      },
      data: Stockdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    let newWalletValue = walletValue + stock.price * stock.quantity;
    toast.success(
      stock.quantity +
        " " +
        stock.name +
        " shares sold for $" +
        (stock.price * stock.quantity).toFixed(2) +
        " @ $" +
        stock.price +
        " each."
    );
    setWalletValue(newWalletValue);
    walletConnectMongoDB(newWalletValue);
  };

  const updateOwnedStocks = (stockName, newValue) => {
    const updatedStocks = selectedStocks.slice();
    const indexOfStockToUpdate = updatedStocks.findIndex(
      (stock) => stock.name === stockName
    );
    if (indexOfStockToUpdate !== -1) {
      updatedStocks[indexOfStockToUpdate].ownedStocks = newValue;
      setSelectedStocks(updatedStocks);
    } else {
      console.error("Stock to update not found in the list.");
    }
  };

  const removeFromList = (stockToRemove) => {
    const updatedStocks = selectedStocks.slice();
    const indexOfStockToRemove = updatedStocks.findIndex(
      (stock) => stock.symbol === stockToRemove.symbol
    );
    if (indexOfStockToRemove !== -1) {
      updatedStocks.splice(indexOfStockToRemove, 1);
      setSelectedStocks(updatedStocks);
    } else {
      console.error("Stock to remove not found in the list.");
    }
  };

  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    width: "auto",
    fontWeight: isHovered ? "bold" : "normal",
    color: "white",
    backgroundColor: "#5A287D",
  };

  const fontStyle = {
    fontWeight: isHovered ? "bold" : "normal",
    color: "white",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddMoneyClick = () => {
    if (!amountToAdd || isNaN(amountToAdd)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const amount = parseFloat(amountToAdd);
    if (amount <= 0) {
      toast.error("Please enter a valid positive amount.");
      return;
    }
    let newWalletValue = walletValue + amount;
    setWalletValue(newWalletValue);
    walletConnectMongoDB(newWalletValue);
    setAmountToAdd("");
    toast.success(`Added $${newWalletValue.toFixed(2)} to the wallet`);
  };

  return (
    
    <div style={{ paddingTop: "75px" }}>
      <Ticker colorTheme="light" />
      <Stack direction="horizontal" gap={3} style={{justifyContent: "center"}}>
      <div className="p-2">
      <div className="text-center">
        <Typography variant="h3" style={{ color: "black" }}>
          {userName}'s Stock Watchlist
        </Typography>
      </div>
      </div>

      <div className="p-2">
      <div class="d-flex flex-row" className="wallet-details">
        <div class="d-flex flex-row" style={{justifyContent: "center"}} >
        <Paper
          elevation={15}
          style={paperStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Typography variant="h5" gutterBottom>
            Wallet Balance:
          </Typography>
          <Typography variant="h4" style={fontStyle}>
            ${walletValue.toFixed(2)}
          </Typography>
          <div>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
            <FormControl sx={{ m: 1 }} variant="standard">
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                sx={{ color: "white" }}
                value={amountToAdd}
                placeholder="Enter amount to add"
                onChange={(e) => setAmountToAdd(e.target.value)}
              />
            </FormControl>
            </div>
            <div className="p-2">
            <Button
              variant="success"
              className="mx-2"
              onClick={handleAddMoneyClick}
            >
              Add Money
            </Button>
            </div>
            </Stack>
          </div>
          <ToastContainer />
        </Paper>
        </div>
      </div>
      </div>
      </Stack>

      <div className="text-center">
        <div style={{paddingInline:"70px"}}>
        <Form className="mt-3">
          <Form.Select
            onChange={(e) =>
              handleStockSelect(e.target.value) &&
              setSelectedSymbol(e.target.value)
            }
          >
            <option>Select a stock</option>
            {stockOptions.map((stock, index) => (
              <option key={index} value={stock.ticker}>
                {stock.name} ({stock.ticker})
              </option>
            ))}
          </Form.Select>
        </Form>
        </div>

        <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Stock Listed As</th>
                <th>Stock Price</th>
                <th>Owned Stocks</th>
                <th>Selected Quantity</th>
                <th>Calculated Total Price</th>
                <th>Buy</th>
                <th>Sell</th>
                <th>Remove from Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {selectedStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stock.name}</td>
                  <td>{stock.symbol}</td>
                  <td>${stock.price}</td>
                  <td>{stock.ownedStocks}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="0"
                      value={stock.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>${(stock.price * stock.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="success"
                      className="mx-2"
                      onClick={() => handleBuy(stock)}
                    >
                      Buy
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleSell(stock)}
                    >
                      Sell
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="mx-2"
                      onClick={() => removeFromList(stock)}
                    >
                      Remove Stock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* ************************************************************************8 */}

        <div className="mt-3">
          <SymbolInfo
            colorTheme="light"
            symbol={selectedSymbol}
            autosize
          ></SymbolInfo>
        </div>

        <div className="mt-3">
          <AdvancedRealTimeChart
            symbol={selectedSymbol}
            theme="light"
            show_popup_button={true}
            width="100%"
            watchlist={[
              "NWG",
              "AAPL",
              "GOOGL",
              "V",
              "MSFT",
              "AMZN",
              "FB",
              "TSLA",
              "META",
              "WMT",
              "BRK.A",
            ]}
          />
        </div>

        <div className="mt-3">
          <FundamentalData
            symbol={selectedSymbol}
            colorTheme="light"
            height={400}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default TradingView;
