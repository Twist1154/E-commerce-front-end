<template>
  <!-- Vuetify Layout Wrapper -->
  <v-app>
    <!-- Navigation Header (NavG) -->
    <NavG />
    
    <!-- Breadcrumb Component placed right under the nav bar -->
    <v-container class="breadcrumbs-container" fluid>
      <CrumbLink />
    </v-container>

    <!-- Main Content where route views are rendered -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer Component -->
    <AppFooter />
  </v-app>
</template>

<script>
import NavG from "@/components/NavG.vue";  // Importing the NavG component
import AppFooter from "@/components/AppFooter.vue"; // Importing the Footer component
import CrumbLink from './components/CrumbLink.vue'; // Import Breadcrumb component

export default {
  name: "App",
  components: {
    NavG,       // Registering NavG as a component
    CrumbLink,  // Register CrumbLink component
    AppFooter,  // Registering the Footer as a component
  },
};
</script>

<style>
main {
  margin-top: 80px; /* Adjust margin to fit the height of the NavG */
}

/* Ensure breadcrumb container stays below the navbar */
.breadcrumbs-container {
  padding: 0;
  margin-top: 64px;
  background-color: #004d40; /* Teal Darken 4 background */
  color: white;
}

/* Breadcrumb link styling */
.breadcrumb-link {
  color: white;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

/* Custom color for the divider icon */
.v-icon {
  color: white;
}
</style>
