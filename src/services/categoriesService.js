// src/services/categoriesService.js
import axiosInstance from '../axiosConfig';

export const getAllCategories = async () => {
  const response = await axiosInstance.get('/categories/getAll'); // Fetch categories
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/get/${id}`); // Fetch category by ID
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axiosInstance.post('/', category); // Create new category
  return response.data;
};

export const updateCategory = async (category) => {
  const response = await axiosInstance.put(`/${category.id}`, category); // Update category
  return response.data;
};
