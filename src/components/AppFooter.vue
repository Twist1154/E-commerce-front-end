<template>
  <v-footer
    :style="{
      background:
        'linear-gradient(to top right, rgba(19,84,122,.8), rgba(128,208,199,.8))',
    }"
    class="text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <!-- Footer Links -->
    <div
      class="d-flex justify-center text-center pt-4"
      style="
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
      "
    >
      <!-- Contact Us -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8)">
          Contact Us
        </h3>
        <ul class="footer-list">
          <li>
            <a href="mailto:support@yourwebsite.com" class="footer-link"
              >Email Us</a
            >
          </li>
          <li><a href="tel:+1234567890" class="footer-link">Call Us</a></li>
          <li>
            <a
              href="https://www.google.com/maps/place/Your+Location"
              class="footer-link"
              >Find Us</a
            >
          </li>
        </ul>
      </div>

      <!-- Customers -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8)">
          Customers
        </h3>
        <ul class="footer-list">
          <li><a href="/faq" class="footer-link">FAQs</a></li>
          <li><a href="/returns" class="footer-link">Return Policy</a></li>
          <li><a href="/support" class="footer-link">Customer Support</a></li>
        </ul>
      </div>

      <!-- About Us -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8)">
          About Us
        </h3>
        <ul class="footer-list">
          <li><a href="/about" class="footer-link">Our Story</a></li>
          <li><a href="/careers" class="footer-link">Careers</a></li>
          <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Grp KN02</strong></div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
a.footer-link {
  color: rgba(255, 255, 255, 0.8); /* Same color as Grp KN02 */
  text-decoration: none;
}

a.footer-link:hover {
  text-decoration: underline;
}

h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8); /* Same color as Grp KN02 */
}

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-list li {
  margin-bottom: 5px;
}

.v-footer {
  padding: 20px 0;
}
</style>

<template>
  <v-footer
    :style="{ background: 'linear-gradient(to top right, rgba(19,84,122,.8), rgba(128,208,199,.8))' }"
    class="text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <!-- Footer Links -->
    <div
      class="d-flex justify-center text-center pt-4"
      style="font-family: Arial, sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.8);"
    >
      <!-- Contact Us -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8);">Contact Us</h3>
        <ul class="footer-list">
          <li><a href="mailto:support@yourwebsite.com" class="footer-link">Email Us</a></li>
          <li><a href="tel:+1234567890" class="footer-link">Call Us</a></li>
          <li><a href="https://www.google.com/maps/place/Your+Location" class="footer-link">Find Us</a></li>
        </ul>
      </div>

      <!-- Customers -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8);">Customers</h3>
        <ul class="footer-list">
          <li><a href="/faq" class="footer-link">FAQs</a></li>
          <li><a href="/returns" class="footer-link">Return Policy</a></li>
          <li><a href="/support" class="footer-link">Customer Support</a></li>
        </ul>
      </div>

      <!-- About Us -->
      <div class="px-4">
        <h3 class="font-weight-bold" style="color: rgba(255, 255, 255, 0.8);">About Us</h3>
        <ul class="footer-list">
          <li><a href="/about" class="footer-link">Our Story</a></li>
          <li><a href="/careers" class="footer-link">Careers</a></li>
          <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Grp KN02</strong>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
}
</script>

<style scoped>
  a.footer-link {
    color: rgba(255, 255, 255, 0.8); /* Same color as Grp KN02 */
    text-decoration: none;
  }

  a.footer-link:hover {
    text-decoration: underline;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8); /* Same color as Grp KN02 */
  }

  .footer-list {
    list-style: none;
    padding: 0;
  }

  .footer-list li {
    margin-bottom: 5px;
  }

  .v-footer {
    padding: 20px 0;
  }
</style>
