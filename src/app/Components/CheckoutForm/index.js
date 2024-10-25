'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const products = [
  { id: 1, name: 'Product 1', price: 25.00 },
  { id: 2, name: 'Product 2', price: 30.00 },
  { id: 3, name: 'Product 3', price: 15.00 },
];

const Checkout = () => {
  const [discountCode, setDiscountCode] = useState('');
  const totalAmount = products.reduce((total, product) => total + product.price, 0);
  const discount = 5; // Example fixed discount
  const finalAmount = totalAmount - discount;

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Account Information
          </Typography>
          <TextField fullWidth label="Name" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <Typography variant="h5" gutterBottom>
            Ship To
          </Typography>
          <TextField fullWidth label="Address" margin="normal" />
          <TextField fullWidth label="City" margin="normal" />
          <TextField fullWidth label="Postal Code" margin="normal" />
          <Typography variant="h5" gutterBottom>
            Shipping Method
          </Typography>
          <Typography variant="body1">Standard Shipping - Free</Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h5" gutterBottom>
            Payment Information
          </Typography>
          <TextField fullWidth label="Card Number" margin="normal" />
          <TextField fullWidth label="Name on Card" margin="normal" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Expiry Date (MM/YY)" margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Security Code" margin="normal" />
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox />}
            label="Save this card for future purchases"
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 3, width: '100%' }}
          >
            Pay Now
          </Button>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Cart Items
          </Typography>
          {products.map((product) => (
            <Card key={product.id} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ marginY: 2 }} />

          <TextField
            fullWidth
            label="Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="secondary" sx={{ marginTop: 1 }}>
            Apply
          </Button>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" align="right">
            Subtotal: ${totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="h6" align="right">
            Shipping: Free
          </Typography>
          <Typography variant="h5" align="right">
            Total: ${finalAmount.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;




// 'use client'
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Link,
//   Checkbox,
//   FormControlLabel,
//   Snackbar,
// } from "@mui/material";

// const LoginAndSignupForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleLogin = () => {
//     setIsSubmitting(true);
//     // Add login logic here
//     // Simulated API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSuccessMessage("Login successful!");
//     }, 1000);
//   };

//   const handleSignup = () => {
//     setIsSubmitting(true);
//     // Add signup logic here
//     // Simulated API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSuccessMessage("Registration successful!");
//     }, 1000);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         gap: 4,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//         maxWidth: "1200px",
//         margin: "auto",
//       }}
//     >
//       {/* Login Form */}
//       <Box
//         sx={{
//           width: { xs: "100%", md: "45%" },
//           padding: "30px",
//           boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         <Typography variant="body2" color="textSecondary" gutterBottom>
//           Please enter your email and password below to access your account
//         </Typography>

//         <TextField
//           fullWidth
//           label="Email Address"
//           variant="outlined"
//           margin="normal"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           variant="outlined"
//           margin="normal"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginTop: "10px",
//           }}
//         >
//           <Button variant="contained" color="primary" onClick={handleLogin} disabled={isSubmitting}>
//             {isSubmitting ? "Signing In..." : "Sign In"}
//           </Button>
//           <Link href="#" underline="hover" variant="body2" color="primary">
//             Lost your password?
//           </Link>
//         </Box>
//       </Box>

//       {/* Signup Form */}
//       <Box
//         sx={{
//           width: { xs: "100%", md: "45%" },
//           padding: "30px",
//           boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Register
//         </Typography>
//         <Typography variant="body2" color="textSecondary" gutterBottom>
//           Please register below to create an account
//         </Typography>

//         <TextField
//           fullWidth
//           label="First Name"
//           variant="outlined"
//           margin="normal"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <TextField
//           fullWidth
//           label="Last Name"
//           variant="outlined"
//           margin="normal"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <TextField
//           fullWidth
//           label="Email Address"
//           variant="outlined"
//           margin="normal"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           variant="outlined"
//           margin="normal"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginTop: "10px",
//           }}
//         >
//           <FormControlLabel
//             control={<Checkbox color="primary" />}
//             label="Subscribe to email marketing"
//           />
//         </Box>

//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={handleSignup}
//           disabled={isSubmitting}
//           sx={{
//             width: "100%",
//             marginBottom: "10px",
//             backgroundColor: "black",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "white",
//               color: "black",
//               border: "1px solid black",
//             },
//           }}
//         >
//           {isSubmitting ? "Creating Account..." : "Create An Account"}
//         </Button>

//         {/* Snackbar for success/error messages */}
//         <Snackbar
//           open={!!successMessage}
//           autoHideDuration={6000}
//           onClose={() => setSuccessMessage("")}
//           message={successMessage}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default LoginAndSignupForm;
