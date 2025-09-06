import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useProducts } from '../contexts/ProductContext';

const Home: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    if (category) params.category = category;
    if (sortBy) params.sort = sortBy;
    fetchProducts(params);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Discover Eco-Friendly Products
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Home Decor">Home Decor</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="-createdAt">Newest First</MenuItem>
                <MenuItem value="createdAt">Oldest First</MenuItem>
                <MenuItem value="-price">Price: High to Low</MenuItem>
                <MenuItem value="price">Price: Low to High</MenuItem>
                <MenuItem value="title">Title: A-Z</MenuItem>
                <MenuItem value="-title">Title: Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Box
                component="button"
                onClick={handleSearch}
                sx={{
                  py: 2,
                  px: 4,
                  bgcolor: 'primary.main',
                  color: 'white',
                  border: 'none',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                Search
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loading Indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        /* Product Grid */
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/products/${product._id}`}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl || '/default-product.jpg'}
                      alt={product.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
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
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h6">
                  No products found. Try adjusting your search.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Home;