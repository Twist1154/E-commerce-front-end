<template>
  <v-container fluid>
    <!-- Navigation & Divider -->
    <navigation />
    <v-divider></v-divider>

    <!-- Main Product Section -->
    <v-row class="my-5" justify="space-between" v-if="product">
      <!-- Left: Image Carousel -->
      <v-col cols="12" md="6" class="image-section">
        <v-carousel hide-delimiters>
          <v-carousel-item>
            <v-img :src="product.imagePath" class="carousel-img"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Right: Product Details -->
      <v-col cols="12" md="6">
        <!-- Product Name -->
        <h1>{{ product.name }}</h1>

        <!-- Product Price -->
        <h2 class="price my-4">R{{ product.price }}</h2>

        <!-- Add to Cart and Wishlist Buttons -->
        <v-btn block color="black" class="white--text mb-3" @click="addToCart">
          ADD TO CART
        </v-btn>
        <v-btn block outlined color="primary" class="mb-3" @click="addToWish">
          <v-icon>mdi-heart</v-icon>
          ADD TO WISHLIST
        </v-btn>

        <!-- Product Description -->
        <v-divider class="my-4"></v-divider>
        <p>{{ product.description }}</p>
        <v-divider />
        <!-- Shipping and Inventory Info -->
        <v-divider></v-divider>

        <v-divider />
        <div class="my-4">
          <p>Vendor Location: {{ product.inventoryItem.vendorLocation }}</p>
          <p>In Stock: {{ product.inventoryItem.quantity }}</p>
          <p>Last Updated: {{ formattedDate }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-else>
      <v-col cols="12">
        <p>Loading product details...</p>
      </v-col>
    </v-row>
  </v-container>

        <!-- Reviews Section -->
        <v-divider class="my-4"></v-divider>
        <review v-if="product" :productId="product.id" />
</template>

<script>
import { useCartStore } from '@/stores/cartStore';
import productsService from "@/services/productsService"; // Import the products service
import Review from "@/components/Review.vue"; // Import Review component

export default {
  components: { Review }, // Register Review component
  name: "ProductDetailPage",
  data() {
    return {
      product: null, // Initialize product as null to handle loading state
    };
  },
  computed: {
    // Format the lastUpdated date from the inventory item
    formattedDate() {
      if (this.product && this.product.inventoryItem.lastUpdated) {
        const date = new Date(this.product.inventoryItem.lastUpdated);
        return date.toLocaleDateString();
      }
      return null;
    },
  },
  methods: {
    // Method to fetch product details from the backend using the productId from the route
    async fetchProductDetails() {
      const productId = this.$route.params.productId; // Get productId from route params
      try {
        const response = await productsService.getProductById(productId); // Fetch product details
        this.product = response.data; // Set the product data from the response
      } catch (error) {
        console.error("Failed to fetch product details:", error); // Handle any errors
      }
    },
    // Method to handle adding the product to the cart
    addToCart() {
      if (!this.product) return; // Ensure product is loaded before trying to add it to the cart
      
      const cartStore = useCartStore(); // Access Cart Store
      cartStore.addToCart(this.product); // Add product to cart
      alert(`${this.product.name} added to cart!`);
    },
    // Method to handle adding the product to the wish list
    addToWish() {
      if (!this.product) return; // Ensure product is loaded before adding to wish list
      alert(`${this.product.name} added to Wish List`);
    },
  },
  mounted() {
    this.fetchProductDetails(); // Fetch product details when the component is mounted
  },
};
</script>

<style scoped>
/* Styling for the main product title */
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

/* Image section styling */
.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Carousel image styling */
.carousel-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Styling for price */
.price {
  font-weight: bold;
  text-align: center;
}

/* Wishlist and Cart button styles */
button-group {
  display: flex;
  justify-content: space-between;
}

.add-to-cart {
  width: 75%;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
}

.add-to-wish {
  width: 20%;
  background-color: #0d1dfc;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Add hover effect */
.add-to-cart:hover {
  background-color: #333;
}

.add-to-wish:hover {
  background-color: #337ee0;
}
</style>
