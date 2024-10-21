// src/stores/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cartItems.find(item => item.productId === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ 
          productId: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1,
          imagePath: product.imagePath
        });
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
