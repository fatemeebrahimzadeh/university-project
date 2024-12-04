<template>
  <v-app-bar app color="primary" :dark="$store.getters.isDark">
    <v-toolbar-title>University Project</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Navigation Links -->
    <v-btn text>
      <nuxt-link to="/">Home</nuxt-link>
    </v-btn>
    <v-btn text>
      <nuxt-link to="/students">Students</nuxt-link>
    </v-btn>

    <!-- Theme Toggle -->
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ $store.getters.isDark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme');
    },
  },
};
</script>
