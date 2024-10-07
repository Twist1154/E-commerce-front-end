<template>
  <!-- Vuetify Layout Wrapper -->
  <v-app>
    <!-- Navigation Header (NavG) -->
    <NavG />
    
    <!-- Main Content where route views are rendered -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    
    <!-- Footer Component -->
    <!--v-footer-->
      <AppFooter />
    <!--/v-footer-->
  </v-app>
</template>

<script>
import NavG from "@/components/NavG.vue";  // Importing the NavG component
import AppFooter from "@/components/AppFooter.vue"; // Importing the Footer component

export default {
  name: "App",
  components: {
    NavG,       // Registering NavG as a component
    AppFooter,  // Registering the Footer as a component
  },
};
</script>

<style>
main {
  margin-top: 80px; /* Adjust margin to fit the height of the NavG */
}
</style>
