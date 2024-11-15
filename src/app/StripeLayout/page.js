"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Container,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  // CheckIcon
} from "@mui/material";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QCxVMB366HxUl0yPYQRTzNJoDQVXuiboylercoz768IYk1MPPsQ9lrJDreuwbUgxDHzGrclk6octtT34ppPqxZi00EMdXnq80"
);
stripePromise.then((stripe) => {
  if (stripe) {
    alert("Stripe loaded successfully!");
  } else {
    alert("Failed to load Stripe.");
  }
});
const locations = ["New York, USA", "London, UK", "Tokyo, Japan"];
const shippings = ["Free"];

const page = () => {
  const stripe = useStripe(); // Stripe ka object
  const elements = useElements(); // Elements ka object
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCartItems(cartItems);
      console.log("cartItems", cartItems);
    } else {
      console.log("Cart is empty");
    }
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleLocationClick = (location) => {
    console.log(`Location clicked: ${location}`);
  };

  const handleShippingClick = (shipping) => {
    console.log(`Shipping method clicked: ${shipping}`);
  };

  // const handlePayment = async () => {
  //   const amount = 1000; // Ensure the amount is valid

  //   // Start the loading process
  //   setLoading(true);
  //   setError(""); // Clear previous errors
  //   setPaymentStatus(null); // Reset payment status before a new attempt

  //   try {
  //     // Send POST request to backend to create a payment intent
  //     console.log("Sending POST request to backend...");
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`,
  //       {
  //         amount: amount,
  //         currency: "usd",
  //       }
  //     );

  //     // Check response and log it
  //     console.log("Response from backend:", response.data);

  //     // If the backend responds with a clientSecret, handle the confirmation
  //     if (response.data.clientSecret) {
  //       const { clientSecret } = response.data;
  //       console.log("Received clientSecret:", clientSecret);

  //       // Ensure Stripe and Elements are initialized
  //       if (!stripe || !elements) {
  //         setError("Stripe.js or Elements is not initialized.");
  //         console.log("Error: Stripe.js or Elements is not initialized.");
  //         return;
  //       }
  //       console.log("Stripe and Elements are initialized.");

  //       // Get the CardElement
  //       const cardElement = elements.getElement(PaymentElement);
  //       console.log("cardElement retrieved:", cardElement);
  //       if (!cardElement) {
  //         setError("Card element is not available.");
  //         console.log("Card element is not available.");
  //         return;
  //       }

  //       // Confirm the payment using the card element
  //       const confirmResponse = await stripe.confirmCardPayment(clientSecret, {
  //         payment_method: {
  //           card: cardElement, // cardElement should be the Stripe Card input element
  //           billing_details: {
  //             name: "Customer Name", // Optionally, replace with actual customer info
  //           },
  //         },
  //       });

  //       // Handle the response after payment confirmation
  //       console.log("Payment confirmation response:", confirmResponse);

  //       if (confirmResponse.error) {
  //         setError(`Payment failed: ${confirmResponse.error.message}`);
  //         console.log("Payment failed:", confirmResponse.error.message);
  //       } else {
  //         setPaymentStatus("Payment successful!");
  //         console.log("Payment successful!");
  //       }

  //       // Clear the card element after payment
  //       cardElement.clear();
  //     } else {
  //       setError("Failed to create payment intent.");
  //       console.log("Failed to create payment intent.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("Something went wrong. Please try again.");
  //   } finally {
  //     // Stop the loading process after the payment process completes
  //     setLoading(false);
  //     console.log("Loading stopped.");
  //   }
  // };
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        console.log("Sending request to create payment intent...");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`,
          {
            items: [{ amount: 1400 }], // Adjust amount as needed
          }
        );
        console.log("Received response from API:", response);

        const { clientSecret } = response.data;
        if (clientSecret) {
          console.log("Client secret received:", clientSecret);
          setClientSecret(clientSecret);
        } else {
          setError("Client secret is missing.");
          console.error("Client secret is missing in the response.");
        }
      } catch (err) {
        setError("Error fetching client secret.");
        console.error("Error fetching client secret:", err);
      }
    };

    fetchClientSecret();
  }, []);

  // Handle the payment submission
  const handlePayment = async (event) => {
    event.preventDefault();
    console.log("Payment submission initiated...");

    // Ensure stripe and elements are loaded
    if (!stripe || !elements) {
      console.error("Stripe.js or Elements not loaded yet.");
      setError("Stripe.js or Elements not loaded yet.");
      return;
    }
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      console.error("Payment Element is not mounted.");
      setError("Payment Element is not mounted.");
      return;
    }

    try {
      // Confirm the payment using Stripe API
      console.log("Confirming payment with Stripe...");
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements, // Pass the elements instance
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`, // Adjust as needed
        },
      });

      console.log("Stripe confirmPayment response:", { error, paymentIntent });

      if (error) {
        console.error("Error confirming payment:", error.message);
        setError(error.message); // Set the error message
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        // Handle successful payment here
      } else {
        console.error(
          "Payment status is not 'succeeded'. Status:",
          paymentIntent.status
        );
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during payment confirmation:", err);
      setError("Payment confirmation failed.");
    }
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          border: "1px solid hsl(0, 0%, 87%)",
          width: "100%", // Ensures full width
          boxSizing: "border-box", // Ensures padding is included in the width calculation
        }}
      >
        <Typography
          variant="h4" // Slightly larger font size for a logo feel
          sx={{
            background:
              "linear-gradient(45deg, hsl(0, 80%, 50%), hsl(45, 100%, 50%))", // Red to yellow gradient
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "transparent",
            WebkitBackgroundClip: "text", // Applies gradient to the text only
            backgroundClip: "text",
            textShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)", // Larger shadow for a glowing effect
            fontFamily: "'Poppins', sans-serif", // Example custom font
            "&:hover": {
              textShadow: "6px 6px 15px rgba(255, 165, 0, 0.7)", // Brighter glow on hover
              transform: "scale(1.05)", // Slightly enlarges on hover
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          BlendMobile
        </Typography>

        <Box>
          <ShoppingBagIcon />
        </Box>
      </Box>

      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Box textAlign="center" mb={2} pt={4}>
            <Typography variant="h6">Express checkout</Typography>
          </Box>
          <Box textAlign="center" mb={2}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: "Black", // Set the background color to black
                color: "white", // Set the text color to white
                height: "60px",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              Pay
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "540px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box
              textAlign="center"
              my={2}
              display="flex"
              alignItems="center"
              margin="30px"
            >
              <Divider style={{ flex: 1 }} />
              <Typography variant="body2" style={{ margin: "0 16px" }}>
                OR
              </Typography>
              <Divider style={{ flex: 1 }} />
            </Box>

            {/* Account Disabled Accordion */}
            <Accordion
              sx={{
                backgroundColor: "transparent", // No background color
                boxShadow: "none", // Remove shadow if any
                marginTop: "70px",
                marginBottom: "30px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="textSecondary">Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Please enter your email to reactivate your account.
                </Typography>
                <Button color="primary" style={{ marginTop: "8px" }}>
                  Logout
                </Button>
              </AccordionDetails>
            </Accordion>

            {/* Ship To Accordion */}
            <Accordion
              sx={{
                backgroundColor: "transparent", // No background color
                boxShadow: "none", // Remove shadow if any
                marginTop: "40px",
                marginBottom: "30px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="textSecondary">Ship To</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {locations.map((location, index) => (
                  <Button
                    key={index}
                    onClick={() => handleLocationClick(location)}
                    sx={{
                      marginBottom: 1,
                      textTransform: "none",
                      justifyContent: "start",
                      width: "100%",
                    }} // Full width, no text transform
                  >
                    <Typography>{location}</Typography>
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Shipping Method Accordion */}
            <Accordion
              sx={{
                backgroundColor: "transparent", // No background color
                boxShadow: "none", // Remove shadow if any
                marginTop: "40px",
                marginBottom: "30px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="textSecondary">Shipping Method</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {shippings.map((shipping, index) => (
                  <Button
                    key={index}
                    onClick={() => handleShippingClick(shipping)}
                    sx={{
                      marginBottom: 1,
                      textTransform: "none",
                      justifyContent: "start",
                      width: "100%",
                      color: "lightSkyBlue",
                    }} // Full width, no text transform
                  >
                    <Typography>{shipping}</Typography>
                  </Button>
                ))}{" "}
              </AccordionDetails>
            </Accordion>

            {/* Payment Heading */}
            <Box sx={{ margin: "15px" }}>
              <Typography variant="h6" mt={3}>
                Payment
              </Typography>
              <Typography variant="body1" mb={2}>
                All transactions are secure and encrypted.
              </Typography>
            </Box>
          </Box>

          {/* Stripe Fields */}
          {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "550px",
                mx: "auto",
                mt: 5,
                p: 4,
                borderRadius: 3,
                bgcolor: "hsl(0deg 0% 97.03%)",  
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Credit Card
              </Typography>


              <TextField
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
                sx={{
                  bgcolor: "background.default",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.300",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Expiration Date"
                  placeholder="MM / YY"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{
                    bgcolor: "background.default",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "grey.300",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  label="Security Code"
                  placeholder="CVV"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{
                    bgcolor: "background.default",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "grey.300",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
              </Box>

              <TextField
                label="Name On Card"
                placeholder="John Doe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
                sx={{
                  bgcolor: "background.default",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.300",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />

              <Box
                display="flex"
                alignItems="center"
                sx={{
                  borderRadius: 2,
                  p: 1,
                  border: "1px solid #ddd",
                  "& .MuiRadio-root": {
                    color: "transparent",  
                    "&.Mui-checked": {
                      color: "#4CAF50",  
                    },
                    "& .MuiSvgIcon-root": {
                      display: "none",  
                    },
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Radio
                      icon={
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 18,
                            height: 18,
                            border: "2px solid #ccc",
                            borderRadius: "50%",
                          }}
                        />
                      }
                      checkedIcon={
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 18,
                            height: 18,
                            border: "2px solid #4CAF50",
                            borderRadius: "50%",
                            backgroundColor: "#4CAF50",
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 14, color: "white" }} />
                        </span>
                      }
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      Use shipping address as billing address
                    </Typography>
                  }
                />
              </Box>
            </Box> */}
          <Box>
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentElement />
                <Box textAlign="center" mb={2} mt={4}>
                  <Button
                    onClick={handlePayment}
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      height: "60px",
                      borderRadius: "10px",
                    }}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </Button>

                  {paymentStatus === "successful" && (
                    <div style={{ color: "green", marginTop: "10px" }}>
                      Payment successful! Thank you for your purchase.
                    </div>
                  )}

                  {paymentStatus === "unsuccessful" && (
                    <div style={{ color: "red", marginTop: "10px" }}>
                      Payment failed. Please try again.
                    </div>
                  )}

                  {error && <p style={{ color: "red" }}>{error}</p>}
                </Box>
              </Elements>
            ) : (
              <div>Plz wait... Loading payment details...</div> // Display loading message or fallback UI
            )}
          </Box>
        </Grid>

        {/* Right Grid */}
        <Grid item xs={6}>
          <Box
            sx={{
              position: "sticky", // Corrected from 'Sticky' to 'sticky'
              backgroundColor: "hsl(0, 0%, 96%)",
              padding: "0px 40px",
              top: "0px", // Ensure it sticks 65px from the top of the viewport
              right: "0px", // Keep distance from the right
              bottom: "0px",
              maxWidth: "800px", // Set a smaller width for compact view
              height: "100%", // Ensure enough height for sticky element to work
              overflowY: "auto", // Allow scroll if content exceeds height
              zIndex: 1000, // Ensure it's on top of other elements
            }}
          >
            <Typography variant="h5" mb={4} pt={4}>
              Your Cart
            </Typography>
            <Box>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    {/* Image */}
                    <Image
                      src={item.imageSrc}
                      alt="Item Image"
                      layout="intrinsic"
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "rgb(232 232 232)",
                        padding: "8px 10px",
                        border: "1px solid hsl(0, 0%, 84%)",
                      }}
                    />
                    {item.quantity > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "-15px",
                          left: "40px",
                          right: 0,
                          backgroundColor: "hsl(0, 0%, 40%)",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "14px",
                          fontWeight: "bold",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body2">{item.quantity}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography>{item.name}</Typography>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Box>
              ))}

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  id="outlined-basic"
                  label="Discount Code"
                  variant="outlined"
                  sx={{ width: "500px" }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    height: "56px",
                  }}
                >
                  Apply
                </Button>
              </Box>

              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="h6" color="textSecondary">
                  Subtotal:
                </Typography>
                <Typography color="textSecondary">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography color="textSecondary">Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default page;
