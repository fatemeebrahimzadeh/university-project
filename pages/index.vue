<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="12" md="8">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="headline primary--text">Welcome to the University Project</v-card-title>
          <v-card-text>
            <p>
              This project allows you to manage university-related data such as students and classes.
            </p>
            <p>Choose an option below to get started:</p>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center" class="mt-4">
              <v-col cols="12" md="6">
                <NuxtLink to="/students">
                  <v-btn block color="primary" large>Manage Students</v-btn>
                </NuxtLink>
              </v-col>
              <v-col cols="12" md="6">
                <NuxtLink to="/classes">
                  <v-btn block color="secondary" large>Manage Classes</v-btn>
                </NuxtLink>
              </v-col>
              <v-col cols="12" md="6">
                <NuxtLink to="/professors">
                  <v-btn block color="success" large>Manage Professors</v-btn>
                </NuxtLink>
              </v-col>
              <v-col cols="12" md="6">
                <NuxtLink to="/ssr-example">
                  <v-btn block color="success" large>Professors and Students (SSR)</v-btn>
                </NuxtLink>
              </v-col>
              <v-col cols="12" md="6">
                <NuxtLink to="/ssg-example">
                  <v-btn block color="success" large>Students and Professors (SSG)</v-btn>
                </NuxtLink>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Add any logic if necessary
</script>

<style scoped>
.primary--text {
  color: #1976d2 !important;
}
</style>
