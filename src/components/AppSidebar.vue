<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="localDrawer"
    temporary
    width="300"
    style="background-color: lightgrey; position: fixed; top: 0; left: 0; height: 100%;"
  >
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>

      <v-spacer></v-spacer>

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
    drawer(newVal) {
      this.localDrawer = newVal;
    },
    localDrawer(newVal) {
      this.$emit('update:drawer', newVal);
    },
  },
  methods: {
    logout() {
      alert('Logging out...');
      console.log('Logging out...');
      this.localDrawer = false;
    },
  },
};
</script>

<style scoped>
/* Ensuring no additional spacing in AppSidebar */
.v-navigation-drawer {
  z-index: 1000;
}
</style>
