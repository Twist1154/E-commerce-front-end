<template>
    <v-container>
      <h2 class="text-h5 mb-4">Product Reviews</h2>
  
      <!-- Form for creating a new review -->
      <v-form @submit.prevent="submitReview" class="mb-4">
        <v-select
          v-model="newReview.rating"
          :items="[1, 2, 3, 4, 5]"
          label="Rating"
          required
          :rules="[(v) => !!v || 'Rating is required']"
          clearable
        >
          <template #prepend>
            <v-icon>mdi-star</v-icon>
          </template>
          <template #selection>
            <v-list-item-content>
              <v-list-item-title>
                <span v-if="newReview.rating">{{ newReview.rating }} Star</span>
                <span v-else>Select Rating</span>
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-select>
  
        <v-textarea
          v-model="newReview.comment"
          label="Comment"
          required
          :rules="[(v) => !!v || 'Comment is required']"
          outlined
          rows="4"
        ></v-textarea>
  
        <v-btn type="submit" color="primary">Submit Review</v-btn>
      </v-form>
  
      <!-- Show message if no reviews available -->
      <v-alert v-if="reviews.length === 0" type="info">
        No reviews available for this product.
      </v-alert>
  
      <!-- Loop through reviews and display each one -->
      <v-list>
        <v-list-item
          v-for="review in reviews"
          :key="review.id"
          class="mb-2"
        >
          <v-list-item-avatar>
            <v-avatar v-if="review.user.avatar" :src="review.user.avatar">
            </v-avatar>
            <v-avatar v-else icon="mdi-account-circle"></v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ review.user.firstName }} {{ review.user.lastName }}</strong>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span v-if="review.rating">Rating: {{ review.rating }} / 5</span>
              <span v-if="review.comment.length > 100">
                {{ review.comment.substring(0, 100) + '...' }}
                <v-btn text @click="viewFullReview(review)">Read More</v-btn>
              </span>
              <span v-else>{{ review.comment }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import reviewService from "@/services/reviewService"; // Import your review service
  
  export default {
    name: "ProductReviews",
    props: {
      productId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        reviews: [], // Array to store fetched reviews
        newReview: {
          rating: "", // Rating from the user
          comment: "", // Comment from the user
        },
      };
    },
    methods: {
      // Fetch reviews by product ID
      async fetchReviews() {
        try {
          const response = await reviewService.getReviewsByProduct(this.productId);
          this.reviews = response.data; // Set the fetched reviews to the component state
          console.log("Fetched reviews:", this.reviews);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          alert("Failed to load reviews.");
        }
      },
      // Method to create a new review
      async submitReview() {
        try {
          const response = await reviewService.createReview(this.productId, this.newReview);
          console.log("Submitted review:", response.data);
          this.reviews.push(response.data); // Add new review to the list
          this.newReview.rating = ""; // Reset rating
          this.newReview.comment = ""; // Reset comment
        } catch (error) {
          console.error("Error submitting review:", error);
          alert("Failed to submit review.");
        }
      },
      // Method to view the full review
      viewFullReview(review) {
        alert(`Full review by ${review.user.firstName}: ${review.comment}`);
      },
    },
    mounted() {
      this.fetchReviews(); // Fetch reviews once the component is mounted
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  .reviews-container {
    padding: 20px;
  }
  .review-item {
    margin-bottom: 15px;
  }
  </style>
  