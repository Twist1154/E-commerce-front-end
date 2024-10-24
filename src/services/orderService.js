// src/services/orderService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/store/order";

const ordersService = {
  // Create a new order
  createOrder(order) {
    console.log("Creating order:", order);
    return axios
      .post(`${BASE_URL}/create`, order)
      .then((response) => {
        console.log("Order created successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        throw error;
      });
  },

  // Get order by ID
  getOrderById(id) {
    console.log(`Fetching order with ID: ${id}`);
    return axios
      .get(`${BASE_URL}/read/${id}`)
      .then((response) => {
        console.log("Order fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching order with ID ${id}:`, error);
        throw error;
      });
  },

  // Get order items by order ID
  findOrderItemsByOrderId(orderId) {
    console.log(`Fetching items for order ID: ${orderId}`);
    return axios
      .get(`http://localhost:8080/store/order-items/order_id/${orderId}`)
      .then((response) => {
        console.log("Order items fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching items for order ID ${orderId}:`, error);
        throw error;
      });
  },

  // Update an order
  updateOrder(id, order) {
    console.log(`Updating order with ID: ${id}`, order);
    return axios
      .put(`${BASE_URL}/update/${id}`, order)
      .then((response) => {
        console.log("Order updated successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error updating order with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete an order by ID
  deleteOrder(id) {
    console.log(`Deleting order with ID: ${id}`);
    return axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((response) => {
        console.log("Order deleted successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error deleting order with ID ${id}:`, error);
        throw error;
      });
  },

  // Get all orders
  getAllOrders() {
    console.log("Fetching all orders");
    return axios
      .get(`${BASE_URL}/getAll`)
      .then((response) => {
        console.log("All orders fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching all orders:", error);
        throw error;
      });
  },

  // Get orders by customer ID
  findOrdersByCustomerId(customerId) {
    console.log(`Finding orders with customer ID: ${customerId}`);
    return axios
      .get(`${BASE_URL}/customer/${customerId}`)
      .then((response) => {
        console.log("Orders fetched successfully for customer:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(
          `Error fetching orders with customer ID ${customerId}:`,
          error,
        );
        throw error;
      });
  },

  // Get orders within a date range
  findOrdersWithinDateRange(startDate, endDate) {
    console.log(`Finding orders between dates: ${startDate} - ${endDate}`);
    return axios
      .get(`${BASE_URL}/date-range`, { params: { startDate, endDate } })
      .then((response) => {
        console.log(
          "Orders fetched successfully within date range:",
          response.data,
        );
        return response;
      })
      .catch((error) => {
        console.error(
          `Error fetching orders within date range ${startDate} - ${endDate}:`,
          error,
        );
        throw error;
      });
  },

  // Get orders by status
  findOrdersByStatus(status) {
    console.log(`Finding orders with status: ${status}`);
    return axios
      .get(`${BASE_URL}/status/${status}`)
      .then((response) => {
        console.log("Orders fetched successfully by status:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching orders with status ${status}:`, error);
        throw error;
      });
  },
};

export default ordersService;
