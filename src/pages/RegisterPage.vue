<template>
  <div class="form-container">
    <v-stepper alt-labels>
      <v-stepper-header>
        <v-stepper-item
          title="User Details"
          :value="1"
          :complete="currentStep > 1"
          @click="currentStep = 1"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Add Address"
          :value="2"
          :complete="currentStep > 2"
          @click="currentStep = 2"
          :disabled="currentStep < 2"
        ></v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <!-- Step 1: User Details Form -->
    <div v-if="currentStep === 1">
      <h2>Step 1: Add User Details</h2>
      <form @submit.prevent="handleUserSubmit">
        <div class="form-group">
          <label for="imagePath">Upload Avatar</label>
          <input
            type="file"
            id="imagePath"
            @change="handleImageUpload"
            accept="image/*"
          />
          <div class="img-preview">
            <img
              :src="user.avatar || 'https://placehold.co/400x400/png'"
              alt="User Avatar"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="user.firstName" required />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="user.lastName" required />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>

        <button type="submit" class="submit-button">
          {{ isUserCreated ? "Update User" : "Create User" }}
        </button>
      </form>
    </div>

    <!-- Step 2: Add Address -->
    <div v-if="currentStep === 2">
      <h2>Step 2: Add Address</h2>
      <form @submit.prevent="handleAddressSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="address.title" required />
        </div>

        <div class="form-group">
          <label for="addressLine1">Address Line 1</label>
          <input type="text" id="addressLine1" v-model="address.addressLine1" required />
        </div>

        <div class="form-group">
          <label for="addressLine2">Address Line 2</label>
          <input type="text" id="addressLine2" v-model="address.addressLine2" />
        </div>

        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" v-model="address.city" required />
        </div>

        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" id="country" v-model="address.country" required />
        </div>

        <div class="form-group">
          <label for="postalCode">Postal Code</label>
          <input type="text" id="postalCode" v-model="address.postalCode" required />
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" v-model="address.phoneNumber" required />
        </div>

        <button type="submit" class="submit-button">Submit Address</button>
      </form>
    </div>
  </div>
</template>

<script>
import { uploadFileToS3 } from "@/services/awsService";
import userService from "@/services/userService";
import {createAddress} from "@/services/AddressService";

export default {
  name: "UserForm",
  data() {
    return {
      currentStep: 1,
      isUserCreated: false,
      user: {
        id: null,
        avatar: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        roles: []
      },
      address: {
        title: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: ""
      },
    };
  },
  methods: {
    async handleUserSubmit() {
      try {
        if (this.user.imageFile) {
          const uploadedImageUrl = await uploadFileToS3(this.user.imageFile);
          this.user.avatar = uploadedImageUrl;
        }

        if (this.isUserCreated) {
          await userService.updateUser(this.user.id, this.user);
          alert("User updated successfully!");
        } else {
          const response = await userService.createUser(this.user);
          this.user = response.data; // Save the returned user with the ID
          this.isUserCreated = true;
          alert("User created successfully!");
        }

        this.currentStep = 2; // Proceed to the next step
      } catch (error) {
        console.error("Error during user creation or update:", error);
        alert("Failed to process user. Please try again.");
      }
    },
    async handleAddressSubmit() {
      try {
        const addressData = {
          ...this.address,
          user: { id: this.user.id } // Send the created user object with the address
        };

        await createAddress(addressData);
        alert("Address added successfully!");
      } catch (error) {
        console.error("Error adding address:", error);
        alert("Failed to add address. Please try again.");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.user.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.img-preview {
  margin-top: 10px;
  text-align: center;
}

.img-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: rgba(19,84,122,.8);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: rgba(128,208,199,.8);
}
</style>
