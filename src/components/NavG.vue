<template>
  <!--v-app-->
    <!-- App Bar (Header) -->
    <v-app-bar app color="teal-darken-4" fixed>
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>

      <!-- Sidebar toggle button -->
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-app-bar-title>AfricanArts&Craft</v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Action buttons -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <!-- Profile and Settings Dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToSettings">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- App Sidebar Component -->
    <AppSidebar v-model:drawer="drawer" />

    
  <!--/v-app--->
</template>

<script>
import AppSidebar from './AppSidebar.vue'; // Import AppSidebar component

export default {
  name: 'NavG',
  components: {
    AppSidebar, // Register the AppSidebar component
  },
  data() {
    return {
      drawer: false, // Drawer starts closed
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Toggle drawer open/close
    },
    goToProfile() {
      console.log('Navigating to Profile');
    },
    goToSettings() {
      console.log('Navigating to Settings');
    },
  },
};
</script>

<style>
/* Sidebar remains relative, does not overlay content */
.v-navigation-drawer {
  z-index: 1000;
  position: relative; /* Sidebar pushes content instead of overlaying */
}

/* App Bar (Header) stays fixed at the top */
.v-app-bar {
  position: fixed; /* Header stays at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100; /* Ensure it stays above other components */
}

/* Adjust padding for the main content to account for the fixed header */
.v-main {
  padding-top: 64px; /* Adjust based on app bar height */
  padding: 16px; /* Regular content padding */
  margin: 0 !important;
}

/* Ensure the v-container has no padding or margins */
.v-container {
  padding: 0 !important; /* Remove padding */
  margin: 0 !important; /* Remove margin */
}

/* Reset body margin and padding */
body {
  margin: 0 !important; /* Reset body margin */
  padding: 0 !important; /* Reset body padding */
}
</style>
