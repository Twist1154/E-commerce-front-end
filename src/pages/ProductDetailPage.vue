<template>
  <div class="img-wrap">
    <img :src="product.imageName" />
  </div>
  <div class="product-details">
    <h1>{{ product.name }}</h1>
    <div class="price-wrap"> <!-- New div wrapper for the price -->
      <h3 class="price">{{ product.price }}</h3>
    </div>
    <button class="add-to-cart">Add to cart</button>
  </div>
</template>

<script>
import { products } from '../temp-data';

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: products.find(product => product.id === this.$route.params.productId),
    }
  }
}
</script>