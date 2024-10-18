<template>
  <!-- Vuetify Layout Wrapper -->
  <v-app>
    <!-- Navigation Header (NavG) -->
    <NavigationBar />
    
    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";  // Importing the NavG component
import AppFooter from "@/components/AppFooter.vue"; // Importing the Footer component

export default {
  name: "App",
  components: {
    NavigationBar,       // Registering NavG as a component
    AppFooter,  // Registering the Footer as a component
  },
};
</script>

<style>
main {
  margin-top: 40px; /* Adjust margin to fit the height of the NavG */
}
</style>
