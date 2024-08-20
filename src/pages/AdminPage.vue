<template>
    <main class="login">
      <navigation />
      <section class="forms">
        <form class="login" @submit.prevent="validateUser">
          <h2>AdminLogin</h2>
          <input 
            type="user" 
            placeholder="UserName" 
            v-model="loginData.user" 
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
          <router-link to="/" class="custom-link">Home</router-link>      
        </form>
      </section>
    </main>
  </template>
  
  <script>
  import navigation from '@/components/NavG.vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: { navigation },
    data() {
      return {
        loginData: {
          user: '',
          password: ''
        },
        isLoading: false,  // State to track loading status
      };
    },
    methods: {
      async validateUser() {
        if (!this.loginData.user || !this.loginData.password) {
          alert('username and password are required');
          return;
        }
  
        try {
          const user = this.loginData.user
          const password = this.loginData.password
          if(user == 'admin' && password == 'password'){
            localStorage.setItem('currentUser', JSON.stringify({
             authToken: 'some-token',
             role: 'admin',  
             }));
            alert('Login successful');
  
          
           this.$router.push('/AddProduct'); 
          }
  
    
          
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                alert('Invalid username or password');
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
  
 
  
  form.login input:not([type="submit"]) {
    color: #2c3e50;
    border-bottom: 2px solid #2c3e50;
  }
  
  form.login input[type="submit"] {
    background-color: #A67245;
    color: #FFF;
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
    color: #162836; /*#162836*/
    text-decoration: none;
    font-size: 1rem;
    margin-top: 1rem; /* Space above the link */
  }
  </style>
  