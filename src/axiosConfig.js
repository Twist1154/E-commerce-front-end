// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/store', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
