<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">User Management</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="users"
                item-key="id"
                class="elevation-1"
                :loading="loading"
              >
                <!-- Use v-slot without modifiers -->
                <template v-slot:items="{ item }">
                  <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <v-btn color="red" @click="deleteUser(item.id)" outlined>
                        Delete
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import userService from "@/services/userService"; // Adjust path if necessary
  
  export default {
    name: "UserManagement",
    data() {
      return {
        users: [],
        loading: false,
        headers: [
          { text: "ID", value: "id" },
          { text: "Name", value: "name" },
          { text: "Email", value: "email" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    methods: {
      fetchUsers() {
        this.loading = true;
        userService.getAllUsers()
          .then((data) => {
            this.users = data;
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            alert("Failed to load users.");
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteUser(id) {
        if (confirm("Are you sure you want to delete this user?")) {
          userService.deleteUser(id)
            .then(() => {
              this.users = this.users.filter(user => user.id !== id);
              alert("User deleted successfully.");
            })
            .catch((error) => {
              console.error(`Error deleting user with ID ${id}:`, error);
              alert("Failed to delete user.");
            });
        }
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  .v-data-table {
    margin-top: 20px;
  }
  </style>
  