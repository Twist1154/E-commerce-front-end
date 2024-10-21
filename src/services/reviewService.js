import axios from "axios";

const BASE_URL = "http://localhost:8080/store/review";

const reviewService = {
  // Create a new review
  createReview(review) {
    return axios
      .post(`${BASE_URL}/create`, review)
      .then((response) => {
        console.log("Created Review:", response.data); // Log the created review data
        return response;
      })
      .catch((error) => {
        console.error("Error creating review:", error);
        throw error;
      });
  },

  // Read review by ID
  getReviewById(id) {
    return axios
      .get(`${BASE_URL}/${id}`)
      .then((response) => {
        console.log(`Fetched Review with ID ${id}:`, response.data); // Log the review fetched by ID
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching review with ID ${id}:`, error);
        throw error;
      });
  },

  // Get all reviews
  getAllReviews() {
    return axios
      .get(`${BASE_URL}/all`)
      .then((response) => {
        console.log("Fetched All Reviews:", response.data); // Log all fetched reviews
        return response;
      })
      .catch((error) => {
        console.error("Error fetching all reviews:", error);
        throw error;
      });
  },

  // Get reviews by product ID
  getReviewsByProduct(productId) {
    return axios
      .get(`${BASE_URL}/product/${productId}`)
      .then((response) => {
        console.log(
          `Fetched Reviews for Product ID ${productId}:`,
          response.data,
        ); // Log reviews for the product
        return response;
      })
      .catch((error) => {
        console.error(
          `Error fetching reviews for product with ID ${productId}:`,
          error,
        );
        throw error;
      });
  },

  // Get reviews by user ID
  getReviewsByUser(userId) {
    return axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        console.log(`Fetched Reviews for User ID ${userId}:`, response.data); // Log reviews for the user
        return response;
      })
      .catch((error) => {
        console.error(
          `Error fetching reviews for user with ID ${userId}:`,
          error,
        );
        throw error;
      });
  },

  // Delete review by ID
  deleteReview(id) {
    return axios
      .delete(`${BASE_URL}/${id}`)
      .then((response) => {
        console.log(`Deleted Review with ID ${id}:`, response.data); // Log the deleted review response
        return response;
      })
      .catch((error) => {
        console.error(
          `Error deleting review with ID ${id}:`,
          error.response || error.message || error,
        );
        throw error;
      });
  },
};

export default reviewService;
