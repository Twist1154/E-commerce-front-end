<template>
  <!-- v-layout structure with Vuetify components -->

      <div>
        <div class="page-wrap">
          <router-view></router-view>
        </div>
      </div>
    <AppFooter />
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
