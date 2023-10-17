import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const WalletDetails = ({ walletValue, onAddMoney }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState("");

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

    onAddMoney(amount);
    setAmountToAdd("");
    toast.success(`Added $${amount.toFixed(2)} to the wallet`);
  };

  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    fontWeight: isHovered ? "bold" : "normal",
    color: "white",
    backgroundColor: "#5A287D",
  };

  const fontStyle = {
    fontWeight: isHovered ? "bold" : "normal",
    color: "white",
  };

  return (
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
        ${walletValue}
      </Typography>
      <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        {/* <InputLabel htmlFor="standard-adornment-amount" sx={{color:'white'}}>Amount</InputLabel> */}
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          sx={{ color: 'white' }}
          value={amountToAdd} 
          placeholder="Enter amount to add"
          onChange={(e) => setAmountToAdd(e.target.value)} 
        />
      </FormControl>
      <br />
      <Button variant="contained" color="info" onClick={handleAddMoneyClick}>
        Add Money
      </Button>
      </div>
      <ToastContainer />
    </Paper>
  );
};

export default WalletDetails;
