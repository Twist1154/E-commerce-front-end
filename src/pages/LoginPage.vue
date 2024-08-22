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
          required 
        />
        <input 
          type="password"
          placeholder="Password"
          v-model="loginData.password" 
          required 
        />
        <input 
          type="submit"
          value="Login" 
        />
        <router-link to="/register" class="custom-link">SignUp</router-link>      
      </form>
    </section>
  </main>
</template>

<script>
import navigation from '@/components/NavG.vue';
import { useRouter } from 'vue-router';
import userService from '@/services/userService.js';

export default {
  components: { navigation },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      isLoading: false,  // State to track loading status
    };
  },
  methods: {
    async validateUser() {
      if (!this.loginData.email || !this.loginData.password) {
        alert('Email and password are required');
        return;
      }

      //this.isLoading = true;  // Start loading indicator

      try {
        // Validate user credentials
       await userService.validateUser(this.loginData.email, this.loginData.password);

        // Fetch user data by email after successful login
         const user = await userService.getUsersByEmail(this.loginData.email);

        // Store the user data in localStorage (never store passwords)
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentUser', JSON.stringify({
         authToken: 'some-token',
         role: 'customer',
         }));        alert('Login successful');

        // Redirect to the home page or any other page
        this.$router.push('/'); 
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              alert('Invalid email or password');
              break;
            case 400:
              alert('Bad request. Please check your input.');
              break;
            case 404:
              alert('Endpoint not found');
              break;
            default:
              alert('An error occurred');
          }
        } else {
          console.error('Error:', error);
          alert('An error occurred');
        }
      } finally {
        this.isLoading = false;  // End loading indicator
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
  justify-content: center; /* Centering form horizontally */
  align-items: center; /* Centering form vertically */
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

form.register {
  color: #FFF;
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
  text-align: center; /* Center the heading */
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
  margin-bottom: 1rem; /* Adjusted for spacing */
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

form.register input:not([type="submit"]) {
  color: #FFF;
  border-bottom: 2px solid #FFF;
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
  margin-bottom: 1rem; /* Space below button */
}

form.register input[type="submit"] {
  background-color: #FFF;
  color: #162836;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 1rem; /* Space below button */
}

.custom-link {
  display: block;
  text-align: center;
  color: #A67245;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem; /* Space above the link */
}
</style>
