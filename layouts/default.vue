<template>
  <v-app>
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

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<style scoped>
v-footer {
  background-color: #1976d2;
  color: white;
  text-align: center;
}
</style>
