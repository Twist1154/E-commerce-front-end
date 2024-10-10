<template>
    <v-container>
      <!-- Navigation Component -->
      <navigation />
      <v-divider></v-divider>
  
      <!-- Title -->
      <v-row justify="center">
        <v-col>
          <h1>Your Cart</h1>
        </v-col>
      </v-row>
  
      <!-- Check if cart is empty -->
      <v-row v-if="cartItems.length === 0" justify="center">
        <v-col>
          <v-alert type="info">Your cart is currently empty.</v-alert>
        </v-col>
      </v-row>
  
      <!-- Display Cart Items -->
      <v-row v-else>
        <v-col
          v-for="item in cartItems"
          :key="item.productId"
          cols="12"
          sm="6"
          md="4"
        >
          <product-card
            :productId="item.productId"
            :name="item.name"
            :description="item.description"
            :price="item.price"
            :stockQuantity="item.stockQuantity || 'N/A'"  
            :categoryName="item.subCategories"
            :imagePath="item.imagePath"
            @remove-from-cart="handleRemoveFromCart(item.productId)" 
          />
        </v-col>
      </v-row>
  
      <!-- Display error message if cart fails to load -->
      <v-row v-if="errorMessage" class="error-message">
        <v-col>
          <v-alert type="error">{{ errorMessage }}</v-alert>
        </v-col>
      </v-row>
  
      <!-- Checkout button -->
      <v-row justify="center">
        <v-col>
          <v-btn @click="handleCheckout" color="success">Checkout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ProductCard from "@/components/ProductCard.vue";
  import cartService from "@/services/CartService"; // Import cart service
  
  export default {
    components: {
      ProductCard,
    },
    name: "CartPage",
    data() {
      return {
        cartItems: [], // Holds the list of items in the cart
        errorMessage: null, // Error message state
      };
    },
    created() {
      this.fetchCartItems(); // Fetch cart items on component creation
    },
    methods: {
      // Fetch all cart items from the cart service
      async fetchCartItems() {
        try {
          const response = await cartService.getCartItems();
          this.cartItems = response.data; // Populate the cart items array
          this.errorMessage = null; // Reset error message on success
        } catch (error) {
          console.error("There was an error fetching the cart items!", error);
          this.errorMessage = "Failed to load cart items. Please try again later."; // Set error message on failure
        }
      },
      // Handle the 'Remove from Cart' button click
      handleRemoveFromCart(productId) {
        console.log(`Removing product ${productId} from cart`); // Log the removal for now
        this.cartItems = this.cartItems.filter(item => item.productId !== productId); // Update cart items
      },
      // Handle checkout action
      handleCheckout() {
        console.log("Proceeding to checkout"); // Implement checkout logic
        // You can navigate to the checkout page here if needed
        // this.$router.push('/checkout');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Center the error message container */
  .error-message {
    margin-top: 20px;
  }
  
  /* Additional styles can be added here */
  </style>
  