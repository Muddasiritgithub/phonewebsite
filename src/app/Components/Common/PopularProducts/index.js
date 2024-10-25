import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Index = ({ imageSrc, heading, paragraph, color }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "360px" }, // Responsive width
        height: { xs: "auto", sm: "540px" }, // Auto height on smaller screens
        backgroundColor: color,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: "100%", sm: "100%" }, // Responsive image height
          mt: 0,
        }}
      >
        <Image src={imageSrc} alt="Image" layout="fill" objectFit="cover" />
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            mb: 1,
            pt: 4,
          }}
        >
          {heading}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
          }}
        >
          {paragraph}
        </Typography>

        <Link href="/ProductsPageLayout">
          {" "}
          {/* Replace '/product-page' with your actual product page path */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              borderRadius: "5px",
              textTransform: "none",
              padding: "8px 16px",
            }}
          >
            Shop Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Index;
