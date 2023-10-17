import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import EditButton from "./EditButton";
import axios from "axios";
import Table2 from "./Table2";

function Home() {
  const [totalInvested, setTotalInvested] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const userName = localStorage.getItem("user");
  useEffect(() => {
    const endpoint =
      "http://localhost:8086/stocks/" + userName + "/totalInvestedValue";
    axios
      .get(endpoint)
      .then((response) => {
        // setTotalInvested(parseFloat(response.data).toFixed(2));
        setTotalInvested(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total invested value:", error);
      });
  }, []);

  //CurrentPriceFetcher
  const stockOptions = [
    "NatWest Group",
    "Apple",
    "Google",
    "Visa",
    "Tesla",
    "Microsoft",
    "Amazon",
    "Facebook",
    "Walmart",
    "Berkshire Hathaway Inc",
  ];

  const getTickerName = {
    "NatWest Group": "NWG",
    Google: "GOOGL",
    Apple: "AAPL",
    Visa: "V",
    Tesla: "TSLA",
    Microsoft: "MSFT",
    Amazon: "AMZN",
    Facebook: "META",
    Walmart: "WMT",
    "Berkshire Hathaway Inc": "BRK.A",
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

  useEffect(() => {
    const fetchPrices = async () => {
      let totalPrice = 0;
      for (let i = 0; i < stockOptions.length; i++) {
        const ticker = getTickerName[stockOptions[i]];
        const qty = await fetchOwnedStocks(stockOptions[i]);
        if (qty === 0) continue;

        const price = await fetchStockPrice(ticker);
        if (price === null) continue;

        console.log(
          "price: " + price + " qty: " + qty + " for stock: " + stockOptions[i]
        );
        totalPrice += parseFloat(price) * qty;
      }
      setCurrentPrice(totalPrice);
    };

    fetchPrices();
  }, []);

  // BookedProfit
  const [totalBookedProfit, setTotalBookedProfit] = useState(0);

  useEffect(() => {
    const fetchTotalRealisedValue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8086/stocks/" + userName + "/totalRealisedValue"
        );
        setTotalBookedProfit(response.data);
      } catch (error) {
        console.error("Error fetching total realised value:", error);
      }
    };

    fetchTotalRealisedValue();
  }, []);

  const Gain = currentPrice - totalInvested + totalBookedProfit;
  const label = Gain > 0 ? "Profit" : Gain < 0 ? "Loss" : "No Change";

  const COLOR = {
    Invested: "#800080", // Purple for "Invested"
    Loss: "#FF5733", // Orange for "Loss"
    Profit: "#008000", // Green for "Profit"
  };

  const piedata = [
    {
      name: label,
      value: Math.abs(Gain),
      description: "Description for Group A",
    },
    {
      name: "Invested",
      value: totalInvested,
      description: "Description for Group A",
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  // const currentInvestedAmount = totalInvested - Gain - totalBookedProfit;
  // const currentInvestedAmount = 0;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Welcome back!</h3>
      </div>
      <EditButton />

      <div className="main-cards1">
        <div className="card1">
          <div className="card-inner1">
            <h3>Total Invested Amount</h3>
          </div>
          <h1>${totalInvested.toFixed(2)}</h1>
          <h4>
            {/* Currently Invested: <b>${currentInvestedAmount.toFixed(2)}</b> */}
          </h4>
        </div>
        <div className="card1">
          <div className="card-inner1">
            <h3>Current Portfolio Value: </h3>
          </div>
          <h1>${currentPrice.toFixed(2)}</h1>
        </div>
        <div className="card1">
          <div className="card-inner1">
            <h3>Unrealised Profit/Loss</h3>
          </div>
          <h1>${Gain.toFixed(2)}</h1>
          <h4>
            <b>Booked Profits: ${totalBookedProfit.toFixed(2)}</b>
          </h4>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={200}>
          <Tooltip />
          <Legend />
          <Pie
            data={piedata}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {piedata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR[entry.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Table2/>
    </main>
  );
}

export default Home;
