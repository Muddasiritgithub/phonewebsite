'use client'
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

// Accordion data array with specific options
const accordionData = [
    { 
        id: 1, 
        title: 'Brand', 
        options: ['Samsung', 'Nokia', 'iPhone', 'Infinix', 'Xiaomi'] 
    },
    { 
        id: 2, 
        title: 'Battery Capacity', 
        options: ['5000mAh', '4000mAh', '3500mAh', '6000mAh', '3000mAh'] 
    },
    { 
        id: 3, 
        title: 'Storage', 
        options: ['16GB', '32GB', '64GB', '128GB', '256GB'] 
    },
    { 
        id: 4, 
        title: 'Color', 
        options: ['Black', 'White', 'Blue', 'Red', 'Green'] 
    },
    { 
        id: 5, 
        title: 'Camera', 
        options: ['12MP', '48MP', '108MP', '64MP', '16MP'] 
    },
    { 
        id: 6, 
        title: 'Processor', 
        options: ['Snapdragon 888', 'Exynos 2100', 'A14 Bionic', 'Kirin 9000', 'MediaTek Dimensity 1200'] 
    },
    { 
        id: 7, 
        title: 'RAM', 
        options: ['2GB', '4GB', '6GB', '8GB', '12GB'] 
    }
];

const Index = () => {
    // State to track selected radio buttons for each accordion
    const [selectedValues, setSelectedValues] = useState({});

    const handleRadioChange = (accordionId, event) => {
        setSelectedValues((prev) => ({
            ...prev,
            [accordionId]: event.target.value,
        }));
    };

    const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{ width: '100%' }}>
            {accordionData.map((accordion) => (
                <Accordion key={accordion.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${accordion.id}-content`}
                        id={`panel${accordion.id}-header`}
                    >
                        {accordion.title}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box position="relative" width="100%" sx={{marginBottom:"20px"}}>
                            <InputBase
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '20px',
                                    padding: '5px 5px 5px 40px'
                                 }}
                            />
                            <SearchIcon style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)', // Center the icon vertically
                                color: '#888', // Optional: color for the icon
                            }} />
                        </Box>
                        <RadioGroup value={selectedValues[accordion.id] || ''} onChange={(event) => handleRadioChange(accordion.id, event)}>
                            {accordion.options.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={option}
                                    control={<Radio />}
                                    label={option} // Use the actual option name
                                />
                            ))}
                        </RadioGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default Index;
