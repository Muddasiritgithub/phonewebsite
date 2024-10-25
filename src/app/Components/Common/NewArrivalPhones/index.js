import React from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import Image from 'next/image';
import Like from '../../../../../public/Images/Like.png'

const index = ({ imageSrc, description, price,handleaddtocart,product,title }) => {
  // const product = { name: 'Sample Product' };
  console.log("recieve",product)
  console.log("title",title)

  return (
    <Card
      sx={{
        width: '290px',
        backgroundColor: '#EDEDED',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Heart Icon */}
      <Box sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: '#ff4081', // Adjust color as needed
          paddingBottom:"60px"
        }}> 
        <Image src={Like}/>
        </Box>

      {/* Image and Content */}
      <CardContent
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '60%',
            height: 'auto',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '10px',
            marginTop:"50px"
          }}
        >
          <Image
            src={imageSrc}
            alt="Product Image"
            layout="responsive"
            width={238}
            height={150} // Adjust height as needed
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#333',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: '16px',
            color: '#000',
          }}
        >
          ${price}
        </Typography>

        <Button
          variant="contained"
          onClick={() => handleaddtocart(product)}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            padding: '8px 16px',
            textTransform: 'none',
            width:"200px"
          }}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default index;
