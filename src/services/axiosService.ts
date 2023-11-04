import axios from 'axios';

import config from '../config';

export const axiosService = axios.create({ baseURL: config.BASE_URL });

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('access_token');
  return config;
});
