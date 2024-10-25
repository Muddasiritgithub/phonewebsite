'use client'
import React, { useState } from 'react';
import { Box, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import NewArrivalPhones from '../../../../src/app/Components/Common/NewArrivalPhones/index';
import Bredcrums from '../../../../src/app/Components/Common/BredCrums/index';
import Accordian from '../../../../src/app/Components/Common/Accordian/index';
import yellowIphone from "../../../../public/Images/yellowIphone.png";

const productData = [
  { id: 1, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$100' },
  { id: 2, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$120' },
  { id: 3, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$130' },
  { id: 4, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$140' },
  { id: 5, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$150' },
  { id: 6, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$160' },
  { id: 7, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$170' },
  { id: 8, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$180' },
  { id: 9, imageSrc: yellowIphone, description: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$190' },
];

const index = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    // Sorting logic yahan add kar sakte ho
  };

  return (
    <Box display="flex" flexWrap="wrap" p={2}  >
      {/* Sidebar (Breadcrumbs aur Accordion) */}
      <Box flex="1" maxWidth="25%" p={1} sx={{marginTop:"75px"}}>
        <Accordian />
      </Box>

      {/* Main Content (New Arrival Phones) */}
      <Box flex="3" p={1} maxWidth="75%" sx={{marginTop:"75px"}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Selected Products: 85</Typography>
          <FormControl variant="outlined" size="small" sx={{ width: '150px' }}>
            <InputLabel>Sort by Rating</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort by Rating">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="asc">Rating: Low to High</MenuItem>
              <MenuItem value="desc">Rating: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Product Grid (Flexbox) */}
        <Box display="flex" flexWrap="wrap" gap={2} >
          {productData.map((product) => (
            <Box key={product.id} flex="1 1 calc(33.333% - 16px)" p={1} maxWidth="calc(33.333% - 16px)">
              <NewArrivalPhones 
                imageSrc={product.imageSrc} 
                description={product.description} 
                price={product.price} 
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default index;
