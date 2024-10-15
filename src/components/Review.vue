<template>
  <div class="reviews-container">
    <h3>Product Reviews</h3>

    <div v-if="reviews.length === 0">
      <p>No reviews available for this product.</p>
    </div>

    <div v-for="review in reviews" :key="review.id" class="review-item">
      <v-banner>
        <v-row class="review-content-row" align="center">
          <!-- Avatar Section -->
          <v-col class="avatar-col" cols="auto">
            <v-avatar :size="80">
              <img :src="review.user.avatar" class="avatar-image" />
            </v-avatar>
          </v-col>

          <!-- Text Section -->
          <v-col class="text-col">
            <v-banner-text>
              <strong>{{ review.user.firstName }} {{ review.user.lastName }}</strong> <br />
              <v-rating 
                v-model="review.rating" 
                :length="5" 
                :readonly="true" 
                size="20" 
                color="teal" 
                 active-color="teal"
              /> <br />
              <div class="comment-preview" v-if="!review.expanded">
                {{ review.comment }}
              </div>
              <div v-else>
                {{ review.comment }}
              </div>
            </v-banner-text>
          </v-col>

          <!-- Button Section -->
          <v-col class="read-more-btn-col" cols="auto">
            <v-btn :style="{ backgroundColor: 'rgba(19,84,122,.8)', color: 'white' }" @click="toggleReviewExpansion(review)">
              {{ review.expanded ? 'Read Less' : 'Read More' }}
            </v-btn>
          </v-col>
        </v-row>
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
    };
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await reviewService.getReviewsByProduct(this.productId);
        this.reviews = response.data.map(review => ({
          ...review,
          expanded: false // Add expanded flag to each review for toggling view
        }));
        console.log("Fetched reviews:", this.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        alert("Failed to load reviews.");
      }
    },
    toggleReviewExpansion(review) {
      review.expanded = !review.expanded; // Toggle expanded state of the review
    }
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

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the avatar fills the container without distortion */
  border-radius: 50%; /* Keeps the avatar circular */
}

/* Flexbox to ensure row layout */
.review-content-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-col {
  max-width: 80px;
  flex-grow: 0;
}

.text-col {
  flex-grow: 1;
  padding-left: 20px;
}

.read-more-btn-col {
  flex-grow: 0;
  padding-left: 20px;
}

</style>
