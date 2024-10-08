<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer 
    v-model="localDrawer" 
    temporary 
    width="300" 
    style="background-color: lightgrey;"
    @close="emitClose"
  >
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
    </v-list>

    <!-- Logout Button -->
    <v-btn block @click="logout">
      Logout
    </v-btn>
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
      localDrawer: this.drawer, // Use a local state to manage drawer visibility
    };
  },
  watch: {
    // Watch for changes in the prop to sync with the local state
    drawer(newValue) {
      this.localDrawer = newValue;
    },
  },
  methods: {
    logout() {
      alert('Logging out...');
      console.log('Logging out...');
      this.$emit('update:drawer', false); // Emit event to close the drawer
    },
    emitClose() {
      this.$emit('update:drawer', false); // Emit event when the drawer is closed
    },
  },
};
</script>

<style>
/* Ensuring no additional spacing in AppSidebar */
.v-navigation-drawer {
  z-index: 1000; /* Ensure drawer overlays content */
}
</style>
