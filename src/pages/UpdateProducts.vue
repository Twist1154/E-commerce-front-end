<template>
  <div>
    <!-- Page title -->
    <h1>Update Products</h1>

    <!-- Grid container for displaying products -->
    <div class="grid-wrap">
      <!-- Iterate over products and display each one -->
      <div
        class="product-item"
        v-for="product in products"
        :key="product.id"
      >
        <!-- Product image with fallback when imagePath is empty -->
        <img
          :src="product.imagePath || 'https://via.placeholder.com/200'"
          alt="Product Image"
        />
        <!-- Product name -->
        <h3 class="product-name">{{ product.name }}</h3>
        <!-- Product description -->
        <p class="product-description">{{ product.description }}</p>
        <!-- Product price -->
        <p class="product-price">{{ product.price }}</p>
        <!-- Created and Updated times -->
        <p class="product-timestamps">
          <small>Created: {{ new Date(product.createdAt).toLocaleDateString() }}</small><br>
          <small>Updated: {{ new Date(product.updatedAt).toLocaleDateString() }}</small>
        </p>
        <!-- Button to navigate to update product form -->
        <router-link :to="'/updateForm/' + product.id">
          <button>Update Product</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import productsService from '@/services/productsService';

export default {
  name: "productsPage",
  data() {
    return {
      // Array to hold the list of products fetched from the API
      products: [],
    };
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
  padding: 10px;
  position: relative;
  width: 30%;
}

/* Style for the product name */
.product-name {
  margin-bottom: 0;
}

/* Style for product description */
.product-description {
  font-style: italic;
  margin-bottom: 8px;
}

/* Style for product timestamps */
.product-timestamps small {
  color: gray;
}

/* Style for product images */
.product-item img {
  height: 200px;
  width: 200px;
}

/* Style for the 'Update Product' button */
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
<template>
  <div>
    <!-- Page title -->
    <h1>Update Products</h1>

    <!-- Grid container for displaying products -->
    <div class="grid-wrap">
      <!-- Iterate over products and display each one -->
      <div class="product-item" v-for="product in products" :key="product.id">
        <!-- Product image with fallback when imagePath is empty -->
        <img
          :src="product.imagePath || 'https://via.placeholder.com/200'"
          alt="Product Image"
        />
        <!-- Product name -->
        <h3 class="product-name">{{ product.name }}</h3>
        <!-- Product description -->
        <p class="product-description">{{ product.description }}</p>
        <!-- Product price -->
        <p class="product-price">{{ product.price }}</p>
        <!-- Created and Updated times -->
        <p class="product-timestamps">
          <small
            >Created:
            {{ new Date(product.createdAt).toLocaleDateString() }}</small
          ><br />
          <small
            >Updated:
            {{ new Date(product.updatedAt).toLocaleDateString() }}</small
          >
        </p>
        <!-- Button to navigate to update product form -->
        <router-link :to="'/updateForm/' + product.id">
          <button>Update Product</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import productsService from "@/services/productsService";

export default {
  name: "productsPage",
  data() {
    return {
      // Array to hold the list of products fetched from the API
      products: [],
    };
  },
  created() {
    // Fetch the list of products using the service method when the component is created
    productsService
      .getAllProducts()
      .then((response) => {
        // Store the fetched products in the 'products' array
        this.products = response.data;
      })
      .catch((error) => {
        // Log any errors that occur during the API request
        console.error("There was an error fetching the products!", error);
      });
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
  padding: 10px;
  position: relative;
  width: 30%;
}

/* Style for the product name */
.product-name {
  margin-bottom: 0;
}

/* Style for product description */
.product-description {
  font-style: italic;
  margin-bottom: 8px;
}

/* Style for product timestamps */
.product-timestamps small {
  color: gray;
}

/* Style for product images */
.product-item img {
  height: 200px;
  width: 200px;
}

/* Style for the 'Update Product' button */
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
