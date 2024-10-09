<template>
  <v-app>
    <v-main class="login">
      <navigation />
      <v-container class="forms" fluid>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-card>
              <v-card-title class="justify-center">
                <h2>Login</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="validateUser">
                  <v-text-field
                    label="Email Address"
                    v-model="loginData.email"
                    :rules="[rules.required, rules.email]"
                    @input="validateEmail"
                    outlined
                    dense
                  />
                  <v-alert v-if="!emailIsValid" type="error" dense outlined>Invalid email address</v-alert>

                  <v-text-field
                    label="Password"
                    v-model="loginData.password"
                    :rules="[rules.required, rules.password]"
                    type="password"
                    @input="validatePassword"
                    outlined
                    dense
                  />
                  <v-alert v-if="!passwordIsValid" type="error" dense outlined>Password must be at least 6 characters</v-alert>

                  <v-btn
                    class="custom-btn"
                    :loading="isLoading"
                    block
                    type="submit"
                    style="background-color: #0c0c0c; color: white;"
                  >
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                  </v-btn>
                </v-form>
                <router-link to="/reset-password" class="forgot-password">Forgot Password?</router-link>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import navigation from '@/components/NavG.vue';
import userService from '@/services/userService.js';

export default {
  //components: { navigation },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      isLoading: false,
      emailIsValid: true,
      passwordIsValid: true,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'Invalid email.',
        password: value => value.length >= 6 || 'Password must be at least 6 characters.'
      }
    };
  },
  methods: {
    async validateUser() {
      if (!this.emailIsValid || !this.passwordIsValid) {
        alert('Please correct the errors before submitting.');
        return;
      }

      this.isLoading = true;

      try {
        await userService.validateUser(this.loginData.email, this.loginData.password);
        const user = await userService.getUsersByEmail(this.loginData.email);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', 'some-token');
        localStorage.setItem('role', 'customer');
        alert('Login successful');
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
        this.isLoading = false;
      }
    },
    validateEmail() {
      this.emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.loginData.email);
    },
    validatePassword() {
      this.passwordIsValid = this.loginData.password.length >= 6;
    }
  }
};
</script>

<style>
.forms {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
}

.forgot-password {
  display: block;
  text-align: center;
  color: #A67245;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem;
}
</style>
