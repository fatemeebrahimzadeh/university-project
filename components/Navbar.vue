<template>
  <v-app-bar app color="primary" dark>
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
