<template>
  <v-container>
    <navigation />
    <v-divider></v-divider>
    <h1>Search by Price Range</h1>

    <!-- Price Range Filter Component -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-range-slider
          v-model="priceRange"
          :max="maxPrice"
          label="Price Range"
          hide-details
          @change="fetchProductsByPriceRange"
        ></v-range-slider>
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
import productsService from "@/services/productsService";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      priceRange: [0, 10000],
      maxPrice: 10000,
      products: [],
      errorMessage: null,
    };
  },
  methods: {
    async fetchProductsByPriceRange() {
      try {
        const response = await productsService.findProductByPriceRange(this.priceRange[0], this.priceRange[1]);
        this.products = response.data || [];
        this.errorMessage = null;
      } catch (error) {
        console.error("Failed to fetch products!", error);
        this.errorMessage = "Failed to load products. Please try again later.";
      }
    },
    handleViewDetails(productId) {
      this.$router.push(`/products/${productId}`);
    },
    handleAddToCart(productId) {
      console.log(`Adding product ${productId} to cart`);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  -webkit-text-fill-color: #C8915F;
  text-shadow: 1px 1px 2px #7e5e41;
}
.error-message {
  margin-top: 20px;
}
</style>
