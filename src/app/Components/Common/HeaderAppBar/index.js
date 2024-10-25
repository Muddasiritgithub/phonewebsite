import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import { Search, Favorite, ShoppingCart, Person } from "@mui/icons-material";
import Link from "next/link";

const index = ({ setDrawerOpen }) => {
  console.log("setDrawerOpen:", setDrawerOpen);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#000",
          }}
        >
          cyber
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginX: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              padding: "5px 10px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <Search />
            <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography
            component="a"
            href="#home"
            sx={{
              color: "#000", // Active color
              textDecoration: "none",
              fontWeight: "500",
              listStyle: "none",
            }}
          >
            Home
          </Typography>

          <Link href="/AboutLayout" passHref>
            <Typography
              sx={{
                color: "#EDEDED", // Inactive color
                textDecoration: "none",
                fontWeight: "500",
                cursor: "pointer", // Cursor pointer for link
              }}
            >
              About
            </Typography>
          </Link>
          <Typography
            component="a"
            href="#contact"
            sx={{
              color: "#EDEDED", // Inactive color
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            component="a"
            href="#blog"
            sx={{
              color: "#EDEDED", // Inactive color
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Blog
          </Typography>
        </Box>

        {/* Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <IconButton color="black">
            <Favorite />
          </IconButton>
          <IconButton color="black" onClick={() => setDrawerOpen(true)}>
            <ShoppingCart />
          </IconButton>
          <IconButton color="black">
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default index;
