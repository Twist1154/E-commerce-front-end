<template>
  <div>
    <navigation />
    <v-divider></v-divider>
    <h1>African Art & Crafts</h1>

    <!-- Grid container for displaying products -->
    <v-container>
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
      products: [],
      errorMessage: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await productsService.getAllProducts();
        this.products = response.data;
        this.errorMessage = null;
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        this.errorMessage = "Failed to load products. Please try again later.";
      }
    },
    handleViewDetails(productId) {
      this.$router.push(`/products/${productId}`);
    },
    handleAddToCart(productId) {
      console.log(`Adding product ${productId} to cart`);
    },
  },
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
