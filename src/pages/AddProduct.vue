<template>
  <div class="form-container">
    <h1>Add Product</h1>
    <form @submit.prevent="handleSubmit">
  
      <div class="form-group">
        <label for="imagePath">Upload Image</label>
        <input type="file" id="imagePath" @change="handleImageUpload" />
        <div class="img-preview" v-if="product.imagePath">
          <img :src="product.imagePath" alt="Product Image" />
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
          <input type="number" id="stockQuantity" v-model="product.stockQuantity" required />
        </div>
      </div>
      <div class="form-group">
        <label for="categoryId">Category</label>
        <select id="categoryId" v-model="product.categoryId" required>
          <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="submit-button">Create</button>
    </form>
  </div>
</template>

<script>
import { getAllCategories } from '@/services/categoriesService'; // Import the service functions
import productsService from '@/services/productsService'; // Adjust the path as necessary


export default {
  name: "ProductForm",
  data() {
    return {
      product: {
        productId: '',
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        imagePath: '',
        createdAt: '',
        updatedAt: ''
      },
      categories: []
    };
  },
  methods: {
    resetForm() {
    // Reset each property of the product object individually
    this.$set(this.product, 'productId', '');
    this.$set(this.product, 'name', '');
    this.$set(this.product, 'description', '');
    this.$set(this.product, 'price', '');
    this.$set(this.product, 'stockQuantity', '');
    this.$set(this.product, 'categoryId', '');
    this.$set(this.product, 'imagePath', '');
    this.$set(this.product, 'createdAt', '');
    this.$set(this.product, 'updatedAt', '');
  },
    async handleSubmit() {
      try {
        this.setCreationDate();
        this.setUpdateDate();
        console.log(this.product);
        // Create new product
        const response = await productsService.createProduct(this.product);
        console.log('Product saved:', response);

        // Show success message
      alert('Product added successfully!');
      // Clear the form by resetting the product object
      this.resetForm();

      
      } catch (error) {
        console.error('Error during product creation:', error);
        // Optionally, show an error message to the user
      }
    },
    handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    const image = new Image();

    reader.onload = (e) => {
      image.src = e.target.result;
    };

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const MAX_WIDTH = 800; // Set your max width
      const MAX_HEIGHT = 800; // Set your max height
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
      this.product.imagePath = canvas.toDataURL('image/jpeg');
    };

    reader.readAsDataURL(file);
  }
}
,
    generateProductId() {
      this.product.productId = 0; // Generate a random product ID because on my server side the product ID autoincre
    },
    async fetchCategories() {
      try {
        const response = await getAllCategories(); // Fetch categories from the backend
        console.log('Fetched categories:', response);
        this.categories = response;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    setCreationDate() {
      this.product.createdAt = new Date().toISOString(); // Set the creation date to current date
    },
    setUpdateDate() {
      this.product.updatedAt = new Date().toISOString(); // Set the update date to current date
    }
  },
  mounted() {
    this.generateProductId(); // This generates a product ID when the component is mounted
    this.fetchCategories(); // Fetches categories when the component is mounted
  }
}
</script>

<style scoped>
.form-container {
  max-width: auto;
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
  display: flex;
  justify-content: space-between;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
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
  background-color: #0631f0;
}

.submit-button:hover {
  background-color: #4cae4c;
}
</style>
