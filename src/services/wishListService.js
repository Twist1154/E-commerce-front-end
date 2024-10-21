import axios from "axios";

// Base URL for WishlistController API
const BASE_URL = "http://localhost:8080/store/wishlist";

const wishlistService = {
  // Create a new wishlist
  createWishlist(wishlist) {
    console.log("Wishlist being sent to backend:", wishlist);
    return axios
      .post(`${BASE_URL}/create`, wishlist)
      .then((response) => {
        console.log("Created wishlist response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating wishlist:", error);
        throw error;
      });
  },

  // Get wishlist by ID
  getWishlistById(id) {
    console.log(`Fetching wishlist with ID: ${id}`);
    return axios
      .get(`${BASE_URL}/${id}`)
      .then((response) => {
        console.log("Retrieved wishlist:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching wishlist with ID ${id}:`, error);
        throw error;
      });
  },

  // Update existing wishlist
  updateWishlist(id, wishlist) {
    console.log(`Updating wishlist with ID: ${id}`);
    console.log("Updated wishlist data being sent:", wishlist);
    return axios
      .put(`${BASE_URL}/update/${id}`, wishlist)
      .then((response) => {
        console.log("Updated wishlist response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error updating wishlist with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete wishlist by ID
  deleteWishlist(id) {
    console.log(`Deleting wishlist with ID: ${id}`);
    return axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((response) => {
        console.log(`Deleted wishlist with ID: ${id}`);
        return response;
      })
      .catch((error) => {
        console.error(
          `Error deleting wishlist with ID ${id}:`,
          error.response || error.message || error,
        );
        throw error;
      });
  },

  // Get all wishlists
  getAllWishlists() {
    console.log("Fetching all wishlists");
    return axios
      .get(`${BASE_URL}/getAll`)
      .then((response) => {
        console.log("Retrieved all wishlists:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching all wishlists:", error);
        throw error;
      });
  },

  // Get wishlists by user ID
  getWishlistsByUserId(userId) {
    console.log(`Fetching wishlists for user ID: ${userId}`);
    return axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        console.log(
          `Retrieved wishlists for user ID ${userId}:`,
          response.data,
        );
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching wishlists for user ID ${userId}:`, error);
        throw error;
      });
  },
};

export default wishlistService;
