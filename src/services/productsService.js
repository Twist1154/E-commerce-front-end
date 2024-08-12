import axios from 'axios';

const BASE_URL = 'http://localhost:8080/store/product';

const productsService = {
  // Create a new product
  createProduct(product) {
    return axios.post(`${BASE_URL}/create`, product);
  },

  // Read product by ID
  getProductById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  },

  // Update existing product
  updateProduct(id, product) {
    return axios.put(`${BASE_URL}/${id}`, product);
  },

  // Delete product by ID
  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  },

  // Get all products
  getAllProducts() {
    return axios.get(`${BASE_URL}/getAll`);
  },

  // Find products by name
  findProductByName(name) {
    return axios.get(`${BASE_URL}/name/${name}`);
  },

  // Find products by category ID
  findProductByCategoryId(categoryId) {
    return axios.get(`${BASE_URL}/category/${categoryId}`);
  },

  // Find products by stock quantity
  findProductByStockQuantity(stockQuantity) {
    return axios.get(`${BASE_URL}/stock`, { params: { stockQuantity } });
  },

  // Find products created after a certain date
  findProductCreatedAfter(date) {
    return axios.get(`${BASE_URL}/created-after`, { params: { createdAt: date } });
  },

  // Find products updated before a certain date
  findProductUpdatedBefore(date) {
    return axios.get(`${BASE_URL}/updated-before`, { params: { updatedAt: date } });
  },

  // Find products by price range
  findProductByPriceRange(minPrice, maxPrice) {
    return axios.get(`${BASE_URL}/price`, { params: { minPrice, maxPrice } });
  }
};

export default productsService;
