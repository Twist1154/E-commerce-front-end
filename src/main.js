import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';

// Import Vuetify and necessary components/directives
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import components for different pages
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import AddProduct from './pages/AddProduct.vue';
import ProductUpdateForm from './pages/ProductUpdateForm.vue';
import UpdateProductsPage from './pages/UpdateProductsPage.vue';
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'

// Define routes
// This array contains all the route definitions for the application.
const routes = [
  {
    path: '/updateProductsPage', // Path to the page where products can be updated
    name: 'updateProductsPage',
    component: UpdateProductsPage,
  },
  {
    path: '/updateForm/:productId', // Path to the form for updating a specific product
    name: 'updateForm',
    component: ProductUpdateForm,
    props: true // This ensures that route params (e.g., productId) are passed as props to the component
  },
  {
    path: '/cart', // Path to the shopping cart page
    name: 'cart',
    component: ShoppingCartPage,
  },
  {
    path: '/AddProduct', // Path to the page for adding a new product
    name: 'addProduct',
    component: AddProduct,
  },
  {
    path: '/products', // Path to the products page that lists all products
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/products/:productId', // Path to the product detail page for a specific product
    name: 'productDetailPage',
    component: ProductDetailPage,
    props: true // This ensures that route params (e.g., productId) are passed as props to the component
  },
  {
    path: '/', // Root path of the application
    redirect: '/products' // Redirects the root path to the products page
  }
];

// Initialize Vuetify with imported components and directives
const vuetify = createVuetify({
  components,
  directives,
});

// Create router instance
// This function creates a Vue Router instance that handles navigation between the routes defined above.
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL), // Enables history mode for clean URLs
  routes, // Pass the defined routes to the router instance
});

// Create and mount the app
// This function initializes the Vue app, applies the router and Vuetify, and mounts the app to the HTML element with the ID "app".
createApp(App)
  .use(router) // Integrates the Vue Router with the app
  .use(vuetify) // Integrates Vuetify with the app for UI components and styling
  .mount('#app'); // Mounts the app to the DOM
