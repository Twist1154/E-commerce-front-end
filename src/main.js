import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import 'vuetify/styles'; // Import Vuetify styles

// Import Vuetify and necessary components/directives
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import Material Design Icons
import '@mdi/font/css/materialdesignicons.css'; // Ensure MDI icons are available

// Import FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingCart, faPlus, faEdit, faTags } from '@fortawesome/free-solid-svg-icons';
library.add(faShoppingCart, faPlus, faEdit, faTags);

// Import components for different pages
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import AddProduct from './pages/AddProduct.vue';
import ProductUpdateForm from './pages/ProductUpdateForm.vue';
import UpdateProductsPage from './pages/UpdateProductsPage.vue';
import PriceRange from './pages/PriceRange.vue';
import CategorySearch from './pages/CategorySearch.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ProductCard from './components/ProductCard.vue';
import NotAuthorizedPage from './pages/NotAuthorizedPage.vue';
import AdminPage from './pages/AdminPage.vue';
import CartPage from './pages/CartPage.vue';

// Utility functions for user authentication
// function getUser() {
//   const user = localStorage.getItem('currentUser');
//   return user ? JSON.parse(user) : null;
// }

// function isAuthenticated() {
//   const user = getUser();
//   return user && user.authToken;
// }

// function getUserRole() {
//   const user = getUser();
//   return user ? user.role : null;
// }

// Define routes
const routes = [
  { path: '/productcard', name: 'ProductCard', component: ProductCard },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/loginpage', name: 'loginpage', component: LoginPage },
  { path: '/updateProducts', name: 'UpdateProductsPage', component: UpdateProductsPage },
  { path: '/updateform/:productId', name: 'UpdateForm', component: ProductUpdateForm, props: true },
  { path: '/cart', name: 'cart', component: ShoppingCartPage },
  { path: '/AddProduct', name: 'addProduct', component: AddProduct },
  { path: '/CategorySearch', name: 'categorySearch', component: CategorySearch },
  { path: '/PriceRange', name: 'priceRange', component: PriceRange },
  { path: '/products', name: 'products', component: ProductsPage },
  { path: '/cart', name: 'cart', component: CartPage },
  {
    path: '/products/:productId',
    name: 'productDetailPage',
    component: ProductDetailPage,
    props: true,
    meta: { requiresAuth: true, role: 'customer' },
  },
  { path: '/not-authorized', name: 'notAuthorized', component: NotAuthorizedPage },
  { path: '/Admin', name: 'admin', component: AdminPage },
  { path: '/', redirect: '/products' },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(), // Removed the incorrect `process.env.BASE_URL` parameter
  routes,
});

// Uncommented utility functions for authentication
function getUser() {
  const user = localStorage.getItem('currentUser');
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

  console.log('isAuthenticatedUser:', isAuthenticatedUser);
  console.log('userRole:', userRole);

  if (to.meta.requiresAuth && !isAuthenticatedUser) {
    next({ name: 'loginpage' });
  } else if (to.meta.role && to.meta.role !== userRole) {
    next({ name: 'notAuthorized' });
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
app.use(router);
app.use(vuetify);
app.component('font-awesome-icon', FontAwesomeIcon); // Register FontAwesome component globally
app.mount('#app');
