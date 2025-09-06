import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, deleteProduct, loading, error } = useProducts();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      if (id) {
        await deleteProduct(id);
        navigate('/');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  const isOwner = user && product.user && user._id === product.user._id;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/"
          sx={{ mb: 2 }}
        >
          Back to Products
        </Button>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.imageUrl || '/default-product.jpg'}
                  alt={product.title}
                  sx={{ height: 400, objectFit: 'contain' }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Chip
                    label={product.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h4" component="h1" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted by: {product.user?.username || 'Unknown user'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  {isOwner && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component={RouterLink}
                        to={`/products/edit/${product._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}

                  {!isOwner && user && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component="a"
                        href={`mailto:${product.user?.email || ''}`}
                      >
                        Contact Seller
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetail;