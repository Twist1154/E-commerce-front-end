<template>
  <v-app-bar app color="teal-darken-4" image="https://example.com/your-arts-and-crafts-image.jpg"> <!-- Change the image URL to an actual arts and crafts image -->
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AfricanArts&Craft</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-cart</v-icon> <!-- Added cart icon here -->
    </v-btn>

    <!-- Dropdown button for profile and settings -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="goToProfile"> <!-- Added method for click event -->
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToSettings"> <!-- Added method for click event -->
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { VAppBar, VImg, VBtn, VIcon, VSpacer, VMenu, VList, VListItem, VListItemTitle } from 'vuetify/components';

export default {
  name: 'NavG',
  components: {
    VAppBar,
    VImg,
    VBtn,
    VIcon,
    VSpacer,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
  },
  methods: {
    // Method to handle Profile click
    goToProfile() {
      // Navigate to profile page (you can replace this with actual navigation logic)
      console.log('Navigating to Profile');
    },
    // Method to handle Settings click
    goToSettings() {
      // Navigate to settings page (you can replace this with actual navigation logic)
      console.log('Navigating to Settings');
    }
  }
};
</script>

<style scoped>
/* Add any styles here if needed */
</style>
