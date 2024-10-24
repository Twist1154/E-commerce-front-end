<template>
  <div>
    <!-- Navigation Header -->
    <NavG />

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="localDrawer"
      temporary
      width="300"
      style="background-color: lightgrey; position: fixed; top: 64px; left: 0; height: calc(100% - 64px);"
    >
      <v-list>
        <!-- User Details Section at the top -->
        <v-list-item>
          <v-list-item-avatar>
            <!-- Updated to match the style from review -->
            <v-avatar :size="80">
              <img :src="userAvatar" alt="User Avatar" class="avatar-image" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ authStore.getCurrentUser?.username || 'Guest' }}</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.getCurrentUser?.email || 'No email provided' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Options -->
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" @click="goHome"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Profile"></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Settings"></v-list-item>

        <v-spacer></v-spacer> <!-- Pushes logout/login button to the bottom -->

        <!-- Conditional Button for Logout or Login -->
        <v-btn block @click="handleAuthAction">
          {{ authStore.getCurrentUser ? 'Logout' : 'Log In' }}
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'; // Assuming Pinia is used for user state
import NavG from '@/components/NavigationBar.vue'; // Importing the NavG component

export default {
  name: 'AppSidebar',
  components: { NavG },
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localDrawer: this.drawer, // Create a local copy of the drawer prop
      authStore: useAuthStore(), // Access Pinia authStore
    };
  },
  watch: {
    drawer(newVal) {
      this.localDrawer = newVal;
    },
    localDrawer(newVal) {
      this.$emit('update:drawer', newVal);
    },
  },
  computed: {
    userAvatar() {
      return this.authStore.getCurrentUser?.avatar || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png';
    },
    username() {
      return this.authStore.getCurrentUser?.username || 'Guest';
    },
    email() {
      return this.authStore.getCurrentUser?.email || 'No email provided';
    },
  },
  methods: {
    handleAuthAction() {
      if (this.authStore.getCurrentUser) {
        this.logout(); // If user is logged in, log out
      } else {
        this.login(); // If user is not logged in, redirect to login
      }
    },
    logout() {
      alert('Logging out...');
      console.log('Logging out...');
      this.localDrawer = false; // Close the drawer after logging out
      this.authStore.setCurrentUser(null); // Clear user data in authStore
      this.$router.push('/loginPage'); // Redirect to login
    },
    login() {
      this.$router.push('/loginPage'); // Redirect to login page
    },
    goHome() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
/* Sidebar starts below the header (64px is a common header height) */
.v-navigation-drawer {
  z-index: 1000; /* Ensure drawer overlays content */
}

/* Updated avatar style to match the review component */
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the avatar fills the container without distortion */
  border-radius: 50%; /* Keeps the avatar circular */
}
</style>
