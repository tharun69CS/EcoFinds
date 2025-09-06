import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              EcoFinds
            </Typography>
            <Typography variant="body2">
              Your marketplace for sustainable and eco-friendly products.
              Buy, sell, and trade pre-loved items to reduce waste and
              promote environmental sustainability.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link href="/products/create" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Sell an Item
            </Link>
            <Link href="/profile" color="inherit" sx={{ display: 'block', mb: 1 }}>
              My Account
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@ecofinds.com
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} EcoFinds. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;