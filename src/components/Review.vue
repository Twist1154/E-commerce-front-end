<template>
  <div class="reviews-container">
    <h2>Product Reviews</h2>

    <form @submit.prevent="submitReview" class="review-form">
      <div>
        <label for="rating">Rating:</label>
        <v-rating
          hover
          :length="5"
          :size="32"
          v-model="newReview.rating"
          color="green"
          active-color="primary"
          required
        />
      </div>

      <div>
        <label for="comment">Comment:</label>
        <textarea
          v-model="newReview.comment"
          class="elevation-2"
          required
        ></textarea>
      </div>

      <v-btn type="submit">Submit Review</v-btn>
    </form>

    <div v-if="reviews.length === 0">
      <p>No reviews available for this product.</p>
    </div>

    <div v-for="review in reviews" :key="review.id" class="review-item">
      <v-banner color="pink-darken-1" icon="mdi-account-box" lines="two">
        <template v-slot:prepend>
          <!-- If user has an avatar, display it; otherwise, show the placeholder icon -->
          <v-avatar v-if="review.user.avatar" :src="review.user.avatar"></v-avatar>
          <v-avatar v-else icon="mdi-account-circle"></v-avatar>
        </template>

        <v-banner-text>
          <strong>{{ review.user.firstName }} {{ review.user.lastName }}</strong> <br />
          <span v-if="review.rating">Rating: {{ review.rating }} / 5</span> <br />
          <div class="comment-preview">
            {{ review.comment }}
          </div>
        </v-banner-text>

        <v-banner-actions>
          <v-btn @click="viewFullReview(review)">Read More</v-btn>
        </v-banner-actions>
      </v-banner>
    </div>
  </div>
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
      reviews: [],
      newReview: {
          rating: null,
          comment: '',
      },
    };
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await reviewService.getReviewsByProduct(this.productId);
        this.reviews = response.data;
        console.log("Fetched reviews:", this.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        alert("Failed to load reviews.");
      }
    },
    async submitReview() {
      try {
        // Add product and user details to the newReview object
        this.newReview.product = { id: this.productId }; // Replace with actual product object
        this.newReview.user = { id: this.userId }; // Replace with actual user object
        this.newReview.createdAt = new Date().toISOString(); // Current timestamp

        const response = await reviewService.createReview(this.productId, this.newReview);
        console.log("Submitted review:", response.data);
        this.reviews.push(response.data); // Add the new review to the list
        this.newReview.rating = 0; // Reset the form fields
        this.newReview.comment = '';
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review.");
      }
    },
    viewFullReview(review) {
      alert(`Full review by ${review.user.firstName}: ${review.comment}`);
    },
  },
  mounted() {
    this.fetchReviews();
  },
};
</script>

<style scoped>
.reviews-container {
  padding: 20px;
}

.review-form {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.comment-preview {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.review-item {
  margin-bottom: 15px;
}
</style>
