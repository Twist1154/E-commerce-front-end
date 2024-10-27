import axios from "axios";

const BASE_URL = "http://localhost:8080/store/support-tickets";

const supportTicketService = {
    // Create a new support ticket
    createSupportTicket(supportTicket) {
        console.log("Creating support ticket:", supportTicket);
        return axios
            .post(`${BASE_URL}/create`, supportTicket)
            .then((response) => {
                console.log("Support ticket created successfully:", response.data);
                return response;
            })
            .catch((error) => {
                console.error("Error creating support ticket:", error);
                throw error;
            });
    },

    // Get support ticket by ID
    getSupportTicketById(id) {
        console.log(`Fetching support ticket with ID: ${id}`);
        return axios
            .get(`${BASE_URL}/${id}`)
            .then((response) => {
                console.log("Support ticket fetched successfully:", response.data);
                return response;
            })
            .catch((error) => {
                console.error(`Error fetching support ticket with ID ${id}:`, error);
                throw error;
            });
    },

    // Update a support ticket
    updateSupportTicket(id, supportTicket) {
        console.log(`Updating support ticket with ID: ${id}`, supportTicket);
        return axios
            .put(`${BASE_URL}/update/${id}`, supportTicket)
            .then((response) => {
                console.log("Support ticket updated successfully:", response.data);
                return response;
            })
            .catch((error) => {
                console.error(`Error updating support ticket with ID ${id}:`, error);
                throw error;
            });
    },

    // Delete a support ticket by ID
    deleteSupportTicket(id) {
        console.log(`Deleting support ticket with ID: ${id}`);
        return axios
            .delete(`${BASE_URL}/${id}`)
            .then((response) => {
                console.log("Support ticket deleted successfully:", response.data);
                return response;
            })
            .catch((error) => {
                console.error(`Error deleting support ticket with ID ${id}:`, error);
                throw error;
            });
    },

    // Get all support tickets
    getAllSupportTickets() {
        console.log("Fetching all support tickets");
        return axios
            .get(BASE_URL)
            .then((response) => {
                console.log("All support tickets fetched successfully:", response.data);
                return response;
            })
            .catch((error) => {
                console.error("Error fetching all support tickets:", error);
                throw error;
            });
    },

    // Get support tickets by user ID
    getSupportTicketsByUserId(userId) {
        console.log(`Fetching support tickets with user ID: ${userId}`);
        return axios
            .get(`${BASE_URL}/user/${userId}`)
            .then((response) => {
                console.log("Support tickets fetched successfully for user:", response.data);
                return response;
            })
            .catch((error) => {
                console.error(`Error fetching support tickets with user ID ${userId}:`, error);
                throw error;
            });
    },

    // Get support tickets by subject
    getSupportTicketsBySubject(subject) {
        console.log(`Fetching support tickets with subject: ${subject}`);
        return axios
            .get(`${BASE_URL}/subject/${subject}`)
            .then((response) => {
                console.log("Support tickets fetched successfully by subject:", response.data);
                return response;
            })
            .catch((error) => {
                console.error(`Error fetching support tickets with subject ${subject}:`, error);
                throw error;
            });
    },
};

export default supportTicketService;