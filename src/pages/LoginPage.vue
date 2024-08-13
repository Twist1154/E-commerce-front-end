<template>
  <main class="login">
    <navigation />
    <section class="forms">
      <form class="login" @submit.prevent="validateUser">
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email Address" 
          v-model="loginData.email" 
          required />
        <input 
          type="password"
          placeholder="Password"
          v-model="loginData.password" 
          required />
        <input 
          type="submit"
          value="Login" />
        <router-link to="/register" class="custom-link">SignUp</router-link>      
      </form>
    </section>
    <footer>
      <ul class="footer-links">
        <li><router-link class="link" :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link class="link" :to="{ name: 'about' }">About</router-link></li>
      </ul>
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" class="icon"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank" class="icon"><i class="fab fa-instagram"></i></a>
        <a href="https://github.com" target="_blank" class="icon"><i class="fab fa-github"></i></a>
      </div>
    </footer>
  </main>
</template>

<script>
import navigation from '@/components/NavG.vue';
import { useRouter } from 'vue-router';
import userService from '@/service/userService.js';

export default {
  components: { navigation },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async validateUser() {
      if (!this.loginData.email || !this.loginData.password) {
        alert('Email and password are required');
        console.log('Validation error: Missing email or password');
        return;
      }

      try {
        console.log('Attempting to validate user with email:', this.loginData.email);
        const response = await userService.validateUser(this.loginData.email, this.loginData.password);
        console.log('User validated successfully:', response);
        alert('Login successful');
        this.$router.push('/');
      } catch (error) {
        console.error('Error validating user:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        }
        if (error.response && error.response.status === 401) {
          alert('Invalid email or password');
        } else if (error.response && error.response.status === 400) {
          alert('Bad request. Please check your input.');
        } else if (error.response && error.response.status === 404) {
          alert('Endpoint not found');
        } else {
          alert('An error occurred');
        }
      }
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  }
};
</script>

<style>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

form.login {
  color: #2c3e50;
  background-color: #162836;
  background-image: linear-gradient(
    to bottom right,
    rgb(22, 40, 54) 0%,
    rgb(200, 145, 95) 100%
  );
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: #162836;
  color: #FFF;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

.custom-link {
  color: #162836; 
  text-decoration: none; 
}

.custom-link:hover {
  color: #A67245; 
}

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
