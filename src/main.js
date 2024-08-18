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

// Authentication check function
function isAuthenticated() {
  // Replace this with your actual authentication check logic
  return localStorage.getItem('authToken') !== null;
}

// Define routes
const routes = [
  {
    path: '/registerpage',
    name: 'registerpage',
    component: RegisterPage,
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: LoginPage,
  },
  {
    path: '/updateProductsPage',
    name: 'updateProductsPage',
    component: UpdateProductsPage,
    meta: { requiresAuth: true } // Add this to routes that require authentication
  },
  {
    path: '/updateForm/:productId',
    name: 'updateForm',
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
    meta: { requiresAuth: true }
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

// Initialize Vuetify with imported components and directives
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
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');

