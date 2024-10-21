<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-badge
      v-bind="props"
      :content="isHovering ? 'Stock' : inventoryItem.quantity"
      color="blue"
      overlap
    >
      <v-card class="mx-auto" max-width="250" @click="viewDetails(product.id)">
        <!-- Image and product title -->
        <v-img
          class="align-end text-white"
          height="200"
          :src="product.imagePath"
          cover
        ></v-img>
        <v-card-text>{{ product.name }}</v-card-text>

        <!-- Card content -->
        <v-card-text class="pt-1">
          <!-- Show progress while loading -->
          <div v-if="isLoading">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>

          <!-- Show product details -->
          <div v-else>
            <!-- Product price -->
            <div>
              <h3>R{{ product.price }}</h3>
            </div>

            <!-- Subcategories of the product -->
            <div>
              <h4>
                {{
                  subCategories.length > 0
                    ? subCategories
                        .map((subCategory) => subCategory.category.name)
                        .join(", ")
                    : "No Subcategories"
                }}
                <font-awesome-icon :icon="['fas', 'tags']" />
              </h4>
            </div>
          </div>
        </v-card-text>

        <!-- Card actions for adding to wishlist -->
        <v-card-actions>
          <v-btn color="blue" @click.stop="addToWishlist(product.id)">
            <!-- Prevent click event from bubbling up -->
            <font-awesome-icon :icon="['fasds', 'hand-holding-heart']" />
            <span>Add to Wishlist</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-badge>
  </v-hover>
</template>

<script>
import subCategoryService from "@/services/subCategoryService";

export default {
  name: "ProductCard",
  emits: ["add-to-wishlist", "view-details"], // Declare emitted event
  props: {
    product: {
      type: Object,
      required: true,
    },
    inventoryItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      subCategories: [], // Subcategories for the product
      isLoading: true, // Loading state
    };
  },
  mounted() {
    this.fetchData(); // Fetch data on mount
  },
  methods: {
    // Fetch all related data (stock, subcategories)
    async fetchData() {
      await this.fetchSubCategories();
      this.isLoading = false; // Stop loading after data fetch
    },

    // Add product to wishlist
    addToWishlist(productId) {
      this.$emit("add-to-wishlist", productId); // Emit the event to parent component
    },

    // Emit event to view product details
    viewDetails(productId) {
      this.$emit("view-details", productId); // Emit the event to parent component
    },

    // Fetch subcategories associated with the product
    async fetchSubCategories() {
      try {
        const response = await subCategoryService.getSubCategoriesByProduct(
          this.product.id,
        );
        console.log("Subcategories fetched successfully:", response); // Log fetched subcategories

        if (response && response.length > 0) {
          this.subCategories = response; // Set fetched subcategories
        } else {
          this.subCategories = []; // No subcategories found
          console.log("No subcategories found for the product");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        this.subCategories = []; // Handle error by setting empty array
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles needed for the ProductCard here */
</style>
