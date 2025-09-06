import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading, error, fetchUserProducts } = useProducts();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserProducts();
    }
  }, [user, fetchUserProducts]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          You need to be logged in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  mb: 2,
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Box>
              <Typography variant="h5" gutterBottom>
                {user.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member since:
              </Typography>
              <Typography variant="body1">
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to="/products/create"
              >
                Create New Listing
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* User Listings Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
              >
                <Tab label="My Listings" />
                <Tab label="Account Settings" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {error && <Alert severity="error">{error}</Alert>}

              {productsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : products.length > 0 ? (
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: '0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 3,
                          },
                        }}
                      >
                        <CardActionArea
                          component={RouterLink}
                          to={`/products/${product._id}`}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={product.imageUrl || '/default-product.jpg'}
                            alt={product.title}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                              {product.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {product.description}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2,
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                fontWeight="bold"
                              >
                                ${product.price.toFixed(2)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: 'inline-block',
                                  bgcolor: 'background.paper',
                                  px: 1,
                                  borderRadius: 1,
                                  border: 1,
                                  borderColor: 'divider',
                                }}
                              >
                                {product.category}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    You haven't created any listings yet.
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/products/create"
                    sx={{ mt: 2 }}
                  >
                    Create Your First Listing
                  </Button>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Account settings functionality will be available in a future update.
                </Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;