<template>
    <!-- App Bar (Header) -->
    <v-app-bar app color="teal-darken-4" fixed>
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>
  
      <!-- Navbar Title -->
      <v-app-bar-title>African Arts & Craft</v-app-bar-title>
  
      <v-spacer></v-spacer>
  
      <!-- Profile and Settings Dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="navigateTo('/updateProducts')">
            <v-list-item-title>Update Products</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/orders')">
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/AddProduct')">
            <v-list-item-title>Add Product</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/CategorySearch')">
            <v-list-item-title>Category Search</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/PriceRange')">
            <v-list-item-title>Price Range</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  
    <!-- Main Content where route views are rendered -->
    <v-main>
      <!-- Breadcrumbs Component (Below App Bar, Above Content) -->
      <v-container class="breadcrumbs-container">
        <CrumbLink />
      </v-container>
      
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </template>
  
  <script>
  import CrumbLink from "./CrumbLink.vue";
  
  export default {
    name: "NavG",
    components: {
      CrumbLink,
    },
    methods: {
      navigateTo(route) {
        this.$router.push({ path: route });
      },
    },
  };
  </script>
  
  <style scoped>
  /* App Bar (Header) stays fixed at the top */
  .v-app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1100;
  }
  
  /* Adjust padding for the main content to account for the fixed header and breadcrumbs */
  .v-main {
    padding-top: 120px; /* Adjust based on app bar + breadcrumbs height */
    padding: 16px;
  }
  
  /* Ensure the v-container has no padding or margins */
  .v-container {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
  </style>
  