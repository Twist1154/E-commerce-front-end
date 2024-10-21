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
    isAuthenticated(state) {
      return state.currentUser !== null; // Check if the user is authenticated
    },
  },
  actions: {
    setCurrentUser(user) {
      this.currentUser = user; // Set the currentUser
      console.log('User set:', user);
    },
    clearUser() {
      this.currentUser = null; // Clear the currentUser
    },
    // This action can be used globally to ensure the user is signed in
    ensureUserIsSignedIn() {
      if (!this.isAuthenticated) {
        alert('Please sign in to continue');
        return false;
      }
      return true;
    },
  },
});
