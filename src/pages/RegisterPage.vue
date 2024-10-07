<template>
  <v-app>
    <v-main class="register">
      <navigation />
      <v-container class="forms" fluid>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-card>
              <v-card-title class="justify-center">
                <h2>Sign Up</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="createUser">
                  <v-text-field
                    label="Username"
                    v-model="registerData.username"
                    :rules="[rules.required]"
                    outlined
                    dense
                  />
                  <v-text-field
                    label="First Name"
                    v-model="registerData.firstName"
                    :rules="[rules.required]"
                    outlined
                    dense
                  />
                  <v-text-field
                    label="Last Name"
                    v-model="registerData.lastName"
                    :rules="[rules.required]"
                    outlined
                    dense
                  />
                  <v-text-field
                    label="Email address"
                    v-model="registerData.email"
                    :rules="[rules.required, rules.email]"
                    @input="validateEmail"
                    outlined
                    dense
                  />
                  <v-alert v-if="emailNote" type="error" dense outlined>{{ emailNote }}</v-alert>
                  <v-text-field
                    label="Password"
                    v-model="registerData.password"
                    :rules="[rules.required, rules.password]"
                    type="password"
                    @input="validatePassword"
                    outlined
                    dense
                  />
                  <v-alert v-if="passwordNote" type="error" dense outlined>{{ passwordNote }}</v-alert>
                  <v-text-field
                    label="Confirm Password"
                    v-model="registerData.confirmPassword"
                    :rules="[rules.required, confirmPasswordMatch]"
                    type="password"
                    outlined
                    dense
                  />
                  <v-alert v-if="confirmPasswordNote" type="error" dense outlined>{{ confirmPasswordNote }}</v-alert>
                  <v-btn
                    class="custom-btn"
                    :loading="isLoading"
                    block
                    type="submit"
                    style="background-color: #0c0c0c; color: white;"  
                  >
                    {{ isLoading ? 'Signing Up...' : 'Submit' }}
                  </v-btn>
                </v-form>
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
      registerData: {
        username: '', // Added username field
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '' // Confirm password field
      },
      emailNote: '',
      passwordNote: '',
      confirmPasswordNote: '', // Note for confirming passwords
      isLoading: false, // State to track loading status
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'Invalid email.',
        password: value =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) || 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.'
      }
    };
  },
  computed: {
    confirmPasswordMatch() {
      return this.registerData.confirmPassword === this.registerData.password
        ? ''
        : 'Passwords do not match.';
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailNote = this.registerData.email
        ? (emailPattern.test(this.registerData.email) ? '' : 'Invalid email address.')
        : '';
    },
    validatePassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      this.passwordNote = this.registerData.password
        ? (passwordPattern.test(this.registerData.password) ? '' : 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.')
        : '';
    },
    async createUser() {
      this.isLoading = true; // Start loading indicator

      if (this.registerData.password !== this.registerData.confirmPassword) {
        this.confirmPasswordNote = 'Passwords do not match!';
        this.isLoading = false;
        return;
      }

      try {
        // Check if the user already exists
        const existingUser = await userService.getUsersByEmail(this.registerData.email);
        
        if (existingUser && existingUser.length > 0) {
          alert('A user with this email already exists.');
        } else {
          // If user does not exist, create the user
          await userService.createUser(this.registerData);
          alert('User created successfully!');
          this.$router.push('/loginpage'); // Redirect to login page after successful registration
        }
      } catch (error) {
        alert('Error creating user');
        console.error('Error:', error.message || error);
      } finally {
        this.isLoading = false; // End loading indicator
      }
    }
  }
};
</script>


<style>
.forms {
  min-height: 100vh;
  display: flex;
  justify-content: center; /* Center form horizontally */
  align-items: center; /* Center form vertically */
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem; /* Decrease the margin to reduce the space */
  text-align: center;
}

.v-alert {
  margin-bottom: 1rem;
}

.custom-btn {
  background-color: #0c0c0c; /* Ensure the button color is set */
  color: white; /* Ensure text color is white */
}
</style>
