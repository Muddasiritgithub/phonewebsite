import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import Increment from "../../../../../src/app/Components/Common/Increment/index";
import Link from "next/link";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ cartItems, handleClose, setCartItems }) => {
  // Add setCartItems prop
  const [totalPrice, setTotalPrice] = useState(0);

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
  //       {
  //         items: cartItems,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const { url } = response.data; // Get the URL from the response

  //     // Redirect the user to the checkout URL
  //     window.location.href = url; // Redirect to the Stripe checkout page
  //   } catch (error) {
  //     console.error(
  //       "Error in handleCheckout:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // Function to calculate total price

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity; // Calculate total based on item price and quantity
    });
    setTotalPrice(total);
  };

  // Update the total price whenever cartItems change
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  // Handle the quantity change and update the item's quantity in cartItems
  const handleQuantityChange = (newQuantity, index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems); // Update the cart items
    calculateTotalPrice(); // Recalculate total price
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

 
  };

  // Handle item deletion
  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems); // Update cart items state
    };

  return (
    <Box sx={{ position: "relative", padding: "15px" }}>
      <Box
        sx={{
          top: "10px",
          left: "40px",
          transform: "translate(-50px -50px)",
          padding: "0px 20px 20px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          <CloseIcon
            onClick={handleClose}
            sx={{
              cursor: "pointer",
            }}
          />
        </Box>
        <Typography variant="body" sx={{ marginTop: "10px" }}>
          {cartItems.length} Item
        </Typography>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar
                    src={item.imageSrc}
                    alt={item.name}
                    variant="square"
                    sx={{
                      width: "90px",
                      height: "90px",
                      transform: "translateX(-20px)",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <div>Price: ${item.price}</div>
                      <div>Company: {item.Company}</div>
                      <Box>
                        <Increment
                          initialValue={item.quantity}
                          min={1}
                          max={10}
                          item={item} // Pass item to increment component
                          onChange={(newQuantity) =>
                            handleQuantityChange(newQuantity, index)
                          }
                        />
                      </Box>
                    </>
                  }
                />
                <Button
                  onClick={() => handleDelete(index)}
                  sx={{ minWidth: "40px" }}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))
          ) : (
            <>
              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                Your cart is empty.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                sx={{
                  width: "100%",
                  marginBottom: "10px",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </>
          )}
        </List>
      </Box>

      {cartItems.length > 0 && (
        <Box
          sx={{
            position: "sticky",
            backgroundColor: "white",
            padding: "20px",
            width: "100%",
            zIndex: 1000,
            bottom: "0px",
            right: "0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "black" }}>Subtotal:</Typography>
            <Typography sx={{ color: "black" }}>
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "black" }}>Total:</Typography>
            <Typography sx={{ color: "black" }}>
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "black" }}>
              Tax included and shipping calculated at checkout
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Link href="/StripeLayout" passHref>
              <Button
                variant="outlined"
                color="primary"
                // onClick={handleCheckout}
                sx={{
                  width: "100%",
                  marginBottom: "10px",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                  },
                }}
              >
                Checkout
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "100%",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <Link href="/" style={{ textDecoration: "none", color: "black" }}>
                Continue Shopping
              </Link>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
