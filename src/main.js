import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';

//import './main.css';

// Vuetify styles 

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import components
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import AddProduct from './pages/AddProduct.vue';
import ProductUpdateForm from './pages/ProductUpdateForm.vue';
// Define routes
const routes = [
  {
    path: '/updateForm',
    component: ProductUpdateForm,
  },
  {
    path: '/cart',
    component: ShoppingCartPage,
  },
  {
    path: '/AddProduct',
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
    redirect: '/ProductsPage', // Redirect root path to ImageCarousel
  }
];

// Components
const vuetify = createVuetify({
  components,
  directives,
})

// Create router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes,
});

// Create and mount the app
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
