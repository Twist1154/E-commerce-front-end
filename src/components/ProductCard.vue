<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-badge
      v-bind="props"
      :content="isHovering ? 'Stock' : stockQuantity"
      color="blue"
      overlap
    >
      <v-card class="mx-auto" max-width="200">
        <v-img class="align-end text-white" height="200" :src="imagePath" cover></v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text class="pt-1">
          <div class="d-flex flex-column align-center justify-center">
            <v-rating v-model="rating" density="default" background-color="yellow" color="amber" class="ma-1"></v-rating>
          </div>
          <div><h3>R{{ price }}</h3></div>
          <div>
            <h4>{{ categoryName }}  <font-awesome-icon :icon="['fas', 'tags']" /></h4>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green" @click="$emit('view-details', productId)"><h3>View</h3></v-btn>
          <v-btn color="blue" @click="$emit('add-to-cart')"><font-awesome-icon :icon="['fas', 'cart-shopping']" /></v-btn>
        </v-card-actions>
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
import { getCategoryById } from "@/services/categoriesService";

export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rating: 4.5, // Static rating, can be dynamic if needed
      categoryName: "", // Will be fetched using categoryId
    };
  },
  methods: {
    async fetchCategoryName() {
      try {
        const category = await getCategoryById(this.categoryId);
        this.categoryName = category.name;
      } catch (error) {
        console.error("Error fetching category:", error);
        this.categoryName = "Unknown"; // Fallback to 'Unknown' if an error occurs
      }
    },
  },
  mounted() {
    this.fetchCategoryName(); // Fetch the category name when the component is mounted
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
