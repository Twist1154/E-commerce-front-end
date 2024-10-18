<template>
  <!--v-app-->
  <!-- App Bar (Header) -->
  <v-app-bar app color="teal-darken-4" fixed>
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <!-- Sidebar toggle button -->
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-app-bar-title>African Arts & Craft</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Search Button -->
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- Wishlist Button - Triggers Wishlist Modal -->
    <v-btn icon @click="toggleWishlist">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <!-- Cart Button -->
    <v-btn icon @click="goToCart">
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


  <!-- Wishlist Modal -->
  <v-dialog v-model="wishlistDialog" max-width="600">
    <v-card>
      <v-card-title>
        Wishlist
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleWishlist">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="wishlist-dialog-container">
        <!-- WishList component integrated with scrollable content -->
        <div class="wishlist-items">
          <WishList :wishlistItems="wishlistItems" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- App Sidebar Component -->
  <AppSidebar v-model:drawer="drawer" />

  <!-- Main Content where route views are rendered -->
  <v-main>
      
  <!-- Breadcrumbs Component (Below App Bar, Above Content) -->
  <v-container class="breadcrumbs-container">
    <CrumbLink />
  </v-container>
  
    <v-container>
      <router-view></router-view>
      <!-- Routes are displayed here -->
    </v-container>
  </v-main>
</template>

<script>
import AppSidebar from "./AppSidebar.vue"; // Import AppSidebar component
import WishList from "./WishList.vue"; // Import WishList component
import wishListService from "@/services/wishListService";
import CrumbLink from "./CrumbLink.vue";

export default {
  name: "NavG",
  components: {
    AppSidebar, // Register the AppSidebar component
    WishList, // Register WishList component
    CrumbLink,
  },
  data() {
    return {
      drawer: false, // Drawer starts closed
      wishlistDialog: false, // Wishlist modal starts closed
      wishlistItems: [], // Wishlist items
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Toggle drawer open/close
    },
    toggleWishlist() {
      this.wishlistDialog = !this.wishlistDialog; // Toggle Wishlist modal
      if (this.wishlistDialog) {
        this.fetchWishlistItems();
      }
    },
    async fetchWishlistItems() {
      try {
        this.wishlistItems = await wishListService.getAllWishlists();
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    },
    goToProfile() {
      console.log("Navigating to Profile");
    },
    goToSettings() {
      console.log("Navigating to Settings");
    },
    goToCart() {
      this.$router.push({ path: "/cart" }); // This navigates to the cart page
    },
  },
};
</script>

<style scoped>
/* Sidebar remains relative, does not overlay content */
.v-navigation-drawer {
  z-index: 1000;
  position: relative;
}

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
  padding-top: 120px;
  /* Adjust based on app bar + breadcrumbs height */
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

/* Wishlist Dialog - Ensure scrollable content */
.wishlist-dialog-container {
  max-height: 400px;
  /* Adjust height as needed */
  overflow-y: auto;
  /* Enable vertical scrolling */
}

/* Ensure the cards inside the dialog maintain full width */
.wishlist-items .v-card {
  width: 100%;
}
</style>
