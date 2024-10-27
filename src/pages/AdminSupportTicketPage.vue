<template>
    <div>
      <navigation />
      <v-divider></v-divider>
  
      <v-container class="text-center">
        <h1>Admin Support Tickets</h1>
  
        <!-- Support Tickets List -->
        <v-row v-if="supportTickets.length" class="my-4">
          <v-col v-for="ticket in supportTickets" :key="ticket.ticketID" cols="12" md="6" lg="4">
            <v-card>
              <v-card-title>
                <h2>Ticket #{{ ticket.ticketID }}</h2>
              </v-card-title>
  
              <v-card-subtitle>Created on: {{ ticket.dateCreated }}</v-card-subtitle>
              <v-divider></v-divider>
  
              <v-card-text>
                <div class="text-h5">Subject: {{ ticket.subject }}</div>
                <p>{{ ticket.message }}</p>
                <v-textarea
                  v-model="ticket.response"
                  label="Response"
                  required
                ></v-textarea>
              </v-card-text>
  
              <v-card-actions>
                <v-btn @click="respondToTicket(ticket)" color="primary" block>Submit Response</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Loading State -->
        <v-row v-else>
          <v-col class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p>Loading support tickets...</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import supportTicketService from "@/services/supportTicketService"; // Import the support ticket service
  
  export default {
    name: "AdminSupportTicketPage",
    data() {
      return {
        supportTickets: [], // Array to hold support tickets
      };
    },
    methods: {
      // Method to fetch support tickets from the backend
      async fetchSupportTickets() {
        try {
          const response = await supportTicketService.getAllSupportTickets(); // Fetch support tickets from service
          this.supportTickets = response.data; // Set the support tickets data from the response
        } catch (error) {
          console.error("Failed to fetch support tickets:", error); // Handle any errors
        }
      },
  
      // Method to respond to a support ticket
      async respondToTicket(ticket) {
        try {
          const response = await supportTicketService.updateSupportTicketResponse(ticket.ticketID, ticket.response);
          console.log("Response submitted successfully:", response.data);
        } catch (error) {
          console.error("Failed to submit response:", error);
        }
      },
    },
    mounted() {
      this.fetchSupportTickets(); // Fetch support tickets when the component is mounted
    },
  };
  </script>
  
  <style scoped>
  /* Custom styling for the page header */
  h1 {
    text-shadow: 1px 1px 2px black;
    margin-top: 16px;
    padding: 16px;
  }
  
  /* Adjusting layout for support ticket cards */
  v-card {
    margin-bottom: 24px;
  }
  </style>