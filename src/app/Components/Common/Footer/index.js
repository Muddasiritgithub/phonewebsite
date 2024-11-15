import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'; // Social media icons

const index = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',  // Black background
        color: '#fff',  // White text color
        padding: '40px 20px',  // Padding for top and bottom
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',  // Space between the columns
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',  // Center the footer content
        }}
      >
        {/* First Section: Heading, Paragraph, and Social Media */}
        <Box sx={{ flex: '1 1 300px', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Blendofy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 ,width:"80%"}}>
          We are a residential interior design firm located in Portland. Our boutique-studio offers more than          </Typography>
          <Box sx={{pt:10}}>
            <IconButton href="#" sx={{ color: '#fff', mr: 1 }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff', mr: 1 }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <LinkedIn />
            </IconButton>
            
          </Box>
        </Box>

        {/* Second Section: Heading and Links */}
        <Box sx={{ flex: '1 1 200px', mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
          Services
          </Typography>
          <Box>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Bonus program
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Gift cards
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Credit and payment
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Service contracts
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Non-cash account
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Payment
            </Link>
          </Box>
        </Box>

        {/* Third Section: Another Heading and Links */}
        <Box sx={{ flex: '1 1 200px', mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
          Assistance to the buyer
          </Typography>
          <Box>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Find an order
                        </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Terms of delivery
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Exchange and return of goods
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Guarantee
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Frequently asked questions
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#fff', mb: 1 }}>
            Terms of use of the site
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
