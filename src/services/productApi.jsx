// src/api/productApi.js
import axios from 'axios';
import api from './api';
const API_URL = import.meta.env.VITE_API_URL||'http://localhost:3000/api';
// const API_URL = import.meta.env.VITE_API_URL ||'http://172.28.154.68:3000/api';


export const getProducts = async ({ search = '', page = 1, limit = 10, filter = 'all' }) => {
  const products = await api.findProducts(search,page, limit, filter);
  console.log(products.data);
  return {
    data: products.data.data ,
    totalPages: products.data.totalPages,
    page: products.data.page,
    limit: products.data.limit,
  };
};

export const getProductStats = async () => {
  const response = await api.getProductStats();
  console.log(response.data.data)
  return response.data.data;
};

export const getFrontPageProducts = async ({ search = '', page = 1, limit = 10, filter = 'all' }) => {
  const products = await api.findFrontendProducts(search,page, limit, filter);
  console.log(products.data.data);
  return {
    data: products.data.data.products ,
    totalPages: products.data.data.totalPages,
    page: products.data.data.page,
    limit: products.data.data.limit,
  };
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
};

export const updateProduct = async ({ id, ...data }) => {
  await axios.patch(`${API_URL}/products/${id}`, data);
};

export const createProduct = async (data) => {
  const response = await axios.post(`${API_URL}/products`, data);
  return response.data;
};