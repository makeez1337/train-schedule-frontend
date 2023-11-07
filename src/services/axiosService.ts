import axios from 'axios';

// HARDCODED BASE URL
export const axiosService = axios.create({
  baseURL: 'https://train-schedule-665e01d19c97.herokuapp.com',
});

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('access_token');
  return config;
});
