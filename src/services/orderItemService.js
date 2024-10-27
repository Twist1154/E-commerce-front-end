// src/services/orderItemService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/store/order-items";

const orderItemsService = {
  // Create new order items
  createOrderItems(orderItems) {
    console.log("Creating order items:", orderItems);
    return axios
      .post(`${BASE_URL}`, orderItems)
      .then((response) => {
        console.log("Order items created successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error creating order items:", error);
        throw error;
      });
  },

  // Get an order item by ID
  getOrderItemById(id) {
    console.log(`Fetching order item with ID: ${id}`);
    return axios
      .get(`${BASE_URL}/read/${id}`)
      .then((response) => {
        console.log("Order item fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching order item with ID ${id}:`, error);
        throw error;
      });
  },

  // Update an order item by ID
  updateOrderItem(id, orderItem) {
    console.log(`Updating order item with ID: ${id}`, orderItem);
    return axios
      .put(`${BASE_URL}/update/${id}`, orderItem)
      .then((response) => {
        console.log("Order item updated successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error updating order item with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete an order item by ID
  deleteOrderItem(id) {
    console.log(`Deleting order item with ID: ${id}`);
    return axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((response) => {
        console.log("Order item deleted successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error deleting order item with ID ${id}:`, error);
        throw error;
      });
  },

  // Get all order items
  getAllOrderItems() {
    console.log("Fetching all order items");
    return axios
      .get(`${BASE_URL}/getall`)
      .then((response) => {
        console.log("All order items fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching all order items:", error);
        throw error;
      });
  },

  // Get all order items by order ID
  findAllByOrderId(orderId) {
    console.log(`Fetching items for order ID: ${orderId}`);
    return axios
      .get(`${BASE_URL}/order_id/${orderId}`)
      .then((response) => {
        console.log("Order items fetched successfully by order ID:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching items for order ID ${orderId}:`, error);
        throw error;
      });
  }
};

export default orderItemsService;
