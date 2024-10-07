<template>
  <div class="form-container">
    <h1>Add Product</h1>

    <!-- Step 1: Product Creation Form -->
    <div v-if="currentStep === 1">
      <h2>Step 1: Add Product</h2>
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
          <textarea id="description" v-model="product.description" required></textarea>
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

        <button type="submit" class="submit-button">Create Product</button>
      </form>
    </div>

    <!-- Step 2: Add Subcategories -->
    <div v-if="currentStep === 2">
      <h2>Step 2: Add Subcategories</h2>
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
        <h3>Subcategories Added:</h3>
        <ul>
          <li v-for="subCategory in safeSubCategories" :key="subCategory.id">
            {{ subCategory.category?.name || "Unknown Category" }}
          </li>
        </ul>
      </div>

      <div class="navigation-buttons">
        <button
          @click="nextStep"
          class="next-button"
          :disabled="!safeSubCategories.length"
        >
          Next: Add Inventory
        </button>
      </div>
    </div>

    <!-- Step 3: Inventory Management -->
    <div v-if="currentStep === 3">
      <h2>Step 3: Add Inventory</h2>
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
          <input type="text" id="vendorLocation" v-model="vendorLocation" required />
        </div>

        <button type="submit" class="submit-button">Create Inventory and Complete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { uploadFileToS3 } from "@/services/awsService";
import { getAllCategories } from "@/services/categoriesService";
import productsService from "@/services/productsService";
import subCategoryService from "@/services/subCategoryService";
import inventoryService from "@/services/inventoryService";

export default {
  name: "ProductForm",
  data() {
    return {
      currentStep: 1,
      product: {
        name: "",
        description: "",
        price: 0,
        imagePath: "",
        imageFile: null,
      },
      categories: [],
      selectedCategoryId: "", // Holds the selected category ID
      stockQuantity: 0,
      vendorLocation: "",
      subCategories: [], // Separate array for subcategories
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

        // Create the product on the backend
        const response = await productsService.createProduct(this.product);
        this.product = response.data; // Update product with response (includes ID)

        alert("Product created successfully!");
        this.currentStep = 2; // Move to the next step
      } catch (error) {
        console.error("Error during product creation:", error);
        alert("Failed to create product. Please try again.");
      }
    },
    async handleSubCategorySubmit() {
      try {
        if (!this.selectedCategoryId) {
          alert("Please select a category.");
          return;
        }

        const selectedCategory = this.categories.find(
          (cat) => cat.id === this.selectedCategoryId
        );

        // Create the subcategory DTO
        const newSubCategory = {
          id: null,
          category: selectedCategory, // Ensure the category object is included
          product: { id: this.product.id }, // Send only the product ID
        };

        const createdSubCategory = await subCategoryService.createSubCategory(
          newSubCategory
        );

        // **Manually attach the category object to the createdSubCategory**
        const subCategoryWithCategory = {
          ...createdSubCategory,
          category: selectedCategory, // Attach the category object
        };

        this.subCategories.push(subCategoryWithCategory); // Add to the local subCategories array

        alert("Subcategory added successfully!");

        this.selectedCategoryId = ""; // Reset the selected category
      } catch (error) {
        console.error("Error adding subcategory:", error);
        alert("Failed to add subcategory. Please try again.");
      }
    },
    async handleInventorySubmit() {
      try {
        const inventoryData = {
          product: {
            id: this.product.id, // Include the product object with its ID
          },
          quantity: this.stockQuantity,
          vendorLocation: this.vendorLocation,
          lastUpdated: new Date().toISOString(),
        };

        await inventoryService.createInventoryItem(inventoryData); // Send the updated inventoryData

        alert("Inventory created successfully!");
        this.resetForm();
        this.currentStep = 1;
      } catch (error) {
        console.error("Error creating inventory:", error);
        alert("Failed to create inventory. Please try again.");
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
    nextStep() {
      this.currentStep++;
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
        price: 0,
        imagePath: "",
        imageFile: null,
      };
      this.subCategories = [];
      this.stockQuantity = 0;
      this.vendorLocation = "";
      this.currentStep = 1;
      this.selectedCategoryId = "";
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "N/A";
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group select,
.form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.img-preview {
  margin-top: 10px;
  text-align: center;
}

.img-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.submit-button,
.next-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.submit-button:hover,
.next-button:hover {
  background-color: #0056b3;
}

.subcategory-list {
  margin-top: 25px;
}

.subcategory-list ul {
  list-style-type: disc;
  padding-left: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.navigation-buttons .next-button {
  width: 48%;
}
</style>
