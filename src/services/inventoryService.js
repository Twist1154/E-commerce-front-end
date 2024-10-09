import axios from 'axios';

// Base URL for InventoryController API
const BASE_URL = 'http://localhost:8080/store/inventory';

const inventoryService = {
  // Create a new inventory item
  createInventoryItem(inventoryItem) {
    return axios.post(`${BASE_URL}/create`, inventoryItem)
      .then(response => {
        console.log('Inventory item created successfully:', response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error('Error creating inventory item:', error.response?.data || error.message); // Log error
        throw error;
      });
  },

  // Read inventory item by ID
  getInventoryItemById(id) {
    return axios.get(`${BASE_URL}/read/${id}`)
      .then(response => {
        console.log(`Fetched inventory item with ID ${id}:`, response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error(`Error fetching inventory item with ID ${id}:`, error.response?.data || error.message); // Log error
        throw error;
      });
  },

  // Update existing inventory item
  updateInventoryItem(inventoryItem) {
    return axios.put(`${BASE_URL}/update`, inventoryItem)
      .then(response => {
        console.log('Inventory item updated successfully:', response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error('Error updating inventory item:', error.response?.data || error.message); // Log error
        throw error;
      });
  },

  // Delete inventory item by ID
  deleteInventoryItem(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`)
      .then(response => {
        console.log(`Inventory item with ID ${id} deleted successfully:`, response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error(`Error deleting inventory item with ID ${id}:`, error.response?.data || error.message); // Log error
        throw error;
      });
  },

  // Get all inventory items
  getAllInventoryItems() {
    return axios.get(`${BASE_URL}/all`)
      .then(response => {
        console.log('Fetched all inventory items:', response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error('Error fetching all inventory items:', error.response?.data || error.message); // Log error
        throw error;
      });
  },

  // Find inventory items by product ID
  getInventoryItemsByProductId(productId) {
    return axios.get(`${BASE_URL}/product/${productId}`)
      .then(response => {
        console.log(`Fetched inventory items for product ID ${productId}:`, response.data); // Log success
        return response.data; // Return only the data
      })
      .catch(error => {
        console.error(`Error fetching inventory items with product ID ${productId}:`, error.response?.data || error.message); // Log error
        throw error;
      });
  },
};

export default inventoryService;
