<template>
  <footer>
      <ul class="footer-links">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/about">About</router-link></li>
        <li><router-link class="link" to="/register">SignUp</router-link></li>
        <li><router-link class="link" to="/product-detail">ProductDetailPage</router-link></li>
      </ul>
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" class="icon"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank" class="icon"><i class="fab fa-instagram"></i></a>
        <a href="https://github.com" target="_blank" class="icon"><i class="fab fa-github"></i></a>
      </div>
    </footer>
</template>
<script>
  export default {
    
  }
</script>
<style scoped>
/* Footer Styles */
footer {
  background-color: #162836;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0 0 10px;
  display: flex;
  gap: 20px;
}

.footer-links .link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.footer-links .link:hover {
  color: #C8915F;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons .icon {
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s;
}

.social-icons .icon:hover {
  color: #C8915F;
}
</style>