// src/api/podcastApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ||'http://localhost:3000/api';  
// const API_URL = import.meta.env.VITE_API_URL ||'http://172.28.154.68:3000/api';
export const getPodcasts = async ({ search = '', page = 1, limit = 10 }) => {
  const response = await axios.get(
    `${API_URL}/podcasts?search=${search}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getPodcastStats = async () => {
  const response = await axios.get(`${API_URL}/podcasts/stats`);
  return response.data;
};

export const deletePodcast = async (id) => {
  await axios.delete(`${API_URL}/podcasts/${id}`);
};

export const updatePodcast = async ({ id, ...data }) => {
  await axios.patch(`${API_URL}/podcasts/${id}`, data);
};