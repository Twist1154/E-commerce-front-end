import axios from "axios";

const BASE_URL = "http://localhost:8080/store/payments";

const paymentService = {
  // Create a new payment
  createPayment(payment) {
    console.log("Creating payment:", payment);
    return axios
      .post(`${BASE_URL}/create`, payment)
      .then((response) => {
        console.log("Payment created successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
        throw error;
      });
  },

  // Read payment by ID
  getPaymentById(id) {
    console.log(`Fetching payment with ID: ${id}`);
    return axios
      .get(`${BASE_URL}/read/${id}`)
      .then((response) => {
        console.log("Payment fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching payment with ID ${id}:`, error);
        throw error;
      });
  },

  // Update existing payment
  updatePayment(payment) {
    console.log("Updating payment:", payment);
    return axios
      .put(`${BASE_URL}/update`, payment)
      .then((response) => {
        console.log("Payment updated successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error updating payment:", error);
        throw error;
      });
  },

  // Delete payment by ID
  deletePayment(id) {
    console.log(`Deleting payment with ID: ${id}`);
    return axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((response) => {
        console.log("Payment deleted successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error deleting payment with ID ${id}:`, error);
        throw error;
      });
  },

  // Get all payments
  getAllPayments() {
    console.log("Fetching all payments");
    return axios
      .get(`${BASE_URL}/all`)
      .then((response) => {
        console.log("All payments fetched successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching all payments:", error);
        throw error;
      });
  },

  // Find payments by status
  findPaymentsByStatus(status) {
    console.log(`Finding payments with status: ${status}`);
    return axios
      .get(`${BASE_URL}/status/${status}`)
      .then((response) => {
        console.log("Payments found successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching payments with status ${status}:`, error);
        throw error;
      });
  },

  // Find payment by user ID
  findPaymentByUserId(userId) {
    console.log(`Finding payment with user ID: ${userId}`);
    return axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        console.log("Payment found successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching payment with user ID ${userId}:`, error);
        throw error;
      });
  },
};

export default paymentService;