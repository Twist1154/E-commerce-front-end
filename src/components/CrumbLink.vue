<template>
  <v-breadcrumbs :items="breadcrumbs" divider-icon="mdi-chevron-right">
    <template v-slot:title="{ item, index }">
      <!-- Active breadcrumb link -->
      <router-link
        v-if="index !== breadcrumbs.length - 1"  <!-- Active links (not last one) -->
        :to="item.to"
        class="breadcrumb-link active-link"
      >
        {{ item.title.toUpperCase() }}
      </router-link>
      
      <!-- Inactive breadcrumb (last one) -->
      <span v-else class="breadcrumb-link inactive-link">
        {{ item.title.toUpperCase() }}
      </span>
    </template>
  </v-breadcrumbs>
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
      this.breadcrumbs = this.$route.matched.map((route) => ({
        title: route.meta.title || route.name,
        to: route.path,
      }));
    },
  },
  watch: {
    '$route': 'generateBreadcrumbs',
  },
  mounted() {
    this.generateBreadcrumbs();
  },
};
</script>

<style scoped>
/* Breadcrumbs container styling */
.v-breadcrumbs {
  color: #333; /* Default text color */
}

/* Active breadcrumb link styling */
.breadcrumb-link.active-link {
  color: #000; /* Dark color for active links */
  text-decoration: none;
  font-weight: bold;
}

/* Inactive breadcrumb link (last link) styling */
.breadcrumb-link.inactive-link {
  color: #bdbdbd; /* Gray color for inactive last link */
  cursor: default;
}

/* Add hover effect to active breadcrumb links */
.breadcrumb-link.active-link:hover {
  text-decoration: underline;
}

/* Custom color for the divider icon (arrows) */
.v-icon {
  color: black; /* Black arrows */
}
</style>
