<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="localDrawer"
    temporary
    width="300"
    style="background-color: lightgrey; position: fixed; top: 0; left: 0; height: 100%;"
  >
    <v-list>
      <!-- Use v-spacer to push logout button to the bottom -->
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>

      <v-spacer></v-spacer> <!-- Pushes logout button to the bottom -->

      <!-- Logout Button -->
      <v-btn block @click="logout">
        Logout
      </v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localDrawer: this.drawer, // Create a local copy of the drawer prop
    };
  },
  watch: {
    // Watch for changes in the prop and update the local state
    drawer(newVal) {
      this.localDrawer = newVal;
    },
    // Watch for changes in the local state and emit updates
    localDrawer(newVal) {
      this.$emit('update:drawer', newVal); // Emit the update event
    },
  },
  methods: {
    logout() {
      alert('Logging out...');
      console.log('Logging out...');
      this.localDrawer = false; // Close the drawer after logging out
    },
  },
};
</script>

<style scoped>
/* Ensuring no additional spacing in AppSidebar */
.v-navigation-drawer {
  z-index: 1000; /* Ensure drawer overlays content */
}
</style>
