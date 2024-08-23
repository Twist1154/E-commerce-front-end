<template>
  <div class="container">
    <navigation />
    <hr />
    <h1>Search by Category</h1>

    <!-- Category Filter Component -->
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <div class="form-group">
          <label for="categoryId">Category</label>
          <select id="categoryId" v-model="selectedCategoryId" @change="fetchProductsByCategory" required>
            <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
              {{ category.name }}
            </option>
          </select>
        </div>
      </v-col>
    </v-row>

    <!-- Display error message if products fail to load -->
    <v-row v-if="errorMessage" class="error-message">
      <v-col>
        <div class="alert-error">{{ errorMessage }}</div>
      </v-col>
    </v-row>

    <!-- Display Products -->
    <v-row v-if="products.length">
      <v-col
        v-for="product in products"
        :key="product.productId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
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
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { getAllCategories } from "@/services/categoriesService";
import productsService from "@/services/productsService";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      categories: [], // Array to hold categories
      selectedCategoryId: null, // Currently selected category ID
      products: [], // Array to hold products
      errorMessage: null, // Error message to display
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await getAllCategories(); // Fetch categories from the backend
        console.log('Fetched categories:', response);
        this.categories = response.map(category => ({
          categoryId: category.categoryId, // Map categoryId for select value
          name: category.name // Display category name
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchProductsByCategory() {
      if (!this.selectedCategoryId) {
        console.warn('No category selected.');
        return;
      }

      console.log('Fetching products for category ID:', this.selectedCategoryId);
      try {
        const response = await productsService.findProductByCategoryId(this.selectedCategoryId);
        console.log('Products response:', response);
        
        this.products = response.data || [];
        this.errorMessage = null;
      } catch (error) {
        console.error("Failed to fetch products:", error);
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
  async created() {
    try {
      console.log('Component created, fetching categories...');
      await this.fetchCategories(); // Fetch categories when the component is created
    } catch (error) {
      console.error('Error during component creation:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #C8915F;
  text-shadow: 1px 1px 2px #7e5e41;
}

.form-group {
  margin: 20px 0;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #C8915F;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #7e5e41;
}

.error-message {
  margin-top: 20px;
  text-align: center;
}

.alert-error {
  color: #fff;
  background-color: #e74c3c;
  padding: 15px;
  border-radius: 5px;
}
</style>
