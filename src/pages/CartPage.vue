<template>
  <v-container>
    <navigation />
    <v-divider></v-divider>
    <v-row justify="center">
      <v-col>
        <h1>Your Cart</h1>
      </v-col>
    </v-row>
    <v-row v-if="cartItems.length === 0" justify="center">
      <v-col>
        <v-alert type="info">Your cart is currently empty.</v-alert>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="item in cartItems" :key="item.productId" cols="12" sm="6" md="4">
        <product-card
          :productId="item.productId"
          :name="item.name"
          :price="item.price"
          :quantity="item.quantity"
          :imagePath="item.imagePath"
          @remove-from-cart="removeFromCart(item.productId)"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn @click="handleCheckout" color="success">Checkout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'; 
import { computed, onMounted } from 'vue'; // Import onMounted to run a hook after component is rendered

export default {
  setup() {
    const cartStore = useCartStore();
    
    // Use computed to make cartItems reactive
    const cartItems = computed(() => cartStore.cartItems);

    // Log the cartItems after the component is mounted
    onMounted(() => {
      console.log('Cart items in cart page:', cartItems.value);
    });

    return {
      cartItems,
      removeFromCart: cartStore.removeFromCart,
      handleCheckout() {
        console.log('Proceeding to checkout');
      },
    };
  },
};
</script>
