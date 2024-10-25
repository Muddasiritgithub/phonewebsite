import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CustomIncrementer = ({ initialValue = 1, min = 1, max = 10, onChange }) => {
  const [count, setCount] = useState(initialValue || 1); // Default to 1

  const handleIncrement = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      if (onChange) onChange(newValue);
    }
  };

  // Update total price whenever count or itemPrice changes
  // useEffect(() => {
  //   const totalPrice = count * itemPrice * 2; // Double the item price
  //   setTotalPrice(totalPrice);
  // }, [count, itemPrice, setTotalPrice]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100px", // You can adjust this width
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "4px 8px",
        marginTop: "20px"
      }}
    >
      <IconButton onClick={handleDecrement} size="small">
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1">{count}</Typography>
      <IconButton onClick={handleIncrement} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CustomIncrementer;
