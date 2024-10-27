<template>
  <div>
    <navigation />
    <v-divider></v-divider>

    <v-container class="text-center">
      <h1>Support Tickets</h1>

      <!-- Form to create a new support ticket -->
      <v-form @submit.prevent="createSupportTicket">
        <v-text-field
            v-model="newTicket.subject"
            label="Subject"
            required
        ></v-text-field>
        <v-textarea
            v-model="newTicket.message"
            label="Message"
            required
        ></v-textarea>
        <v-btn type="submit" color="primary">Submit Ticket</v-btn>
      </v-form>

      <v-divider class="my-4"></v-divider>

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
            </v-card-text>

            <v-card-actions>
              <v-btn @click="deleteTicket(ticket.ticketID)" color="error" block>Delete Ticket</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Loading State -->
      <v-row v-else>
        <v-col class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading your support tickets...</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import supportTicketService from "@/services/supportTicketService"; // Import the support ticket service

export default {
  name: "SupportTicketPage",
  data() {
    return {
      supportTickets: [], // Array to hold support tickets
      newTicket: {
        subject: "",
        message: "",
        user: {
          id: 15,
          name: "Rethabile"
        }
      },
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

    // Method to create a new support ticket
    async createSupportTicket() {
      try {
        const response = await supportTicketService.createSupportTicket(this.newTicket);
        this.supportTickets.push(response.data); // Add the new ticket to the list
        this.newTicket.subject = "";
        this.newTicket.message = "";
      } catch (error) {
        console.error("Failed to create support ticket:", error);
      }
    },

    // Method to handle deleting a support ticket
    async deleteTicket(ticketID) {
      try {
        await supportTicketService.deleteSupportTicket(ticketID);
        this.fetchSupportTickets(); // Refresh the list after deletion
      } catch (error) {
        console.error(`Failed to delete support ticket #${ticketID}:`, error);
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