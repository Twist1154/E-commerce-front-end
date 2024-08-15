import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';


// Import components
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import AddProduct from './pages/AddProduct.vue'; // Ensure correct casing
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'

// Define routes
const routes = [
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCartPage,
  },
  {
    path: '/AddProduct', // Path should be consistent
    component: AddProduct,
  },
  {
    path: '/products',
    component: ProductsPage,
  },
  {
    path: '/products/:productId',
    name: 'ProductDetailPage',
    component: ProductDetailPage,
    props: true // This ensures route params are passed as props
  },
  {
    path: '/',
    redirect: '/Products', // Redirect root path to ImageCarousel
  },
  {
    path: '/loginPage',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }
];



// Create router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes,
});

// Create and mount the app
createApp(App)
  .use(router)
  .mount('#app');
