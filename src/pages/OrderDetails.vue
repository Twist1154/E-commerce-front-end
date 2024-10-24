// src/pages/OrderDetails.vue
<template>
  <div>
    <navigation />
    <v-divider></v-divider>

    <v-container class="text-center">
      <h1>Order Details for #{{ orderId }}</h1>

      <!-- Show order details if available -->
      <v-row v-if="order">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h2>Order Information</h2>
            </v-card-title>
            <v-card-subtitle>Placed on: {{ order.date }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Total:</strong> R{{ order.total }}</p>
              <v-divider></v-divider>

              <!-- Order Items List -->
              <v-list class="mt-2">
                <v-subheader>Items:</v-subheader>
                <v-list-item v-for="item in orderItems" :key="item.id">
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
              <v-btn color="primary" @click="goBack">Back to Orders</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Loading state or error handling -->
      <v-row v-else>
        <v-col class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <p>Loading order details...</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ordersService from "@/services/orderService"; // Import the orders service

export default {
  name: "OrderDetails",
  data() {
    return {
      orderId: this.$route.params.id, // Get order ID from route params
      order: null, // The order details
      orderItems: [], // The items in the order
    };
  },
  methods: {
    async fetchOrderDetails() {
      try {
        // Fetch the order details by ID
        const orderResponse = await ordersService.getOrderById(this.orderId);
        this.order = orderResponse.data;

        // Fetch the order items
        const itemsResponse = await ordersService.findOrderItemsByOrderId(
          this.orderId,
        );
        this.orderItems = itemsResponse.data;
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    },
    goBack() {
      this.$router.push("/orders"); // Navigate back to the orders page
    },
  },
  mounted() {
    this.fetchOrderDetails(); // Fetch order details when the component is mounted
  },
};
</script>

<style scoped>
/* Custom styling for the page */
h1 {
  margin-top: 16px;
  padding: 16px;
}
v-card {
  margin-bottom: 24px;
}
</style>
