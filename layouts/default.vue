<template>
  <v-app :dark="isDark">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-container>
        <span>© {{ new Date().getFullYear() }} University Project</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  components: [
    Navbar,
  ],
  computed: {
    isDark() {
      return this.$store.getters.isDark; // Access Vuex getter for the theme
    },
  },
};
</script>

<style scoped>
v-footer {
  background-color: #1976d2;
  color: white;
  text-align: center;
}
</style>
