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
                <v-row class="ms-6">
            <!-- Product Image on the Left with Padding -->
            <v-col cols="3" class="d-flex align-center justify-center pa-2">
              <v-avatar class="ma-3" rounded="0" size="125">
                <v-img :src="item.product.imagePath"></v-img>
              </v-avatar>
            </v-col>

            <!-- Product and User Info on the Right with Padding -->
            <v-col cols="9" class="pa-2">
              <!-- Product Name -->
              <v-card-text class="text-h5">
                {{ item.product.name }}
              </v-card-text>

              <!-- Price and Username -->
              <v-card-subtitle>
                {{ item.product.price }} | Added by: {{ item.user.username }}
              </v-card-subtitle>

              <!-- Product Created Date -->
              <v-card-subtitle>
                Added on: {{ formatDate(item.createdAt) }}
              </v-card-subtitle>

              <!-- Action Button -->
              <v-card-actions>
                <v-btn class="ms-2" size="small" variant="outlined" @click="viewProduct(item.product.id)">
                  View Product
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
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
