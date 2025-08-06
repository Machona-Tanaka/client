// src/api/reviewApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// const API_URL = import.meta.env.VITE_API_URL ||'http://172.28.154.68:3000/api';


// 1. Get Reviews for a Product
export const getProductReviews = async (productId, { page = 1, limit = 10 }) => {
  const response = await axios.get(`${API_URL}/products/${productId}/reviews`, {
    params: { page, limit },
  });

  return {
    data: response.data.reviews || [],
    totalPages: Math.ceil(response.data.total / limit),
  };
};

// 2. Delete a Review
export const deleteReview = async (reviewId) => {
  await axios.delete(`${API_URL}/reviews/${reviewId}`);
};

// 3. Toggle Review Verification Status
export const toggleReviewVerification = async ({ id, verified }) => {
  await axios.patch(`${API_URL}/reviews/${id}`, { verified_purchase: verified });
};
