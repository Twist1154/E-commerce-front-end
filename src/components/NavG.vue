<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="teal-darken-4">
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
    <AppSidebar :drawer="drawer" @update:drawer="drawer = $event" />

    <v-main>
      <v-container fluid>
        <!-- Main content goes here -->
      </v-container>
    </v-main>
  </v-app>
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
/* Ensuring no additional spacing in NavG */
.v-navigation-drawer {
  z-index: 1000; /* Ensure drawer overlays content */
}

.v-app-bar {
  z-index: 1001; /* App bar stays above drawer */
}

/* Make sure no padding/margin is applied here */
.v-main {
  padding: 0 !important; /* Remove any padding */
  margin: 0 !important; /* Remove any margin */
  z-index: 0; /* Main content has the lowest z-index */
}
</style>
