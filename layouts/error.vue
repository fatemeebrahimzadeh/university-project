<template>
  <v-app dark>
    <v-container class="text-center fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card class="pa-4" color="grey darken-3">
            <v-card-title class="headline white--text">
              <v-icon large left>{{ error.statusCode === 404 ? 'mdi-alert-circle-outline' : 'mdi-alert-outline' }}</v-icon>
              {{ error.statusCode === 404 ? pageNotFound : otherError }}
            </v-card-title>
            <v-card-text>
              <p v-if="error.statusCode === 404">The page you are looking for doesn't exist.</p>
              <p v-else>Sorry, something went wrong on our end. Please try again later.</p>
            </v-card-text>
            <v-card-actions>
              <NuxtLink to="/">
                <v-btn color="primary">Go Back to Home</v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An unexpected error occurred',
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.white--text {
  color: white !important;
}
</style>
