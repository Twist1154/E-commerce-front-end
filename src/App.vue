<template>
  <div>
    <!-- Navigation Header (navG) -->
    <navG />
    
    <!-- Main Content where route views are rendered -->
    <main>
      <router-view></router-view>
    </main>
    
    <!-- Footer Component -->
    <AppFooter />
  </div>
</template>

<script>
import navG from "@/components/NavG.vue";  // Importing the navG component
import AppFooter from "@/components/AppFooter.vue"; // Importing the Footer component

export default {
  name: "App",
  components: {
    navG,       // Registering navG as a component
    AppFooter,  // Registering the Footer as a component
  },
};
</script>

<style>
/* Optional: Add any global styles or adjustments here */
main {
  margin-top: 80px; /* Adjust margin to fit the height of the navG */
}
</style>
