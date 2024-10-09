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
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
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
                {{ subCategories && subCategories.length > 0 ? subCategories.map((subCategory) => subCategory.name).join(', ') : 'No Subcategories' }}
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
  },
  data() {
    return {
      rating: 0,
      stockQuantity: 0,
      subCategories: [],
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData(); // Fetch all data when component is mounted
  },
  methods: {
    async fetchData() {
      await Promise.all([
        this.fetchProductRating(),
        this.fetchStockQuantity(),
        this.fetchSubCategories(),
      ]);
      this.isLoading = false; // Set loading to false after data has been fetched
    },

    async fetchProductRating() {
      try {
        const reviews = await reviewService.getReviewsByProduct(this.productId);
        console.log("Reviews fetched successfully:", reviews); // Log fetched reviews

        // Calculate the average rating
        if (reviews && reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          this.rating = (totalRating / reviews.length).toFixed(1);
        } else {
          this.rating = 0; // No reviews, default to 0
        }
      } catch (error) {
        console.error("Error fetching product rating:", error);
        this.rating = 0; // Handle the error by setting default
      }
    },

    async fetchStockQuantity() {
      try {
        const response = await inventoryService.getInventoryItemsByProductId(this.productId);
        console.log("Stock quantity fetched successfully:", response); // Log fetched stock quantity

        if (response && response.length > 0) {
          this.stockQuantity = response[0].quantity; // Use the first item's quantity
        } else {
          this.stockQuantity = 0; // No stock information found
        }
      } catch (error) {
        console.error("Error fetching stock quantity:", error);
        this.stockQuantity = 0; // Handle the error by setting default
      }
    },

    async fetchSubCategories() {
      try {
        const response = await subCategoryService.getSubCategoriesByProduct(this.productId);
        console.log("Subcategories fetched successfully:", response); // Log fetched subcategories

        if (response && response.length > 0) {
          this.subCategories = response; // Set the fetched subcategories
        } else {
          this.subCategories = []; // No subcategories found
          console.log("No subcategories found for the product");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        this.subCategories = []; // Handle the error by setting default
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
