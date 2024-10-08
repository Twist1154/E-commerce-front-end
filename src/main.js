import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import 'vuetify/styles'; // Import Vuetify styles

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import Material Design Icons
import '@mdi/font/css/materialdesignicons.css'; // Ensure MDI icons are available

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

// Define routes without authentication metadata
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
  { path: '/products/:productId', name: 'productDetailPage', component: ProductDetailPage, props: true },
  { path: '/not-authorized', name: 'notAuthorized', component: NotAuthorizedPage },
  { path: '/Admin', name: 'admin', component: AdminPage },
  { path: '/', redirect: '/products' },
];

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // Ensure Vuetify uses Material Design Icons (mdi)
  },
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes,
});

// Global navigation guard without authentication checks
router.beforeEach((to, from, next) => {
  const isAuthenticatedUser = isAuthenticated();
  const userRole = getUserRole();
  
  console.log('isAuthenticatedUser:', isAuthenticatedUser);
  console.log('userRole:', userRole);

  if (to.meta.requiresAuth && !isAuthenticatedUser) {
    next({ name: 'loginpage' });
  } else if (to.meta.role && to.meta.role !== userRole) {
    next({ name: 'notAuthorized' });  // Redirect to Not Authorized page
  } else {
    next();
  }
});

// Create and mount the app
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(vuetify);
app.mount('#app');
