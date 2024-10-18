// authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null, // Initialize currentUser as null
  }),
  getters: {
    getCurrentUser(state) {
      return state.currentUser; // Return the currentUser from state
    },
  },
  actions: {
    setCurrentUser(user) {
      this.currentUser = user; // Set the currentUser
    },
    clearUser() {
      this.currentUser = null; // Clear the currentUser
    },
  },
});
