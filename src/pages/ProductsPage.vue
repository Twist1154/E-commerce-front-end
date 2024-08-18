<template>
  <div>
    <navigation/>
    <!-- Page title -->
    <h1>African Art & Crafts</h1>

    <!-- Grid container for displaying products -->
    <div class="grid-wrap">
      <!-- Iterate over products and display each one -->
      <div
        class="product-item"
        v-for="product in products"
        :key="product.productId"
      >
        <!-- Product image -->
        <img :src="product.imagePath" alt="Product Image" />
        <!-- Product name -->
        <h3 class="product-name">{{ product.name }}</h3>
        <!-- Product price -->
        <p class="product-price">{{ product.price }}</p>
        <!-- Button to navigate to product details page -->
        <router-link :to="'/products/' + product.productId">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/NavG.vue';
import productsService from '@/services/productsService';

export default {
  components: {navigation},
  name: "ProductsPage",
  data() {
    return {
      // Array to hold the list of products fetched from the API
      products: [],
    }
  },
  created() {
    // Fetch the list of products using the service method when the component is created
    productsService.getAllProducts()
      .then(response => {
        // Store the fetched products in the 'products' array
        this.products = response.data;
      })
      .catch(error => {
        // Log any errors that occur during the API request
        console.error("There was an error fetching the products!", error);
      });
  }
}
</script>

<style scoped>
/* Style for the page title */
h1 {
  text-align: center;
  -webkit-text-fill-color:  #C8915F;
  text-shadow: 1px 1px 2px #7e5e41;
}

/* Style for the grid container */
.grid-wrap {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}

/* Style for individual product items */
.product-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 32%;
}

/* Style for the product name */
.product-name {
  margin-bottom: 0;
}

/* Style for product images */
.product-item img {
  height: 200px;
  width: 200px;
}

/* Style for the 'View Details' button */
.product-item button {
  width: 100%;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
  margin-top: 10px;
}
</style>
