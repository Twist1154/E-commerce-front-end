<template>
  <div class="form-container" v-if="product">
    <h1>Update Product</h1>

    <!-- Stepper -->
    <v-stepper alt-labels v-model="currentStep">
      <v-stepper-header>
        <v-stepper-item
          :complete="currentStep > 1"
          title="Update Product"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :complete="currentStep > 2"
          title="Manage Subcategories"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :complete="currentStep > 3"
          title="Update Inventory"
        ></v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <!-- Step 1: Update Product Form -->
    <div v-if="currentStep === 1">
      <h2>Step 1: Update Product</h2>
      <form @submit.prevent="handleProductSubmit">
        <div class="form-group">
          <label for="imagePath">Upload Image</label>
          <input
            type="file"
            id="imagePath"
            @change="handleImageUpload"
            accept="image/*"
          />
          <div class="img-preview">
            <img
              :src="product.imagePath || 'https://placehold.co/400x400/png'"
              alt="Product Image"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="product.name" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="product.description"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            v-model.number="product.price"
            required
          />
        </div>

        <button type="submit" class="submit-button">Update Product</button>
      </form>
    </div>

    <!-- Step 2: Manage Subcategories -->
    <div v-if="currentStep === 2">
      <h2>Step 2: Manage Subcategories</h2>
      <form @submit.prevent="handleSubCategorySubmit">
        <div class="form-group">
          <label for="category">Select Category</label>
          <select id="category" v-model="selectedCategoryId" required>
            <option disabled value="">Select a category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-button">Add Subcategory</button>
      </form>

      <div class="subcategory-list" v-if="safeSubCategories.length">
        <h3>Subcategories:</h3>
        <ul>
          <li v-for="subCategory in safeSubCategories" :key="subCategory.id">
            {{ subCategory.category?.name || "Unknown Category" }}
            <button @click="initiateDelete(subCategory.id)">Delete</button>
          </li>
        </ul>
      </div>

      <div class="navigation-buttons">
        <button
          @click="nextStep"
          class="next-button"
          :disabled="!safeSubCategories.length"
        >
          Next: Update Inventory
        </button>
      </div>
    </div>

    <!-- Step 3: Update Inventory -->
    <div v-if="currentStep === 3">
      <h2>Step 3: Update Inventory</h2>
      <form @submit.prevent="handleInventorySubmit">
        <div class="form-group">
          <label for="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            id="stockQuantity"
            v-model.number="stockQuantity"
            required
            min="0"
          />
        </div>

        <div class="form-group">
          <label for="vendorLocation">Vendor Location</label>
          <input
            type="text"
            id="vendorLocation"
            v-model="vendorLocation"
            required
          />
        </div>

        <button type="submit" class="submit-button">Update Inventory</button>
      </form>
    </div>
  </div>
</template>

<script>
import { uploadFileToS3 } from "@/services/awsService";
import productsService from "@/services/productsService";
import subCategoryService from "@/services/subCategoryService";
import inventoryService from "@/services/inventoryService";
import { getAllCategories } from "@/services/categoriesService";

