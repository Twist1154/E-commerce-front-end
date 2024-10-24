// src/pages/OrderPage.vue
<template>
  <div>
    <navigation />
    <v-divider></v-divider>

    <v-container class="text-center">
      <h1>My Orders</h1>

      <!-- Orders List -->
      <v-row v-if="orders.length" class="my-4">
        <v-col v-for="order in orders" :key="order.id" cols="12" md="6" lg="4">
          <v-card>
            <v-card-title>
              <h2>Order #{{ order.id }}</h2>
            </v-card-title>

            <v-card-subtitle>Placed on: {{ order.date }}</v-card-subtitle>
            <v-divider></v-divider>

            <v-card-text>
              <div class="text-h5">Total: R{{ order.total }}</div>
              <v-list class="mt-2">
                <v-subheader>Items:</v-subheader>
                <v-list-item v-for="item in order.items" :key="item.id">
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
              <v-btn @click="viewOrder(order.id)" color="primary" block
                >View Details</v-btn
              >
              <v-btn @click="cancelOrder(order.id)" color="error" block
                >Cancel Order</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Loading State -->
      <v-row v-else>
        <v-col class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <p>Loading your orders...</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ordersService from "@/services/orderService"; // Import the orders service

export default {
  name: "OrdersPage",
  data() {
    return {
      orders: [], // Array to hold orders
    };
  },
  methods: {
    // Method to fetch orders from the backend
    async fetchOrders() {
      try {
        const response = await ordersService.getAllOrders(); // Fetch orders from service
        this.orders = response.data; // Set the orders data from the response
      } catch (error) {
        console.error("Failed to fetch orders:", error); // Handle any errors
      }
    },

    // Method to handle viewing order details
    viewOrder(orderId) {
      this.$router.push(`/orderDetails/${orderId}`);
    },

    // Method to handle cancelling an order
    cancelOrder(orderId) {
      alert(`Order #${orderId} has been canceled.`);
      // Logic for cancelling the order would go here
    },
  },
  mounted() {
    this.fetchOrders(); // Fetch orders when the component is mounted
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
</style>
