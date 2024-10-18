import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:8080/store/users';

// Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userService = {
  // Create a new user
  createUser(user) {
    return apiClient.post('/create', user)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating user:', error);
        throw error;
      });
  },

  // Get a user by ID
  getUserById(id) {
    return apiClient.get(`/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
      });
  },

  // Update a user by ID
  updateUser(id, user) {
    return apiClient.put(`/${id}`, user)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
      });
  },

  // Delete a user by ID
  deleteUser(id) {
    return apiClient.delete(`/${id}`)
      .then(() => {})
      .catch(error => {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
      });
  },

  // Get all users
  getAllUsers() {
    return apiClient.get('/')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching all users:', error);
        throw error;
      });
  },

  // Get users by username
  getUsersByUsername(username) {
    return apiClient.get(`/username/${username}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching users with username ${username}:`, error);
        throw error;
      });
  },

  // Get users by email
  getUsersByEmail(email) {
    return apiClient.get(`/email/${email}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching users with email ${email}:`, error);
        throw error;
      });
  },

  // Get users by last name
  getUsersByLastName(lastName) {
    return apiClient.get(`/lastname/${lastName}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching users with last name ${lastName}:`, error);
        throw error;
      });
  },

  // Get users created after a specific date
  getUsersCreatedAfter(createdAt) {
    return apiClient.get(`/createdAfter/${createdAt}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching users created after ${createdAt}:`, error);
        throw error;
      });
  },

  // Validate user credentials
  validateUser(email, password) {
    return apiClient.post('/validate', {
      email: email,
      password: password
    })
    .then(response => {
      return response.data;  // User is valid
    })
    .catch(error => {
      console.error('Error validating user:', error.response ? error.response.data : error.message);
      
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid email or password");
      }
      
      throw error;
    });
  }
  
  
  



};

export default userService;
