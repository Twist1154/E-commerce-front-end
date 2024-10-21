import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import { createPinia } from "pinia";
import "vuetify/styles"; // Import Vuetify styles

// Import Vuetify and necessary components/directives
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Import Material Design Icons
import "@mdi/font/css/materialdesignicons.css"; // Ensure MDI icons are available

// Import FontAwesome Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faPlus,
  faEdit,
  faTags,
  faHeart,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faShoppingCart,
  faPlus,
  faEdit,
  faTags,
  faHeart,
  faHandHoldingHeart,
);

// Import components for different pages
import OrderPage from "./pages/OrderPage.vue";
import OrderDetails from "./pages/OrderDetails.vue"; // Import OrderDetails component
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import AddProduct from "./pages/AddProduct.vue";
import ProductUpdateForm from "./pages/ProductUpdateForm.vue";
import UpdateProducts from "./pages/UpdateProducts.vue";
import PriceRange from "./pages/PriceRange.vue";
import CategorySearch from "./pages/CategorySearch.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ProductCard from "./components/ProductCard.vue";
import NotAuthorizedPage from "./pages/NotAuthorizedPage.vue";
import AdminPage from "./pages/AdminPage.vue";
import CartPage from "./pages/CartPage.vue";
import WishList from "./components/WishList.vue";
import NavigationBar from "./components/NavigationBar.vue";
import CrumbLink from "./components/CrumbLink.vue"; // Import the Crumbs component
// import PaymentPage from "./pages/PaymentPage.vue"; // Import PaymentPage component

// Import services
// import paymentService from "./services/paymentService"; // Import paymentService

// Define routes
const routes = [
  { path: "/navigation", name: "NavigationBar", component: NavigationBar },
  { path: "/wishlist", name: "WishList", component: WishList },
  {
    path: "/products/:productId",
    name: "productDetailPage",
    component: ProductDetailPage,
    props: true,
  }, // Product Detail with productId passed as prop
  { path: "/productcard", name: "ProductCard", component: ProductCard },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/loginpage", name: "loginpage", component: LoginPage },
  {
    path: "/updateProducts",
    name: "UpdateProducts",
    component: UpdateProducts,
  },
  {
    path: "/updateform/:id",
    name: "UpdateForm",
    component: ProductUpdateForm,
    props: true,
  },
  { path: "/products", name: "products", component: ProductsPage },
  { path: "/cart", name: "cart", component: ShoppingCartPage },
  { path: "/AddProduct", name: "addProduct", component: AddProduct },
  {
    path: "/CategorySearch",
    name: "categorySearch",
    component: CategorySearch,
  },
  { path: "/PriceRange", name: "priceRange", component: PriceRange },
  { path: "/cart", name: "cart", component: CartPage },
  {
    path: "/not-authorized",
    name: "notAuthorized",
    component: NotAuthorizedPage,
  },
  { path: "/Admin", name: "admin", component: AdminPage },
  { path: "/orderDetails/:id", name: "orderDetails", component: OrderDetails }, // Order Details with ID passed as prop
  { path: "/orders", name: "orders", component: OrderPage },
  // { path: "/payment", name: "payment", component: PaymentPage }, // Add PaymentPage route
  { path: "/", redirect: "/products" },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(), // Removed the incorrect `process.env.BASE_URL` parameter
  routes,
});

// Uncommented utility functions for authentication
function getUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

function isAuthenticated() {
  const user = getUser();
  return user && user.authToken;
}

function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticatedUser = isAuthenticated();
  const userRole = getUserRole();

  console.log("isAuthenticatedUser:", isAuthenticatedUser);
  console.log("userRole:", userRole);

  if (to.meta.requiresAuth && !isAuthenticatedUser) {
    next({ name: "loginpage" });
  } else if (to.meta.role && to.meta.role !== userRole) {
    next({ name: "notAuthorized" });
  } else {
    next();
  }
});

// Create and configure Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Create and mount the app
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(vuetify);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon); // Register FontAwesome component globally

// Register the Crumbs component globally if needed
app.component("CrumbLink", CrumbLink);

app.mount("#app");

// src/services/paymentService.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8080/store/payments";

// const paymentService = {
//   // Create a new payment
//   createPayment(payment) {
//     console.log("Creating payment:", payment);
//     return axios
//       .post(`${BASE_URL}/create`, payment)
//       .then((response) => {
//         console.log("Payment created successfully:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error("Error creating payment:", error);
//         throw error;
//       });
//   },

//   // Get payment by ID
//   getPaymentById(id) {
//     console.log(`Fetching payment with ID: ${id}`);
//     return axios
//       .get(`${BASE_URL}/read/${id}`)
//       .then((response) => {
//         console.log("Payment fetched successfully:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error(`Error fetching payment with ID ${id}:`, error);
//         throw error;
//       });
//   },

//   // Update a payment
//   updatePayment(payment) {
//     console.log("Updating payment:", payment);
//     return axios
//       .put(`${BASE_URL}/update`, payment)
//       .then((response) => {
//         console.log("Payment updated successfully:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error("Error updating payment:", error);
//         throw error;
//       });
//   },

//   // Delete a payment by ID
//   deletePayment(id) {
//     console.log(`Deleting payment with ID: ${id}`);
//     return axios
//       .delete(`${BASE_URL}/delete/${id}`)
//       .then((response) => {
//         console.log("Payment deleted successfully:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error(`Error deleting payment with ID ${id}:`, error);
//         throw error;
//       });
//   },

//   // Get all payments
//   getAllPayments() {
//     console.log("Fetching all payments");
//     return axios
//       .get(`${BASE_URL}/all`)
//       .then((response) => {
//         console.log("All payments fetched successfully:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error("Error fetching all payments:", error);
//         throw error;
//       });
//   },

//   // Get payments by status
//   findPaymentsByStatus(status) {
//     console.log(`Finding payments with status: ${status}`);
//     return axios
//       .get(`${BASE_URL}/status/${status}`)
//       .then((response) => {
//         console.log("Payments fetched successfully by status:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error(`Error fetching payments with status ${status}:`, error);
//         throw error;
//       });
//   },

//   // Get payments by user ID
//   findPaymentsByUserId(userId) {
//     console.log(`Finding payments with user ID: ${userId}`);
//     return axios
//       .get(`${BASE_URL}/user/${userId}`)
//       .then((response) => {
//         console.log("Payments fetched successfully for user:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error(`Error fetching payments with user ID ${userId}:`, error);
//         throw error;
//       });
//   },

//   // Get payments by cart ID
//   findPaymentsByCartId(cartId) {
//     console.log(`Finding payments with cart ID: ${cartId}`);
//     return axios
//       .get(`${BASE_URL}/cart/${cartId}`)
//       .then((response) => {
//         console.log("Payments fetched successfully for cart:", response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error(`Error fetching payments with cart ID ${cartId}:`, error);
//         throw error;
//       });
//   },
// };

// export default paymentService;
