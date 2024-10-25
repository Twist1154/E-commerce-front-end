<template>
    <v-container class="admin-landing-page" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <v-card color="teal darken-4" dark>
            <v-card-title class="display-1">Welcome, Admin!</v-card-title>
            <v-card-text>
              <p>You have successfully logged into the admin dashboard.</p>
              <p>Select an option below to manage products, orders, categories, and more.</p>
            </v-card-text>
  
            <!-- Dashboard Links Section -->
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="link in dashboardLinks" :key="link.path">
                  <v-btn color="lighten-1" block @click="navigateTo(link.path)">
                    {{ link.label }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AdminLandingPage",
    data() {
      return {
        dashboardLinks: [
          { path: "/updateProducts", label: "Update Products" },
          { path: "/orders", label: "Orders" },
          { path: "/AddProduct", label: "Add Product" },
          { path: "/CategorySearch", label: "Category Search" },
          { path: "/PriceRange", label: "Price Range" },
          { path: "/AdminCustomer", label: "Manage Users" }, // Added AdminCustomer link
        ],
      };
    },
    methods: {
      navigateTo(path) {
        this.$router.push({ path });
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-landing-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .v-card {
    padding: 20px;
  }
  </style>
  