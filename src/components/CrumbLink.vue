<template>
  <!-- Breadcrumbs (Below Navbar) -->
  <v-container class="breadcrumbs-container" fluid>
    <!-- Breadcrumbs with custom dividers and link behavior -->
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon> <!-- Chevron right divider -->
      </template>

      <!-- Custom breadcrumb items -->
      <template v-slot:title="{ item, index }">
        <!-- Active breadcrumb links -->
        <router-link
          v-if="index !== breadcrumbs.length - 1"  
          :to="item.to"
          class="breadcrumb-link active-link"
        >
          {{ item.title }}
        </router-link>
        
        <!-- Last breadcrumb (inactive) -->
        <span v-else class="breadcrumb-link inactive-link">
          {{ item.title }}
        </span>
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
        title: route.meta.title || route.name, // Use meta title or fallback to route name
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

/* Styling for active breadcrumb links */
.breadcrumb-link.active-link {
  color: #000; /* Black color for active links */
  text-decoration: none;
  font-weight: bold;
}

.breadcrumb-link.active-link:hover {
  text-decoration: underline; /* Underline on hover */
}

/* Styling for inactive breadcrumb link (last item) */
.breadcrumb-link.inactive-link {
  color: #bdbdbd; /* Gray color for inactive last link */
  cursor: default;
}

/* Custom color for the divider icon */
.v-icon {
  color: black; /* Color for divider icons (arrows) */
}
</style>
