<template>
  <div>
    <navigation />
    <!-- Page title -->
    <v-divider></v-divider> <!-- divider re-useable everywhere -->
    <h1>African Art & Crafts</h1>

    <!-- Grid container for displaying products -->
    <v-container>
      <v-row no-gutters>

        <RangeSlider />
      </v-row>
      <v-row>
        <!-- Iterate over products and display each one -->
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
    </v-container>
  </div>
</template>


<script>
import ProductCard from "@/components/ProductCard.vue";
import productsService from "@/services/productsService";
import RangeSlider from "@/components/RangeSlider.vue";

export default {
  components: {
    ProductCard,
    RangeSlider,
  },
  name: "ProductsPage",
  data() {
    return {
      products: [],
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
      } catch (error) {
        console.error("There was an error fetching the products!", error);
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
/* Style for the page title */
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  border-bottom: 5px solid #162836;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
  background-color: #337ee0;
}
</style>
