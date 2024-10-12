<template>
    <v-card
      class="overflow-y-auto"
      max-height="400"
      v-scroll.self="onScroll"
    >
      <v-row>
        <!-- Loop through wishlist items and display each as a card -->
        <v-col v-for="(item, index) in wishlistItems" :key="index" cols="12">
          <v-card color="#1F7087" class="pa-3">
            <v-row>
              <!-- Product Image on the Left with Padding -->
              <v-col cols="3" class="d-flex align-center justify-center pa-2">
                <v-avatar class="ma-3" rounded="0" size="125">
                  <v-img :src="item.product.imagePath"></v-img>
                </v-avatar>
              </v-col>
  
              <!-- Product and User Info on the Right with Padding -->
              <v-col cols="9" class="pa-2">
                <!-- Product Name -->
                <v-card-title class="text-h5">
                  {{ item.product.name }}
                </v-card-title>
  
                <!-- Price and Username -->
                <v-card-subtitle>
                  {{ item.product.price }} | Added by: {{ item.user.username }}
                </v-card-subtitle>
  
                <!-- Product Created Date -->
                <v-card-subtitle>
                  Added on: {{ formatDate(item.createdAt) }}
                </v-card-subtitle>
  
                <!-- Action Button -->
                <v-card-actions>
                  <v-btn class="ms-2" size="small" text="VIEW PRODUCT" variant="outlined">
                    View Product
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
  
      <v-banner
        class="justify-center text-h5 font-weight-light"
        sticky
      >
        Scroll Me - Method invoked
        <span
          class="font-weight-bold"
          v-text="scrollInvoked"
        ></span>
        times
      </v-banner>
    </v-card>
  </template>
  
  <script>
  import wishListService from "@/services/wishListService";
  
  export default {
    name: 'WishList',
    data() {
      return {
        wishlistItems: [], // Local state to store fetched wishlist items
        scrollInvoked: 0,  // Track scroll events
      };
    },
    methods: {
      // Utility method to format the date
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      onScroll() {
        this.scrollInvoked++; // Increment scroll count on scroll
      }
    },
    async created() {
      // Fetch wishlist items from the server
      try {
        this.wishlistItems = await wishListService.getAllWishlists();
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  