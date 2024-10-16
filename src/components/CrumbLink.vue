<template>
  <!-- Breadcrumbs (Below Navbar) -->
  <v-container class="breadcrumbs-container" fluid>
    <v-breadcrumbs :items="breadcrumbs" divider-icon="mdi-forward">
      <!-- Slot for the breadcrumb item title -->
      <template v-slot:title="{ item }">
        <!-- Use router-link to navigate to the breadcrumb route -->
        <router-link :to="item.to" class="breadcrumb-link">
          {{ item.title.toUpperCase() }}
        </router-link>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<script>
export default {
  name: "CrumbLink",
  data() {
    return {
      breadcrumbs: [],
    };
  },
  methods: {
    generateBreadcrumbs() {
      // Generate breadcrumbs based on the current route
      this.breadcrumbs = this.$route.matched.map((route) => ({
        title: route.meta.title || route.name, // Use the title from meta or fallback to route name
        to: route.path, // Path of the route
      }));
    },
  },
  watch: {
    // Watch for route changes and regenerate breadcrumbs when the route changes
    '$route': 'generateBreadcrumbs',
  },
  mounted() {
    this.generateBreadcrumbs(); // Generate breadcrumbs when the component is mounted
  },
};
</script>

<style scoped>
/* Breadcrumbs container styling */
.breadcrumbs-container {
  padding: 0;
  background-color: #004d40; /* Teal Darken 4 background */
  color: white;
}

/* Vuetify v-breadcrumbs inherited styling */
.v-breadcrumbs {
  color: inherit;
}

/* Styling for breadcrumb links */
.breadcrumb-link {
  color: white;
  text-decoration: none;
}

/* Add hover effect to breadcrumb links */
.breadcrumb-link:hover {
  text-decoration: underline;
}

/* Custom color for the divider icon */
.v-icon {
  color: white;
}
</style>
