// CartService.js

import axios from 'axios';

const CartService = axios.create({
  baseURL: 'http://localhost:8080/carts', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cart Endpoints

export const createCart = (cart) => {
  return CartService.post('/create', cart);
};

export const getCartsByUserId = (userId) => {
  return CartService.get(`/${userId}`);
};

export const updateCart = (cart) => {
  return CartService.put('/', cart);
};

export const deleteCart = (userId) => {
  return CartService.delete(`/${userId}`);
};

export const getAllCarts = () => {
  return CartService.get('/');
};

// Cart Items Endpoints

export const createCartItem = (cartItem) => {
  return CartService.post('/items', cartItem);
};

export const getCartItemById = (cartItemId) => {
  return CartService.get(`/items/${cartItemId}`);
};

export const updateCartItem = (cartItem) => {
  return CartService.put('/items', cartItem);
};

export const deleteCartItem = (cartItemId) => {
  return CartService.delete(`/items/${cartItemId}`);
};

export const getAllCartItems = () => {
  return CartService.get('/items');
};

export const getCartItemsByCartId = (cartId) => {
  return CartService.get(`/items/cart/${cartId}`);
};

export const getCartItemsByProductId = (productId) => {
  return CartService.get(`/items/product/${productId}`);
};

export default {
  createCart,
  getCartsByUserId,
  updateCart,
  deleteCart,
  getAllCarts,
  createCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemsByCartId,
  getCartItemsByProductId,
};
