<template>
  <div>
    <!-- Navigation Component -->
    <navigation />
    <v-divider></v-divider>

    <!-- Title -->
    <h1>African Art & Crafts</h1>

    <!-- Grid container for displaying products -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <!-- Display Products -->
            <v-col
              v-for="product in paginatedProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="d-flex justify-center"
            >
              <!-- Pass required props to ProductCard -->
              <product-card
                :product="product"
                :inventoryItem="product.inventoryItem"
                @add-to-wishlist="handleAddToWishlist"
                @view-details="handleViewDetails"
              />
            </v-col>
          </v-row>

          <!-- Pagination Component -->
          <v-pagination
            v-model="page"
            :length="totalPages"
            class="my-4"
          ></v-pagination>
        </v-col>
      </v-row>

      <!-- Display error message if products fail to load -->
      <v-row v-if="errorMessage" class="error-message">
        <v-col>
          <v-alert type="error">{{ errorMessage }}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import productsService from "@/services/productsService";

export default {
  components: {
    ProductCard,
  },
  name: "ProductsPage",
  data() {
    return {
      products: [], // Holds the list of products fetched from the service
      errorMessage: null, // Error message state
      page: 1, // Current pagination page
      itemsPerPage: 12, // Items per page (4 columns x 3 rows)
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.itemsPerPage;
      return this.products.slice(start, start + this.itemsPerPage);
    },
  },
  created() {
    this.fetchProducts(); // Fetch products on component creation
  },
  methods: {
    // Fetch all products from the API
    async fetchProducts() {
      try {
        const response = await productsService.getAllProducts();
        this.products = response.data; // Populate the products array
        this.errorMessage = null; // Reset error message on success
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        this.errorMessage = "Failed to load products. Please try again later."; // Set error message on failure
      }
    },
    // Handle the 'Add to Wishlist' button click
    handleAddToWishlist(productId) {
      console.log(`Adding product ${productId} to wishlist`); // Log the addition for now (can integrate with a wishlist service)
    },
    // Handle the 'View Details' button click
    handleViewDetails(productId) {
      this.$router.push(`/products/${productId}`); // Navigate to product details page
    },
  },
};
</script>

<style scoped>
/* Center the page title and apply custom styling */
h1 {
  text-align: center;
  -webkit-text-fill-color: #c8915f;
  text-shadow: 1px 1px 2px #7e5e41;
}

/* Style for the error message container */
.error-message {
  margin-top: 20px;
}

/* Ensure all product cards are the same size */
.product-card {
  width: 250px;
  height: 350px;
}
</style>
