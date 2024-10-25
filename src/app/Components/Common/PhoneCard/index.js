import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';

const index = ({ imageSrc, heading,setActiveCategory }) => {
  const handleOnClick=()=>{
    setActiveCategory(heading);   
  }
  
  return (
    <Card
      sx={{
        width: '140px',
        height: '128px',
        backgroundColor: '#EDEDED',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor:"pointer"
      }}
      onClick={handleOnClick}
     >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            width: '60px',
            height: '60px',
            marginBottom: '8px',
            borderRadius: '50%',
            overflow: 'hidden',  // To ensure circular shape
          }}
        >
          <Image
            src={imageSrc}
            alt={heading}
            layout="fixed"  // Changed to fixed for specified dimensions
            width={60}
            height={60}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {heading}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default index;
