<!-- src/pages/PaymentPage.vue
<template>
  <div>
    <navigation />
    <v-divider></v-divider>

    <v-container class="text-center">
      <h1>Payment Page</h1>

      <v-row class="my-4">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h2>Confirm Your Order</h2>
            </v-card-title>

            <v-card-text>
              <div class="text-h5">Total: R{{ total }}</div>
              <v-list class="mt-2">
                <v-subheader>Items:</v-subheader>
                <v-list-item v-for="item in cartItems" :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      R{{ item.price }} (Qty: {{ item.quantity }})
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="placeOrder" color="primary" block
                >Place Order</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import paymentService from "@/services/paymentService"; // Import the payment service

export default {
  name: "PaymentPage",
  data() {
    return {
      cartItems: [], // Array to hold cart items
      total: 0, // Total price of the cart
    };
  },
  methods: {
    // Method to place an order
    async placeOrder() {
      try {
        const payment = {
          user: this.$store.state.user, // Assuming user is stored in Vuex store
          cartId: this.$store.state.cartId, // Assuming cartId is stored in Vuex store
          paymentAmount: this.total,
          paymentMethod: "None", // No card system
          paymentStatus: "Completed",
          paymentDate: new Date().toISOString().split("T")[0], // Current date
        };

        await paymentService.createPayment(payment); // Create payment
        this.$router.push("/orders"); // Redirect to orders page
      } catch (error) {
        console.error("Failed to place order:", error); // Handle any errors
      }
    },

    // Method to fetch cart items from the backend
    async fetchCartItems() {
      try {
        const response = await this.$store.dispatch("fetchCartItems"); // Fetch cart items from Vuex store
        this.cartItems = response.data;
        this.total = this.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ); // Calculate total
      } catch (error) {
        console.error("Failed to fetch cart items:", error); // Handle any errors
      }
    },
  },
  mounted() {
    this.fetchCartItems(); // Fetch cart items when the component is mounted
  },
};
</script>

<style scoped>
/* Custom styling for the page header */
h1 {
  text-shadow: 1px 1px 2px black;
  margin-top: 16px;
  padding: 16px;
}

/* Adjusting layout for order cards */
v-card {
  margin-bottom: 24px;
}
</style> -->