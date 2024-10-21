// src/services/categoriesService.js
import axiosInstance from '../axiosConfig';

const BASE_URL = 'http://localhost:8080/store/categories';

export const getAllCategories = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/getAll`); // Fetch categories
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`${BASE_URL}/get/${id}`); // Fetch category by ID
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axiosInstance.post(`${BASE_URL}/`, category); // Create new category
  return response.data;
};

export const updateCategory = async (category) => {
  const response = await axiosInstance.put(`${BASE_URL}/${category.id}`, category); // Update category
  return response.data;
};
