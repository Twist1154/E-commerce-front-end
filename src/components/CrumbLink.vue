<template>
  <!-- Breadcrumbs (Below Navbar) -->
  <v-spacer></v-spacer>

  <v-divider></v-divider>
  <v-container class="breadcrumbs-container" fluid>
    <!-- Breadcrumbs with custom dividers and link behavior -->
    <v-breadcrumbs :items="breadcrumbs" :key="breadcrumbs.length">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
        <!-- Chevron right divider -->
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
      breadcrumbs: [
        { title: "Home", to: "/" }, // Always start with 'Home'
      ],
    };
  },
  methods: {
    generateBreadcrumbs() {
      const currentRoute = this.$route.matched.map((route) => ({
        title: route.meta.title || route.name, // Use meta title or fallback to route name
        to: route.path, // Path of the route
      }));

      const isHomeOrProductsPage =
        this.$route.name === "Home" || this.$route.name === "products";

      if (isHomeOrProductsPage) {
        this.breadcrumbs = [{ title: "Home", to: "/" }];
      } else {
        // Generate breadcrumbs including Home and current route
        this.breadcrumbs = [{ title: "Home", to: "/" }, ...currentRoute];
      }

      // Ensure Vue updates the DOM with breadcrumb changes
      this.$nextTick(() => {
        console.log("Breadcrumbs updated:", this.breadcrumbs);
      });
    },
  },
  watch: {
    // Watch for route changes and regenerate breadcrumbs when the route changes
    $route: "generateBreadcrumbs",
  },
  mounted() {
    this.generateBreadcrumbs(); // Generate breadcrumbs when the component is mounted
  },
};
</script>

<style scoped>
/* Styling for active breadcrumb links */
.breadcrumb-link.active-link {
  color: #80d0c7; /* Light teal color (matches gradient) */
  text-decoration: none;
  font-weight: bold;
}

.breadcrumb-link.active-link:hover {
  text-decoration: underline; /* Underline on hover */
}

/* Styling for inactive breadcrumb link (last item) */
.breadcrumb-link.inactive-link {
  color: rgba(0, 0, 0, 0.8); /* Semi-transparent teal (matches gradient) */
  cursor: default;
}
</style>
