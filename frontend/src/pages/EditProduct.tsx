import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useProducts } from '../contexts/ProductContext';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct, uploadImage, loading, error } = useProducts();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await getProductById(id);
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price.toString());
          setCategory(product.category);
          setCurrentImageUrl(product.imageUrl || '');
          setIsLoading(false);
        } catch (err) {
          setFormError('Failed to load product data');
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 1MB)
      if (selectedFile.size > 1024 * 1024) {
        setFormError('Image size must be less than 1MB');
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(selectedFile.type)) {
        setFormError('Only JPEG, JPG, PNG, and GIF images are allowed');
        return;
      }
      
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setFormError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !description || !price || !category) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setFormError('Price must be a positive number');
      return;
    }
    
    setFormError('');
    
    try {
      let imageUrl = currentImageUrl;
      
      if (image) {
        const uploadResult = await uploadImage(image);
        imageUrl = uploadResult.imageUrl;
      }
      
      const productData = {
        title,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
      };
      
      if (id) {
        await updateProduct(id, productData);
        navigate(`/products/${id}`);
      }
    } catch (err) {
      // Error is handled in the ProductContext
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Edit Listing
          </Typography>
          
          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError || error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price ($)"
                  name="price"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="Furniture">Furniture</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Home Decor">Home Decor</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Change Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>
              
              {(imagePreview || currentImageUrl) && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Image Preview:
                    </Typography>
                    <Box
                      component="img"
                      src={imagePreview || currentImageUrl}
                      alt="Preview"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Update Listing'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditProduct;