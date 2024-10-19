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

        <!-- Product Description -->
        <v-divider class="my-4"></v-divider>
        <p>{{ product.description }}</p>
        <v-card-text
          v-model="product.description"
          outlined
          rows="3"
          label="Product Description"
          disabled
        ></v-card-text>
        <v-spacer></v-spacer>

        <!-- Shipping and Inventory Info -->
        <v-divder class="my-4"></v-divder><v-divider />
        <v-card-text>
          <p>Vendor Location: {{ product.inventoryItem.vendorLocation }}</p>
          <p>In Stock: {{ product.inventoryItem.quantity }}</p>
          <p>Last Updated: {{ formattedDate }}</p>
        </v-card-text>

        <v-spacer></v-spacer>

        <!-- Product Price -->
        <h2 class="price my-4">R{{ product.price }}</h2>

        <v-divider class="my-4"></v-divider>
        <!-- Add to Cart and Wishlist Buttons -->
        <v-btn block color="black" class="white--text mb-3" @click="addToCart">
          ADD TO CART
        </v-btn>
        <v-btn block outlined color="primary" class="mb-3" @click="addToWish">
          <v-icon>mdi-heart</v-icon>
          ADD TO WISHLIST
        </v-btn>
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
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore"; // Import the auth store
import productsService from "@/services/productsService"; // Import the products service
import Review from "@/components/Review.vue"; // Import Review component
import wishlistService from "@/services/wishlistService"; // Import the wishlist service

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
      const authStore = useAuthStore(); // Access Auth Store
      const user = authStore.user; // Get the current authenticated user

      if (!user) {
        alert("Please log in to add items to your Cart.");
        return;
      }

      const cartStore = useCartStore(); // Access Cart Store
      cartStore.addToCart(this.product); // Add product to cart
      alert(`${this.product.name} added to cart!`);
    },

    // Method to handle adding the product to the wish list
    async addToWish() {
      if (!this.product) return; // Ensure product is loaded before adding to wish list

      const authStore = useAuthStore(); // Access Auth Store
      const user = authStore.user; // Get the current authenticated user

      if (!user) {
        alert("Please log in to add items to your wishlist.");
        return;
      }

      // Construct the wishlist object as expected by the backend
      const wishlist = {
        id: '', // Default ID for new wishlist entry
        user: user, // Use the current authenticated user
        product: this.product, // Add the current product
        createdAt: new Date().toISOString(), // Add current date in ISO format
      };

      try {
        // Call the wishlist service to add the product to the wishlist
        const response = await wishlistService.createWishlist(wishlist);
        console.log("Product added to wishlist", response.data);
        alert(`${this.product.name} added to Wish List!`);
      } catch (error) {
        console.error("Failed to add product to wishlist:", error); // Handle any errors
      }
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
  text-align: left;
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
