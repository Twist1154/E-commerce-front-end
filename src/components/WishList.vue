<template>
  <div class="wishlist-container">
    <v-row>
      <!-- Loop through wishlist items and display each as a card -->
      <v-col v-for="(item, index) in wishlistItems" :key="index" cols="12">
        <v-card color="#1F7087" class="pa-3">
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
                <v-btn
                  class="ms-2"
                  size="small"
                  variant="outlined"
                  @click="viewProduct(item.product.id)"
                >
                  View Product
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "WishList",
  props: {
    wishlistItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    viewProduct(productId) {
      // Navigate to the product detail page with the productId
      this.$router.push({ name: "productDetailPage", params: { productId } });
    },
  },
};
</script>

<style scoped>
/* Ensure the width of cards remains unchanged */
.v-card {
  width: 100%; /* Prevent card width from being altered by parent container scrolling */
}
</style>

<template>
  <div class="wishlist-container">
    <v-row>
      <!-- Loop through wishlist items and display each as a card -->
      <v-col v-for="(item, index) in wishlistItems" :key="index" cols="12">
        <v-card color="#1F7087" class="pa-3">
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'WishList',
  props: {
    wishlistItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    viewProduct(productId) {
      // Navigate to the product detail page with the productId
      this.$router.push({ name: 'productDetailPage', params: { productId } });
    },
  },
};
</script>

<style scoped>


/* Ensure the width of cards remains unchanged */
.v-card {
  width: 100%; /* Prevent card width from being altered by parent container scrolling */
}
</style>
