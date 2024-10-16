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
            <!-- Adding a class for styling -->
            <v-img
              :src="authStore.getCurrentUser?.avatar || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Fno-profile-picture-icon%2F&psig=AOvVaw297_euzi07Wz5Q2_wDyCNM&ust=1729074362807000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKir9ZKWkIkDFQAAAAAdAAAAABAE'"
              alt="User Avatar"
              class="user-avatar" 
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ authStore.getCurrentUser?.name || 'Guest' }}</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.getCurrentUser?.email || 'No email provided' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Options -->
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>

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
import NavG from '@/components/NavG.vue'; // Importing the NavG component

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
  },
};
</script>

<style scoped>
/* Sidebar starts below the header (64px is a common header height) */
.v-navigation-drawer {
  z-index: 1000; /* Ensure drawer overlays content */
}

.user-avatar {
  width: 40px; /* Set width of the avatar */
  height: 40px; /* Set height of the avatar */
  border-radius: 50%; /* Make it round */
  overflow: hidden; /* Ensure the image fits within the bounds */
}
</style>
