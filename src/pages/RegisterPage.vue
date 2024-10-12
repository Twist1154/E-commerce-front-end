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
                  <!-- Avatar and Image Upload Button -->
                  <div class="text-center mb-4">
                    <v-avatar
                      :src="avatarUrl || 'smirk.png'"
                      size="80"
                    ></v-avatar>
                    <v-file-input
                      v-model="selectedFile"
                      accept="image/*"
                      label="Upload Avatar"
                      @change="uploadAvatar"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </div>

                  <!-- User Information Form -->
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
                  
                  <!-- Submit Button -->
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
import userService from '@/services/userService.js';
import { uploadFileToS3 } from '@/services/awsService.js'; // AWS upload service

export default {
  data() {
    return {
      registerData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      avatarUrl: '', // Store the avatar URL
      selectedFile: null, // Selected image file
      emailNote: '',
      passwordNote: '',
      confirmPasswordNote: '',
      isLoading: false,
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
    async uploadAvatar() {
      if (!this.selectedFile) return;

      try {
        // Upload file to S3 and get the file URL
        const avatarUrl = await uploadFileToS3(this.selectedFile);
        this.avatarUrl = avatarUrl; // Save the avatar URL
        alert('Avatar uploaded successfully!');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('Failed to upload avatar');
      }
    },
    async createUser() {
      this.isLoading = true;

      if (this.registerData.password !== this.registerData.confirmPassword) {
        this.confirmPasswordNote = 'Passwords do not match!';
        this.isLoading = false;
        return;
      }

      try {
        const existingUser = await userService.getUsersByEmail(this.registerData.email);
        if (existingUser && existingUser.length > 0) {
          alert('A user with this email already exists.');
        } else {
          const newUser = { ...this.registerData, avatarUrl: this.avatarUrl }; // Include avatar URL in user data
          await userService.createUser(newUser);
          alert('User created successfully!');
          this.$router.push('/loginpage');
        }
      } catch (error) {
        alert('Error creating user');
        console.error('Error:', error.message || error);
      } finally {
        this.isLoading = false;
      }
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

.v-alert {
  margin-bottom: 1rem;
}

.custom-btn {
  background-color: #0c0c0c;
  color: white;
}
</style>
