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
          <div v-if="isLoading">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </div>
          <div v-else>
            <div class="d-flex flex-column align-center justify-center">
              <v-rating
                v-model="rating"
                density="default"
                background-color="yellow"
                color="amber"
                class="ma-1"
              ></v-rating>
            </div>
            <div><h3>R{{ price }}</h3></div>
            <div>
              <h4>
                {{ subCategories && subCategories.length > 0 ? subCategories.map((subCategory) => subCategory.category.name).join(', ') : 'No Subcategories' }}
                <font-awesome-icon :icon="['fas', 'tags']" />
              </h4>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green" @click="$emit('view-details', productId)"><h3>View</h3></v-btn>
          <v-btn color="blue" @click="$emit('add-to-cart', productId)">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
import inventoryService from '@/services/inventoryService';
import reviewService from '@/services/reviewService';
import subCategoryService from '@/services/subCategoryService';

export default {
  name: "ProductCard",
  emits: ['view-details', 'add-to-cart'], // Declare emitted events
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
    productId: {
      type: Number,
      required: true,
    },
    inventoryItem: {  // New prop for inventory item
      type: Object,
      required: true,
    },
    reviews: {  // New prop for reviews
      type: Array,
      default: () => [],
    },
    subCategories: { // New prop for subcategories
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rating: 0,
      stockQuantity: 0,
      isLoading: true,
    };
  },
  mounted() {
    this.initializeData(); // Initialize data when component is mounted
  },
  methods: {
    initializeData() {
      this.calculateRating();
      this.stockQuantity = this.inventoryItem.quantity || 0; // Get stock quantity from the inventory item
      this.isLoading = false; // Loading is complete
    },

    calculateRating() {
      if (this.reviews && this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = (totalRating / this.reviews.length).toFixed(1); // Average rating calculation
      } else {
        this.rating = 0; // Default rating if no reviews
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
