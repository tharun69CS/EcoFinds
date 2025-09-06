import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <Box sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route 
                    path="/products/create" 
                    element={
                      <PrivateRoute>
                        <CreateProduct />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/products/edit/:id" 
                    element={
                      <PrivateRoute>
                        <EditProduct />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    } 
                  />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
