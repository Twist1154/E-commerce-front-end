import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import 'vuetify/styles'; // Ensure Vuetify styles are imported

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
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ProductCard from './components/ProductCard.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faShoppingCart, faPlus, faEdit, faTags} from '@fortawesome/free-solid-svg-icons'; // Example icons

/* add icons to the library */
library.add(faShoppingCart, faPlus, faEdit,faTags);

// Authentication check function
function isAuthenticated() {
  // Replace this with your actual authentication check logic
  return localStorage.getItem('authToken') !== null;
}

// Define routes
const routes = [
  {
    path: '/product-card',
    name: 'ProductCard',
    component: ProductCard,
    meta: { requiresAuth: true } // Add this to routes that require authentication
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: LoginPage,
  },
  {
    path: '/updateProducts',
    name: 'UpdateProductsPage',
    component: UpdateProductsPage,
    meta: { requiresAuth: true } // Add this to routes that require authentication
  },
  {
    path: '/updateform/:productId',
    name: 'UpdateForm',
    component: ProductUpdateForm,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/AddProduct',
    name: 'addProduct',
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/products/:productId',
    name: 'productDetailPage',
    component: ProductDetailPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/products'
  }
];

// Initialize Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Create router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Redirect to login page if not authenticated
    next({ name: 'loginpage' });
  } else {
    next(); // Proceed to the route
  }
});

// Create and mount the app
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon); // Register FontAwesomeIcon component globally
app.use(router);
app.use(vuetify);
app.mount('#app');
