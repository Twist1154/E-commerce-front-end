<template>
  <div class="form-container" v-if="product">
    <!-- Conditionally render the form when product is defined -->
    <h1>Update Product</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="imagePath">Upload Image</label>
        <input type="file" id="imagePath" @change="handleImageUpload" />
        <div class="img-preview">
          <!-- Use optional chaining to safely access imagePath -->
          <img :src="product?.imagePath || placeholderImage" alt="Product Image" />
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

      <div class="form-row">
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" step="0.01" id="price" v-model="product.price" required />
        </div>
        <div class="form-group">
          <label for="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            id="stockQuantity"
            v-model="product.stockQuantity"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="categoryId">Category</label>
        <select id="categoryId" v-model="product.categoryId" required>
          <option
            v-for="category in categories"
            :key="category.categoryId"
            :value="category.categoryId"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-row">
        <!-- Button to update the product -->
        <button type="submit" class="submit-button">Update</button>
        <!-- Back Button -->
        <button class="back-button" @click="goBack">
          <img :src="backIcon" alt="Back Icon" />
        </button>
        <!-- Button to delete the product -->
        <button type="button" class="delete-button" @click="deleteProduct">
          <img :src="deleted" alt="delete Icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadFileToS3 } from "@/services/awsService";
import productsService from "@/services/productsService";
import { getAllCategories } from "@/services/categoriesService";
import deleted from "@/assets/deleted.svg";
import backIcon from "@/assets/back.svg";

export default {
  name: "updateForm",
  data() {
    return {
      product: {
        productId: "",
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        imagePath: "",
        createdAt: "",
        updatedAt: "",
      },
      categories: [],
      placeholderImage: "https://placehold.co/400x400/png",
      deleted,
      backIcon,
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "updateProductsPage" }); // Navigate to the updateProductsPage
    },
    resetForm() {
      this.product = {
        productId: "",
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        imagePath: "",
        createdAt: "",
        updatedAt: "",
      };
    },
    async handleSubmit() {
      try {
        this.setUpdateDate();

        if (this.product.imageFile) {
          const file = this.product.imageFile;
          const uploadedImageUrl = await uploadFileToS3(file);
          this.product.imagePath = uploadedImageUrl;
        }

        // Update the product using the specified method
        const response = await productsService.updateProduct(
          this.product.productId,
          this.product
        );
        this.product = response.data; // Update the product data with the response from the backend

        console.log("Product updated:", this.product);
        alert("Product updated successfully!");
        this.resetForm(); // Reset the form after a successful update
      } catch (error) {
        console.error("Error during product update:", error);
        alert("There was an error updating the product. Please try again.");
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
    async fetchProduct(productId) {
      try {
        // Fetch product details using the provided method
        const response = await productsService.getProductById(productId);
        this.product = response.data; // Update the product data with the response from the backend

        await this.fetchCategories(); // Fetch categories after product data is available

        // Ensure the categoryId is set
        this.product.categoryId = this.product.categoryId || "";
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await getAllCategories();
        this.categories = response || []; // Ensure categories is an array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    setUpdateDate() {
      this.product.updatedAt = new Date().toISOString();
    },
    async deleteProduct() {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          const response = await productsService.deleteProduct(this.product.productId);
          console.log("Product deleted successfully:", response);
          alert("Product deleted successfully!");
          this.$router.push({ name: "updateProductsPage" });
        } catch (error) {
          console.error(
            `Error deleting product with ID ${this.product.productId}:`,
            error.response || error.message || error
          );
          alert("There was an error deleting the product. Please try again.");
        }
      }
    },
  },
  async mounted() {
    const productId = this.$route.params.productId;
    await this.fetchProduct(productId); // Fetch the product details using the productId
  },
};
</script>

<!---------------------------------------------------------------------------------------------------------------->

<style scoped>
.form-container {
  max-width: 70%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  background-color: aqua;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 70%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.img-preview {
  margin-top: 10px;
  text-align: center;
}

.img-preview img {
  max-width: 100%;
  height: auto;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  background-color: #162836;
}

.submit-button:hover {
  background-color: #C8915F;
}


.back-button {
  background-color: #413f3f; /* Red background for  back button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.back-button img {
  width: 24px; /* Adjust the size as needed */
  height: 24px;
}

.delete-button {
  background-color: #e74c3c; /* Red background for delete button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.delete-button img {
  width: 24px; /* Adjust icon size */
  height: 24px;
}

.delete-button:hover {
  background-color: #c0392b; /* Darker red on hover */
}
</style>
