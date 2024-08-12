<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <div class="product-container" v-for="product in cartItems" :key="product.id">
        <img class="product-image" :src="product.imageName" />
        <div class="details-wrap">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
        </div>
        <button class="remove-button">Remove from Cart</button>
      </div>
      <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length === 0">
      You currently have no items in your cart!
    </div>
  </div>
</template>

<script>
//import { cartItems } from '../temp-data';

export default {
  name: "ShoppingCartPage",
  data() {
    return {
      //cartItems,
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  border-bottom: 5px solid #162836;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
  background-color: #ad815c;
}

.product-container {
  align-content: center;
  border-bottom: 10px solid #df1111;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}

.checkout-button {
  width: 100%;
  background-color: green;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
  margin-top: 16px;
}
</style>
