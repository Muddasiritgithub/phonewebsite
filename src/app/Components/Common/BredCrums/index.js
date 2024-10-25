'use client'; // Indicate this is a client component

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BasicBreadcrumbs() {
  const handleClick = (event) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" separator=">">
        <Link underline="hover" color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          Catalog
        </Link>
        <Typography sx={{ color: 'text.primary' }}>SmartPhones</Typography>
      </Breadcrumbs>
    </div>
  );
}
