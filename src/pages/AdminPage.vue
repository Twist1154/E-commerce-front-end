<template>
  <!-- Main Admin Login Page Layout -->
  <v-app>
    <v-main class="login">
      <v-container class="forms" fluid>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-card>
              <v-card-title class="justify-center">
                <h2>Admin Login</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="validateUser">
                  <v-text-field
                    label="Username"
                    v-model="loginData.user"
                    :rules="[rules.required]"
                    outlined
                    dense
                  />
                  <v-text-field
                    label="Password"
                    v-model="loginData.password"
                    :rules="[rules.required]"
                    type="password"
                    outlined
                    dense
                  />
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import AdminNav from '@/components/AdminNav.vue';

export default {
  //components: { AdminNav },
  data() {
    return {
      loginData: {
        user: '',
        password: ''
      },
      isLoading: false,
      rules: {
        required: value => !!value || 'Required.',
      }
    };
  },
  methods: {
    async validateUser() {
      if (!this.loginData.user || !this.loginData.password) {
        alert('Username and password are required');
        return;
      }

      this.isLoading = true;

      try {
        const user = this.loginData.user;
        const password = this.loginData.password;

        console.log('Attempting login with user:', user);

        // Hardcoded admin check
        if (user === 'admin@Auth.co' && password === 'root@1324') {
          alert('Login successful');
          this.$router.push('/AdminWlcome');
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      } finally {
        this.isLoading = false;
      }
    }
  },
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
</style>
