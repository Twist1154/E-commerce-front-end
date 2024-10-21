import axios from "axios";

const BASE_URL_CART = "http://localhost:8080/store/cart";
const BASE_URL_ITEM = "http://localhost:8080/store/items";

const cartService = {
  // Create a new cart
  createCart(cart) {
    console.log("Sending request to create cart:", cart);
    return axios
      .post(`${BASE_URL_CART}/create`, cart)
      .then((response) => {
        console.log("Received response for cart creation:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating cart:", error);
        throw error;
      });
  },

  // Get carts by user ID
  getCartsByUserId(userId) {
    console.log(`Sending request to get carts for user ID: ${userId}`);
    return axios
      .get(`${BASE_URL_CART}/byUser /${userId}`)
      .then((response) => {
        console.log("Received response for fetching carts:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching carts for user ID ${userId}:`, error);
        throw error;
      });
  },

  // Update existing cart
  updateCart(cart) {
    console.log("Sending request to update cart:", cart);
    return axios
      .put(`${BASE_URL_CART}/update`, cart)
      .then((response) => {
        console.log("Received response for cart update:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
        throw error;
      });
  },

  // Delete cart by user ID
  deleteCart(userId) {
    console.log(`Sending request to delete cart for user ID: ${userId}`);
    return axios
      .delete(`${BASE_URL_CART}/delete/${userId}`)
      .then((response) => {
        console.log("Received response for cart deletion:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error deleting cart for user ID ${userId}:`, error);
        throw error;
      });
  },

  // Create a new cart item
  createCartItem(cartItem) {
    console.log("Sending request to create cart item:", cartItem);
    return axios
      .post(`${BASE_URL_ITEM}/create`, cartItem)
      .then((response) => {
        console.log("Received response for cart item creation:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating cart item:", error);
        throw error;
      });
  },

  // Get cart item by ID
  getCartItemById(cartItemId) {
    console.log(`Sending request to get cart item with ID: ${cartItemId}`);
    return axios
      .get(`${BASE_URL_ITEM}/get/${cartItemId}`)
      .then((response) => {
        console.log("Received response for fetching cart item:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching cart item with ID ${cartItemId}:`, error);
        throw error;
      });
  },

  // Update existing cart item
  updateCartItem(cartItem) {
    console.log("Sending request to update cart item:", cartItem);
    return axios
      .put(`${BASE_URL_ITEM}/update`, cartItem)
      .then((response) => {
        console.log("Received response for cart item update:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
        throw error;
      });
  },

  // Delete cart item by ID
  deleteCartItem(cartItemId) {
    console.log(`Sending request to delete cart item with ID: ${cartItemId}`);
    return axios
      .delete(`${BASE_URL_ITEM}/delete/${cartItemId}`)
      .then((response) => {
        console.log("Received response for cart item deletion:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error deleting cart item with ID ${cartItemId}:`, error);
        throw error;
      });
  },

  // Get all cart items
  getAllCartItems() {
    console.log("Sending request to get all cart items");
    return axios
      .get(`${BASE_URL_ITEM}/getAll`)
      .then((response) => {
        console.log(
          "Received response for fetching all cart items:",
          response.data,
        );
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching all cart items:", error);
        throw error;
      });
  },
};

export default cartService;
