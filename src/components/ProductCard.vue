<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-badge
      v-bind="props"
      :content="isHovering ? 'Stock' : stockQuantity"
      color="blue"
      overlap
    >
      <v-card class="mx-auto" max-width="200">
        <v-img class="align-end text-white" height="200" :src="imagePath" cover></v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text class="pt-1">
          <div class="d-flex flex-column align-center justify-center">
            <v-rating
              v-model="rating"
              density="default"
              background-color="yellow"
              color="amber"
              class="ma-1"
            ></v-rating>
          </div>
          <div><h3>R{{ price }}</h3></div>
          <div>
            <h4>
              {{ subCategories && subCategories.length > 0 ? subCategories.map((subCategory) => subCategory.name).join(', ') : 'No Subcategories' }}
              <font-awesome-icon :icon="['fas', 'tags']" />
            </h4>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green" @click="$emit('view-details', productId)"><h3>View</h3></v-btn>
          <v-btn color="blue" @click="$emit('add-to-cart', productId)">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
import inventoryService from '@/services/inventoryService'; // Adjust the path according to your project structure

export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subCategories: {
      type: Array, // Ensure subCategories is an array
      required: false, // Mark as optional to handle cases when it's not provided
      default: () => [], // Default to an empty array
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rating: 4.5, // Static rating, can be dynamic if needed
      stockQuantity: 0, // Initialize stock quantity
    };
  },
  mounted() {
    this.fetchStockQuantity(); // Call function to fetch stock quantity when component is mounted
  },
  methods: {
    async fetchStockQuantity() {
      try {
        // Fetching the inventory using the service
        const response = await inventoryService.getStockByProductId(this.productId);
        
        // Check if response contains data and extract the quantity
        if (response.length > 0) {
          this.stockQuantity = response[0].quantity; // Extract the quantity from the first item in the array
        } else {
          this.stockQuantity = 0; // Set to 0 if no stock information is found
        }
      } catch (error) {
        console.error("Error fetching stock quantity:", error);
        this.stockQuantity = 0; // Set to 0 or handle the error as needed
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
