<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Professors</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog">Add Professor</v-btn>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="professors"
            item-value="id"
            class="elevation-1"
            dense
          >
            <template v-slot:item.actions="{ item }">
              <v-btn small icon color="primary" @click="editProfessor(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small icon color="red" @click="deleteProfessor(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Department"
                  v-model="form.department"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveProfessor">
            Save
          </v-btn>
          <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "~/utils/axios";
import { Professor } from "~/types/professor"; // Importing Professor type

// Reactive data
const professors = ref<Professor[]>([]);
const dialog = ref(false);
const dialogTitle = ref("Add Professor");
const form = ref<Professor>({
  id: 0,
  name: "",
  department: "",
  email: "",
});
const headers = [
  { text: "Name", value: "name" },
  { text: "Department", value: "department" },
  { text: "Email", value: "email" },
  { text: "Actions", value: "actions", sortable: false },
];

// Fetch all professors
const fetchProfessors = async () => {
  try {
    const response = await axios.get<Professor[]>("/professors");
    professors.value = response.data;
  } catch (error) {
    console.error("Error fetching professors:", error);
  }
};

// Save a professor (Add or Update)
const saveProfessor = async () => {
  try {
    if (form.value.id) {
      // Update professor
      await axios.put(`/professors/${form.value.id}`, form.value);
    } else {
      // Add new professor
      await axios.post("/professors", { ...form.value, id: Date.now() });
    }
    closeDialog();
    fetchProfessors();
  } catch (error) {
    console.error("Error saving professor:", error);
  }
};

// Delete a professor
const deleteProfessor = async (id: number) => {
  try {
    await axios.delete(`/professors/${id}`);
    fetchProfessors();
  } catch (error) {
    console.error("Error deleting professor:", error);
  }
};

// Edit professor
const editProfessor = (professor: Professor) => {
  dialog.value = true;
  dialogTitle.value = "Edit Professor";
  form.value = { ...professor };
};

// Open dialog for adding a new professor
const openDialog = () => {
  dialog.value = true;
  dialogTitle.value = "Add Professor";
  form.value = { id: 0, name: "", department: "", email: "" };
};

// Close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Fetch professors on component mount
onMounted(fetchProfessors);
</script>
