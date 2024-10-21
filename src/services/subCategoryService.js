import axios from "axios";

// Base URL for SubCategoryController API
const BASE_URL = "http://localhost:8080/store/subcategory";

const subCategoryService = {
  // Create a new subcategory
  createSubCategory(subCategory) {
    console.log("Subcategory being sent to backend:", subCategory);
    return axios
      .post(`${BASE_URL}/create`, subCategory)
      .then((response) => {
        console.log("Created Subcategory:", response.data); // Log created subcategory
        return response;
      })
      .catch((error) => {
        console.error("Error creating subcategory:", error);
        throw error;
      });
  },

  // Read subcategory by ID
  getSubCategoryById(id) {
    return axios
      .get(`${BASE_URL}/${id}`)
      .then((response) => {
        console.log(`Fetched Subcategory with ID ${id}:`, response.data); // Log subcategory fetched by ID
        return response;
      })
      .catch((error) => {
        console.error(`Error fetching subcategory with ID ${id}:`, error);
        throw error;
      });
  },

  // Update existing subcategory
  updateSubCategory(id, subCategory) {
    return axios
      .put(`${BASE_URL}/update/${id}`, subCategory)
      .then((response) => {
        console.log(`Updated Subcategory with ID ${id}:`, response.data); // Log updated subcategory data
        return response;
      })
      .catch((error) => {
        console.error(`Error updating subcategory with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete subcategory by ID
  deleteSubCategory(id) {
    return axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((response) => {
        console.log(`Deleted Subcategory with ID ${id}:`, response.data); // Log the response after deletion
        return response;
      })
      .catch((error) => {
        console.error(
          `Error deleting subcategory with ID ${id}:`,
          error.response || error.message || error,
        );
        throw error;
      });
  },

  // Get all subcategories
  getAllSubCategories() {
    return axios
      .get(`${BASE_URL}/getAll`)
      .then((response) => {
        console.log("Fetched All Subcategories:", response.data); // Log all subcategories
        return response;
      })
      .catch((error) => {
        console.error("Error fetching all subcategories:", error);
        throw error;
      });
  },

  // Get subcategories by product ID
  getSubCategoriesByProduct(id) {
    return axios
      .get(`${BASE_URL}/getByProduct/${id}`)
      .then((response) => {
        console.log(
          `Fetched Subcategories for Product ID ${id}:`,
          response.data,
        ); // Log subcategories for the product
        return response.data;
      })
      .catch((error) => {
        console.error(
          `Error fetching subcategories for product ID ${id}:`,
          error,
        );
        throw error;
      });
  },

  // Get subcategories by category ID
  getSubCategoriesByCategory(id) {
    return axios
      .get(`${BASE_URL}/getByCategory/${id}`)
      .then((response) => {
        console.log(
          `Fetched Subcategories for Category ID ${id}:`,
          response.data,
        ); // Log subcategories for the category
        return response.data;
      })
      .catch((error) => {
        console.error(
          `Error fetching subcategories for category ID ${id}:`,
          error,
        );
        throw error;
      });
  },
};

export default subCategoryService;
