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
                <v-form @submit.prevent="validateUser ">
                  <v-text-field
                    label="Email Address"
                    v-model="loginData.email"
                    :rules="[rules.required, rules.email]"
                    @input="validateEmail"
                    outlined
                    dense
                  />
                  <v-alert v-if="!emailIsValid" type="error" dense outlined>
                    Invalid email address
                  </v-alert>

                  <v-text-field
                    label="Password"
                    v-model="loginData.password"
                    :rules="[rules.required, rules.password]"
                    type="password"
                    @input="validatePassword"
                    outlined
                    dense
                  />
                  <v-alert v-if="!passwordIsValid" type="error" dense outlined>
                    Password must be at least 6 characters
                  </v-alert>

                  <v-btn
                    class="custom-btn"
                    :loading="isLoading"
                    block
                    type="submit"
                    :disabled="isLoading"
                    style="background-color: #0c0c0c; color: white;"
                  >
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                  </v-btn>
                </v-form>

                <!-- Link for Forgot Password and Sign Up -->
                <div class="links">
                  <router-link to="/reset-password" class="forgot-password">
                    Forgot Password?
                  </router-link>
                  <span class="link-separator"> | </span>
                  <router-link to="/register" class="sign-up">
                    Sign Up
                  </router-link>
                </div>

                <!-- Display error messages in an alert if login fails -->
                <v-alert v-if="errorMessage" type="error" dense outlined>
                  {{ errorMessage }}
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import userService from '@/services/userService.js';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      isLoading: false,
      emailIsValid: true,
      passwordIsValid: true,
      errorMessage: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'Invalid email.',
        password: value => value.length >= 6 || 'Password must be at least 6 characters.'
      }
    };
  },
  methods: {
    async validateUser () {
      this.validateEmail();
      this.validatePassword();

      if (!this.emailIsValid || !this.passwordIsValid) {
        this.errorMessage = 'Please correct the errors before submitting.';
        return;
      }

      this.isLoading = true;
      this.errorMessage = ''; // Reset error message on new attempt

      try {
        await userService.validateUser (this.loginData.email, this.loginData.password);
        const users = await userService.getUsersByEmail(this.loginData.email);

        if (users && users.length > 0) {
          const user = users[0];
          this.authStore.setCurrentUser (user);
          alert('Welcome, ' + user.firstName + ' ' + user.lastName);
          this.$router.push('/');
        } else {
          console.error("Error: No users found");
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              this.errorMessage = 'Invalid email or password';
              break;
            case 400:
              this.errorMessage = 'Bad request. Please check your input.';
              break;
            case 404:
              this.errorMessage = 'Endpoint not found';
              break;
            default:
              this.errorMessage = 'An error occurred';
          }
        } else {
          this.errorMessage = 'An error occurred';
          console.error('Error:', error);
        }
      } finally {
        this.isLoading = false; // End loading state
      }
    },
    validateEmail() {
      this.emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.loginData.email );
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

.links {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.forgot-password,
.sign-up {
  color: #A67245;
  text-decoration: none;
  font-size: 1rem;
  margin: 0 10px;
}

.link-separator {
  margin: 0 10px;
}

.forgot-password:hover,
.sign-up:hover {
  text-decoration: underline;
}
</style>