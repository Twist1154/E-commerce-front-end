// src/services/addressService.js
import axiosInstance from '../axiosConfig';

const BASE_URL = '/address';


// Function to create a new Address
export const createAddress = async (address) => {
  console.log('Sending address for creation:', address);
  const response = await axiosInstance.post(`${BASE_URL}`, address); // Create address
  console.log('Created address:', response.data);
  return response.data;
};

// Function to get an Address by ID
export const getAddressById = async (id) => {
  console.log('Fetching address by ID:', id);
  const response = await axiosInstance.get(`${BASE_URL}/${id}`); // Fetch address by ID
  console.log('Fetched address:', response.data);
  return response.data;
};

// Function to update an Address
export const updateAddress = async (address) => {
  console.log('Sending updated address:', address);
  const response = await axiosInstance.put(`${BASE_URL}/update/`, address); // Update address
  console.log('Updated address:', response.data);
  return response.data;
};

// Function to get all Addresses
export const getAllAddresses = async () => {
  console.log('Fetching all addresses');
  const response = await axiosInstance.get(`${BASE_URL}/all`); // Fetch all addresses
  console.log('Fetched addresses:', response.data);
  return response.data;
};

// Function to delete an Address by ID
export const deleteAddress = async (id) => {
  console.log('Deleting address by ID:', id);
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`); // Delete address by ID
  console.log('Deleted address response:', response.status);
  return response.status;
};

// Function to find Addresses by user ID
export const findAddressByUserId = async (userId) => {
  console.log('Fetching addresses by user ID:', userId);
  const response = await axiosInstance.get(`${BASE_URL}/user`, { params: { userId } }); // Find by user ID
  console.log('Fetched addresses by user ID:', response.data);
  return response.data;
};

// Function to find Addresses by title
export const findAddressByTitle = async (title) => {
  console.log('Fetching addresses by title:', title);
  const response = await axiosInstance.get(`${BASE_URL}/title/${title}`); // Find by title
  console.log('Fetched addresses by title:', response.data);
  return response.data;
};

// Function to find Addresses by addressLine1
export const findAddressByAddressLine1 = async (addressLine1) => {
  console.log('Fetching addresses by address line 1:', addressLine1);
  const response = await axiosInstance.get(`${BASE_URL}/address-line1/${addressLine1}`); // Find by address line 1
  console.log('Fetched addresses by address line 1:', response.data);
  return response.data;
};

// Function to find Addresses by addressLine2
export const findAddressByAddressLine2 = async (addressLine2) => {
  console.log('Fetching addresses by address line 2:', addressLine2);
  const response = await axiosInstance.get(`${BASE_URL}/address-line2/${addressLine2}`); // Find by address line 2
  console.log('Fetched addresses by address line 2:', response.data);
  return response.data;
};

// Function to find Addresses by country
export const findAddressByCountry = async (country) => {
  console.log('Fetching addresses by country:', country);
  const response = await axiosInstance.get(`${BASE_URL}/country/${country}`); // Find by country
  console.log('Fetched addresses by country:', response.data);
  return response.data;
};

// Function to find Addresses by city
export const findAddressByCity = async (city) => {
  console.log('Fetching addresses by city:', city);
  const response = await axiosInstance.get(`${BASE_URL}/city/${city}`); // Find by city
  console.log('Fetched addresses by city:', response.data);
  return response.data;
};
