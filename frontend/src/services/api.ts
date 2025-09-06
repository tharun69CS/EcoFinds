import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  login: (userData: { email: string; password: string }) =>
    api.post('/auth/login', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const productService = {
  getAllProducts: (params?: any) => api.get('/products', { params }),
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: (productData: any) => api.post('/products', productData),
  updateProduct: (id: string, productData: any) =>
    api.put(`/products/${id}`, productData),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  uploadImage: (formData: FormData) => {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;