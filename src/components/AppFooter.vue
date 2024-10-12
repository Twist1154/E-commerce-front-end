<template>
  <v-footer
    :style="{ background: 'linear-gradient(to top right, rgba(19,84,122,.8), rgba(128,208,199,.8))' }" 
    class="text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      when your ready Kinzonzi Genereux Mukoko add relevent and proper content here
      <div class="pt-4">
      <v-btn
        icon="mdi-email"
        class="mx-2"
        variant="text"
      ></v-btn>
      <v-btn
        icon="mdi-phone"
        class="mx-2"
        variant="text"
      ></v-btn>
      <v-btn
        icon="mdi-map-marker"
        class="mx-2"
        variant="text"
      ></v-btn>
    </div>
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Grp KN02</strong>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
