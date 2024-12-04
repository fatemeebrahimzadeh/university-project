<template>
  <v-app :dark="isDark">
    <!-- Navbar -->
    <Navbar v-if="isNavbarVisible" />

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
import { defineAsyncComponent, ref, onMounted } from "vue";

export default {
  components: {
    Navbar: defineAsyncComponent(() =>
      import("~/components/Navbar.vue")
    ),
  },
  computed: {
    isDark() {
      return this.$store.getters.isDark; // Access Vuex getter for the theme
    },
  },
  setup() {
    const isNavbarVisible = ref(false);

    onMounted(() => {
      // Delay showing the Navbar for better UX or preload it after a certain action
      setTimeout(() => {
        isNavbarVisible.value = true;
      }, 100);
    });

    return { isNavbarVisible };
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
