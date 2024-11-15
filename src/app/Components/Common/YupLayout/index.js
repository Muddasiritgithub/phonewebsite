import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';

const Index = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth cannot be in the future'),
    }),
    onSubmit: (values,{ resetForm }) => {
      alert('Jack: ' + JSON.stringify(values, null, 2));
      resetForm();  // Reset the form fields after submit
    },
  });

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>

        {/* Email Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        {/* Confirm Password Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Box>

        {/* Date of Birth Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </Box>

        {/* Submit Button */}
        <Box>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Index;
