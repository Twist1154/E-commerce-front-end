import axios from 'axios';

const BASE_URL = 'http://localhost:8080/store/product';

const productsService = {
  // Create a new product
  createProduct(product) {
    console.log('Creating product:', product);
    return axios.post(`${BASE_URL}/create`, product)
      .then(response => {
        console.log('Product created successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error creating product:', error);
        throw error;
      });
  },

  // Read product by ID
  getProductById(id) {
    console.log(`Fetching product with ID: ${id}`);
    return axios.get(`${BASE_URL}/get/${id}`)
      .then(response => {
        console.log('Product fetched successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      });
  },

  // Update existing product
  updateProduct(id, product) {
    console.log(`Updating product with ID: ${id}`, product);
    return axios.put(`${BASE_URL}/update/${id}`, product)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete product by ID
  deleteProduct(id) {
    console.log(`Deleting product with ID: ${id}`);
    return axios.delete(`${BASE_URL}/delete/${id}`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error deleting product with ID ${id}:`, error.response || error.message || error);
        throw error;
      });
  },

  // Get all products
  getAllProducts() {
    console.log('Fetching all products');
    return axios.get(`${BASE_URL}/getAll`)
      .then(response => {
        console.log('All products fetched successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error fetching all products:', error);
        throw error;
      });
  },

  // Find products by name
  findProductByName(name) {
    console.log(`Finding product with name: ${name}`);
    return axios.get(`${BASE_URL}/name/${name}`)
      .then(response => {
        console.log('Product found successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching product with name ${name}:`, error);
        throw error;
      });
  },

  // Find products by category ID
  findProductByCategoryId(categoryId) {
    console.log(`Finding products with category ID: ${categoryId}`);
    return axios.get(`${BASE_URL}/category/${categoryId}`)
      .then(response => {
        console.log('Products fetched successfully for category:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching products with category ID ${categoryId}:`, error);
        throw error;
      });
  },

  // Find products by stock quantity
  findProductByStockQuantity(stockQuantity) {
    console.log(`Finding products with stock quantity: ${stockQuantity}`);
    return axios.get(`${BASE_URL}/stock`, { params: { stockQuantity } })
      .then(response => {
        console.log('Products fetched successfully by stock quantity:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching products with stock quantity ${stockQuantity}:`, error);
        throw error;
      });
  },

  // Find products created after a certain date
  findProductCreatedAfter(date) {
    console.log(`Finding products created after: ${date}`);
    return axios.get(`${BASE_URL}/created-after`, { params: { createdAt: date } })
      .then(response => {
        console.log('Products fetched successfully created after:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching products created after ${date}:`, error);
        throw error;
      });
  },

  // Find products updated before a certain date
  findProductUpdatedBefore(date) {
    console.log(`Finding products updated before: ${date}`);
    return axios.get(`${BASE_URL}/updated-before`, { params: { updatedAt: date } })
      .then(response => {
        console.log('Products fetched successfully updated before:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching products updated before ${date}:`, error);
        throw error;
      });
  },

  // Find products by price range
  findProductByPriceRange(minPrice, maxPrice) {
    console.log(`Finding products within price range: ${minPrice} - ${maxPrice}`);
    return axios.get(`${BASE_URL}/price`, { params: { minPrice, maxPrice } })
      .then(response => {
        console.log('Products fetched successfully within price range:', response.data);
        return response;
      })
      .catch(error => {
        console.error(`Error fetching products within price range ${minPrice} - ${maxPrice}:`, error);
        throw error;
      });
  }
};

export default productsService;
