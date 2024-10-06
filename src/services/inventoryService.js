import axios from 'axios';

// Base URL for InventoryController API
const BASE_URL = 'http://localhost:8080/api/inventory';

const inventoryService = {
  // Create a new inventory item
  createInventoryItem(inventoryItem) {
    return axios.post(`${BASE_URL}/create`, inventoryItem)
      .then(response => response)
      .catch(error => {
        console.error('Error creating inventory item:', error);
        throw error;
      });
  },

  // Read inventory item by ID
  getInventoryItemById(id) {
    return axios.get(`${BASE_URL}/read/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching inventory item with ID ${id}:`, error);
        throw error;
      });
  },

  // Update existing inventory item
  updateInventoryItem(inventoryItem) {
    return axios.put(`${BASE_URL}/update`, inventoryItem)
      .then(response => response)
      .catch(error => {
        console.error('Error updating inventory item:', error);
        throw error;
      });
  },

  // Delete inventory item by ID
  deleteInventoryItem(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error deleting inventory item with ID ${id}:`, error.response || error.message || error);
        throw error;
      });
  },

  // Get all inventory items
  getAllInventoryItems() {
    return axios.get(`${BASE_URL}/all`)
      .then(response => response)
      .catch(error => {
        console.error('Error fetching all inventory items:', error);
        throw error;
      });
  },

  // Find inventory items by product ID
  getInventoryItemsByProductId(productId) {
    return axios.get(`${BASE_URL}/product/${productId}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching inventory items with product ID ${productId}:`, error);
        throw error;
      });
  },
};

export default inventoryService;
