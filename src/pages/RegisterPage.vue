<template>
  <main class="register">
    <navigation />
    <section class="forms">
      <form class="register" @submit.prevent="createUser">
        <h2>SignUp</h2>
        <input 
          type="email" 
          placeholder="Email address"
          v-model="registerData.email" 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="registerData.password" 
          required
        />
        <input 
          type="submit" 
          value="SignUp" 
        />
        <router-link to="/loginPage" class="custom-link">Login</router-link>
      </form>
    </section>
  </main>
</template>

<script>
import navigation from '@/components/NavG.vue';
import userService from '@/services/userService.js';

export default {
  components: { navigation },
  data() {
    return {
      registerData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async createUser() {
      try {
        // Check if the user already exists
        const existingUser = await userService.getUsersByEmail(this.registerData.email);
        
        if (existingUser && existingUser.length > 0) {
          alert('A user with this email already exists.');
        } else {
          // If user does not exist, create the user
          await userService.createUser(this.registerData);
          alert('User created successfully!');
        }
      } catch (error) {
        alert('Error creating user');
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style>
.forms {
  display: flex;
  max-width:100%;
  min-height: 100vhs;
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

form.register input:not([type="submit"]) {
  color: #FFF;
  border-bottom: 2px solid #FFF;
}

input[type="submit"] {
  background-color: #FFF;
  color: #162836;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

.custom-link {
  color: #162836; /* Updated color */
  text-decoration: none; /* Remove underline */
}

.custom-link:hover {
  color: #A67245; /* Optional: change color on hover */
}
</style>
