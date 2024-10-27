<template>
  <div>
    <navigation />
    <v-divider></v-divider>

    <v-container class="text-center">
      <h1>My Orders</h1>

      <!-- Orders List -->
      <v-row v-if="ordersFetched.length" class="my-4">
        <v-col v-for="order in paginatedOrders" :key="order.id" cols="12" md="6" lg="4">
          <v-card>
            <v-card-title>
              <h2>Order #{{ order.id }}</h2>
            </v-card-title>

            <v-card-subtitle>Placed on: {{ formatDate(order.orderDate) }}</v-card-subtitle>
            <v-divider></v-divider>

            <v-card-text>
              <div class="text-h5">Total: R{{ order.totalPrice }}</div>
              <div>Status: {{ order.status }}</div>

              <v-list v-if="order.items && order.items.length" class="mt-2">
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
              <div v-else>No items available.</div>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="viewOrder(order.id)" color="primary" block>View Details</v-btn>
              <v-btn v-if="order.status === 'Pending'" @click="cancelOrder(order.id)" color="error" block>Cancel Order</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Loading State -->
      <v-row v-else>
        <v-col class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading your orders...</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import orderService from "@/services/orderService"; // Import the orders service

export default {
  name: "OrdersPage",
  data() {
    return {
      ordersFetched: [], // Holds the list of orders fetched from the service
      errorMessage: null, // Error message state
      page: 1, // Current pagination page
      itemsPerPage: 12, // Items per page (4 columns x 3 rows)
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.ordersFetched.length / this.itemsPerPage);
    },
    paginatedOrders() {
      const start = (this.page - 1) * this.itemsPerPage;
      return this.ordersFetched.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric" , minute: "numeric",seconds: "numeric"};
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async fetchOrders() {
      // Fetch all orders from the API
      try {
        const response = await orderService.getAllOrders();
        this.ordersFetched = response.data; // Populate the orders array
        this.errorMessage = null; // Reset error message on success
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        this.errorMessage = "Failed to load orders. Please try again later."; // Set error message on failure
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
  async created() {
    await this.fetchOrders(); // Fetch orders when the component is created
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
