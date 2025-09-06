import React, { createContext, useState, useContext } from 'react';
import { productService } from '../services/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  user: string;
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: any) => Promise<void>;
  getProduct: (id: string) => Promise<Product>;
  createProduct: (productData: any) => Promise<void>;
  updateProduct: (id: string, productData: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await productService.getAllProducts(params);
      setProducts(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: string): Promise<Product> => {
    try {
      setLoading(true);
      setError(null);
      const res = await productService.getProduct(id);
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: any) => {
    try {
      setLoading(true);
      setError(null);
      await productService.createProduct(productData);
      await fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      setLoading(true);
      setError(null);
      await productService.updateProduct(id, productData);
      await fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await productService.deleteProduct(id);
      await fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('image', file);
      const res = await productService.uploadImage(formData);
      return res.data.data.filePath;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};