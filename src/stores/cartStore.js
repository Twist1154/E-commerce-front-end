import { defineStore } from 'pinia'; // Make sure to import defineStore

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], // Load from localStorage if available
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
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    clearCart() {
      this.cartItems = [];
      // Clear from localStorage
      localStorage.removeItem('cartItems');
    },
  },
});