export default {
  name: "updateForm",
  data() {
    return {
      currentStep: 1,
      product: {},
      categories: [],
      selectedCategoryId: "",
      stockQuantity: 0,
      vendorLocation: "",
      subCategories: [],
      deleteTimeoutId: null,
    };
  },
  computed: {
    safeSubCategories() {
      return this.subCategories || [];
    },
  },
  methods: {
    async handleProductSubmit() {
      try {
        if (this.product.imageFile) {
          const uploadedImageUrl = await uploadFileToS3(this.product.imageFile);
          this.product.imagePath = uploadedImageUrl;
        }

        const response = await productsService.updateProduct(
          this.product.id,
          this.product,
        );
        this.product = response.data;
        alert("Product updated successfully!");
        this.currentStep = 2;
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
    },
    async handleSubCategorySubmit() {
      try {
        if (!this.selectedCategoryId) {
          alert("Please select a category.");
          return;
        }

        const selectedCategory = this.categories.find(
          (cat) => cat.id === this.selectedCategoryId,
        );
        const newSubCategory = {
          category: selectedCategory,
          product: { id: this.product.id },
        };

        const response =
          await subCategoryService.createSubCategory(newSubCategory);
        this.subCategories.push(response.data);
        alert("Subcategory added successfully!");
        this.selectedCategoryId = "";
      } catch (error) {
        console.error("Error adding subcategory:", error);
        alert("Failed to add subcategory. Please try again.");
      }
    },
    async initiateDelete(subCategoryId) {
      this.deleteTimeoutId = setTimeout(
        () => this.deleteSubCategory(subCategoryId),
        30000,
      );
      alert(
        "Subcategory will be deleted in 30 seconds. Click again to confirm.",
      );
    },
    async deleteSubCategory(subCategoryId) {
      try {
        await subCategoryService.deleteSubCategory(subCategoryId);
        this.subCategories = this.subCategories.filter(
          (sub) => sub.id !== subCategoryId,
        );
        alert("Subcategory deleted successfully.");
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory. Please try again.");
      }
    },
    async handleInventorySubmit() {
      try {
        const inventoryData = {
          product: { id: this.product.id },
          quantity: this.stockQuantity,
          vendorLocation: this.vendorLocation,
          lastUpdated: new Date().toISOString(),
        };
        await inventoryService.updateInventoryItem(inventoryData);
        alert("Inventory updated successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error updating inventory:", error);
        alert("Failed to update inventory. Please try again.");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.product.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.imagePath = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchCategories() {
      try {
        const response = await getAllCategories();
        this.categories = response;
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Please refresh the page.");
      }
    },
    async fetchProduct(id) {
      try {
        const response = await productsService.getProductById(id);
        this.product = response.data;
        this.fetchSubCategories();
        this.fetchInventory();
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to load product details. Please refresh the page.");
      }
    },
    async fetchSubCategories() {
      try {
        const subCategories =
          await subCategoryService.getSubCategoriesByProduct(this.product.id);
        this.subCategories = subCategories;
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        alert("Failed to load subcategories. Please try again.");
      }
    },
    async fetchInventory() {
      try {
        const inventoryItems =
          await inventoryService.getInventoryItemsByProductId(this.product.id);
        if (inventoryItems && inventoryItems.length) {
          const latestInventory = inventoryItems[0];
          this.stockQuantity = latestInventory.quantity;
          this.vendorLocation = latestInventory.vendorLocation;
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
        alert("Failed to load inventory. Please try again.");
      }
    },
    nextStep() {
      this.currentStep++;
    },
    resetForm() {
      this.product = {};
      this.subCategories = [];
      this.stockQuantity = 0;
      this.vendorLocation = "";
      this.currentStep = 1;
      this.selectedCategoryId = "";
    },
  },
  mounted() {
    this.fetchCategories();
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  text-align: center;
  color: #333;
}

h3 {
  color: #555;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.img-preview {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.img-preview img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.submit-button,
.next-button {
  display: block;
  width: 100%;
  padding: 10px 0;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.submit-button:hover,
.next-button:hover {
  background-color: #0056b3;
}

.subcategory-list {
  margin-top: 20px;
}

.subcategory-list ul {
  list-style-type: none;
  padding: 0;
}

.subcategory-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #fff;
}

.subcategory-list button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.subcategory-list button:hover {
  background-color: #c82333;
}

.navigation-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.navigation-buttons button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navigation-buttons button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.navigation-buttons button:hover:not(:disabled) {
  background-color: #218838;
}

@media screen and (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .submit-button,
  .next-button {
    font-size: 14px;
  }

  .img-preview img {
    width: 120px;
    height: 120px;
  }
}
</style>
