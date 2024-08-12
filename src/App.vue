<template>
  <!-- v-layout structure with Vuetify components -->
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer">App.vue is here</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height:300px;">
      <div>
        <div class="page-wrap">
          <router-view></router-view>
        </div>
      </div>
    </v-main>
  </v-layout>
    <AppFooter/>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: "App",
  components: {
    AppFooter
    },
};
</script>

<style scoped>

.page-wrap {
  margin: auto;
  border: 2px solid red;
  border-radius: 5px;
}
</style>
