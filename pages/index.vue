<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="12" md="8">
        <v-card elevation="2">
          <v-card-title class="headline primary--text">
            Welcome to the University Project
          </v-card-title>
          <v-card-text>
            <p>
              This project allows you to manage university-related data like students, courses, and more.
            </p>
            <p>
              Click the button below to manage the students in the system.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <nuxt-link to="/students">
              <v-btn color="primary" large>
                Manage Students
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.primary--text {
  color: #1976d2 !important;
}
</style>
