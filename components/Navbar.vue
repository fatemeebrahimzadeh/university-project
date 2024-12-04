<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>University Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <nuxt-link to="/">Home</nuxt-link>
    </v-btn>
    <v-btn text>
      <nuxt-link to="/students">Students</nuxt-link>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);
</script>

<style scoped>
.v-list-item {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.v-list-item:hover {
  text-decoration: underline;
}
</style>
