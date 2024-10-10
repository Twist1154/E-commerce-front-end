<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-badge
      v-bind="props"
      :content="isHovering ? 'Stock' : inventoryItem.quantity"
      color="blue"
      overlap
    >
      <v-card class="mx-auto" max-width="200">
        <!-- Image and product title -->
        <v-img class="align-end text-white" height="200" :src="product.imagePath" cover></v-img>
        <v-card-title>{{ product.name }}</v-card-title>

        <!-- Card content -->
        <v-card-text class="pt-1">
          <!-- Show progress while loading -->
          <div v-if="isLoading">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          
          <!-- Show product details -->
          <div v-else>
            <div class="d-flex flex-column align-center justify-center">
              <!-- Display product rating -->
              <v-rating
                v-model="rating"
                density="default"
                background-color="yellow"
                color="amber"
                class="ma-1"
              ></v-rating>
            </div>

            <!-- Product price -->
            <div><h3>R{{ product.price }}</h3></div>

            <!-- Subcategories of the product -->
            <div>
              <h4>
                {{ subCategories.length > 0 ? subCategories.map(subCategory => subCategory.category.name).join(', ') : 'No Subcategories' }}
                <font-awesome-icon :icon="['fas', 'tags']" />
              </h4>
            </div>
          </div>
        </v-card-text>

        <!-- Card actions for viewing and adding to cart -->
        <v-card-actions>
          <v-btn color="green" @click="$emit('view-details', product.id)">
            <h3>View</h3>
          </v-btn>
          <v-btn color="blue" @click="$emit('add-to-cart', product.id)">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
import reviewService from '@/services/reviewService';
import subCategoryService from '@/services/subCategoryService';

export default {
  name: "ProductCard",
  emits: ['view-details', 'add-to-cart'], // Declare emitted events
  props: {
    product: {
      type: Object,
      required: true,
    },
    inventoryItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: 0,  // Product rating
      subCategories: [],  // Subcategories for the product
      isLoading: true,  // Loading state
    };
  },
  mounted() {
    this.fetchData();  // Fetch data on mount
  },
  methods: {
    // Fetch all related data (rating, stock, subcategories)
    async fetchData() {
      await Promise.all([
        this.fetchProductRating(),
        this.fetchSubCategories(),
      ]);
      this.isLoading = false;  // Stop loading after data fetch
    },

    // Fetch product reviews and calculate average rating
    async fetchProductRating() {
      try {
        const reviews = await reviewService.getReviewsByProduct(this.product.id);
        console.log("Reviews fetched successfully:", reviews); // Log fetched reviews

        // Calculate the average rating
        if (reviews && reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          this.rating = (totalRating / reviews.length).toFixed(1);
        } else {
          this.rating = 0;  // No reviews, default to 0
        }
      } catch (error) {
        console.error("Error fetching product rating:", error);
        this.rating = 0;  // Handle error by setting default rating
      }
    },

    // Fetch subcategories associated with the product
    async fetchSubCategories() {
      try {
        const response = await subCategoryService.getSubCategoriesByProduct(this.product.id);
        console.log("Subcategories fetched successfully:", response); // Log fetched subcategories

        if (response && response.length > 0) {
          this.subCategories = response;  // Set fetched subcategories
        } else {
          this.subCategories = [];  // No subcategories found
          console.log("No subcategories found for the product");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        this.subCategories = [];  // Handle error by setting empty array
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
