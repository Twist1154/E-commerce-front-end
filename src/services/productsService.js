import axios from 'axios';

const BASE_URL = 'http://localhost:8080/store/product';

const productsService = {
  // Create a new product
  createProduct(product) {
    return axios.post(`${BASE_URL}/create`, product)
      .then(response => response)
      .catch(error => {
        console.error('Error creating product:', error);
        throw error;
      });
  },

  // Read product by ID
  getProductById(id) {
    return axios.get(`${BASE_URL}/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      });
  },
  //needs some attention 
  // Update existing product
  updateProduct(id, product) {
    return axios.put(`${BASE_URL}/update/${id}`, product)
      .then(response => response)
      .catch(error => {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete product by ID
  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/delete/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error deleting product with ID ${id}:`, error.response || error.message || error);
        throw error;
      });
  },

  // Get all products
  getAllProducts() {
    return axios.get(`${BASE_URL}/getAll`)
      .then(response => response)
      .catch(error => {
        console.error('Error fetching all products:', error);
        throw error;
      });
  },

  // Find products by name
  findProductByName(name) {
    return axios.get(`${BASE_URL}/name/${name}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching product with name ${name}:`, error);
        throw error;
      });
  },

  // Find products by category ID
  findProductByCategoryId(categoryId) {
    return axios.get(`${BASE_URL}/category/${categoryId}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching products with category ID ${categoryId}:`, error);
        throw error;
      });
  },

  // Find products by stock quantity
  findProductByStockQuantity(stockQuantity) {
    return axios.get(`${BASE_URL}/stock`, { params: { stockQuantity } })
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching products with stock quantity ${stockQuantity}:`, error);
        throw error;
      });
  },

  // Find products created after a certain date
  findProductCreatedAfter(date) {
    return axios.get(`${BASE_URL}/created-after`, { params: { createdAt: date } })
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching products created after ${date}:`, error);
        throw error;
      });
  },

  // Find products updated before a certain date
  findProductUpdatedBefore(date) {
    return axios.get(`${BASE_URL}/updated-before`, { params: { updatedAt: date } })
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching products updated before ${date}:`, error);
        throw error;
      });
  },

  // Find products by price range
  findProductByPriceRange(minPrice, maxPrice) {
    return axios.get(`${BASE_URL}/price`, { params: { minPrice, maxPrice } })
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching products within price range ${minPrice} - ${maxPrice}:`, error);
        throw error;
      });
  }
};

export default productsService;
