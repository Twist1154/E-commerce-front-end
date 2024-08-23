<template>
  <v-container>
    <navigation />
    <v-divider></v-divider>
    <h1>Search by Price Range</h1>

    <!-- Price Range Filter Component -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-slider
          v-model="priceRange"
          :min="0"
          :max="maxPrice"
          :step="10"
          label="Price Range"
          range
          hide-details
          @change="fetchProductsByPriceRange"
        ></v-slider>
      </v-col>
    </v-row>

    <!-- Display Products -->
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.productId"
        cols="12"
        sm="auto"
        md="auto"
      >
        <product-card
          :productId="product.productId"
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :stockQuantity="product.stockQuantity"
          :categoryId="product.categoryId"
          :imagePath="product.imagePath"
          @view-details="handleViewDetails"
          @add-to-cart="handleAddToCart"
        />
      </v-col>
    </v-row>

    <!-- Display error message if products fail to load -->
    <v-row v-if="errorMessage" class="error-message">
      <v-col>
        <v-alert type="error">{{ errorMessage }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import axios from 'axios';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      priceRange: [100.0, 10000.0], // Default price range
      maxPrice: 10000.0, // Maximum price for the slider
      products: [], // Array to hold fetched products
      errorMessage: null, // Error message to display
    };
  },
  created() {
    this.fetchProductsByPriceRange(); // Fetch products on component creation
  },
  methods: {
  async fetchProductsByPriceRange() {
    console.log("Fetching products for price range:", this.priceRange);
    const url = `http://localhost:8080/store/product/price`;
    console.log("Request URL:", url, "Params:", {
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1]
    });
    try {
      const response = await axios.get(url, {
        params: {
          minPrice: this.priceRange[0],
          maxPrice: this.priceRange[1]
        }
      });
      console.log("Received products:", response.data);
      this.products = response.data || []; // Update products array
      this.errorMessage = null; // Clear error message
    } catch (error) {
      console.error("Failed to fetch products!", error);
      this.errorMessage = "Failed to load products. Please try again later."; // Set error message
    }

  },handleViewDetails(productId) {
      this.$router.push(`/products/${productId}`); // Navigate to product details page
    },
    handleAddToCart(productId) {
      console.log(`Adding product ${productId} to cart`); // Handle adding product to cart
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #C8915F;
  text-shadow: 1px 1px 2px #7e5e41;
}

.error-message {
  margin-top: 20px;
}
</style>
