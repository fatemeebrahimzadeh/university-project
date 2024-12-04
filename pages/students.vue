<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Students</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog">Add Student</v-btn>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="students"
            item-value="id"
            class="elevation-1"
            dense
          >
            <template v-slot:item.actions="{ item }">
              <v-btn small icon color="primary" @click="editStudent(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small icon color="red" @click="deleteStudent(item.id)">
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
                  label="Email"
                  v-model="form.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Class IDs"
                  v-model="form.classIds"
                  :items="availableClasses"
                  multiple
                  required
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveStudent">
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
import { Student } from "~/types/student"; // Importing Student type

// Reactive data
const students = ref<Student[]>([]);
const dialog = ref(false);
const dialogTitle = ref("Add Student");
const form = ref<Student>({
  id: 0,
  name: "",
  email: "",
  classIds: [],
});
const headers = [
  { text: "Name", value: "name" },
  { text: "Email", value: "email" },
  { text: "classIds", value: "classIds" },
  { text: "Actions", value: "actions", sortable: false },
];

// Fetch all students
const fetchStudents = async () => {
  try {
    const response = await axios.get<Student[]>("/students");
    students.value = response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// Save a student (Add or Update)
const saveStudent = async () => {
  try {
    if (form.value.id) {
      // Update student
      await axios.put(`/students/${form.value.id}`, form.value);
    } else {
      // Add new student
      await axios.post("/students", { ...form.value, id: Date.now() });
    }
    closeDialog();
    fetchStudents();
  } catch (error) {
    console.error("Error saving student:", error);
  }
};

// Delete a student
const deleteStudent = async (id: number) => {
  try {
    await axios.delete(`/students/${id}`);
    fetchStudents();
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

// Edit student
const editStudent = (student: Student) => {
  dialog.value = true;
  dialogTitle.value = "Edit Student";
  form.value = { ...student };
};

// Open dialog for adding a new student
const openDialog = () => {
  dialog.value = true;
  dialogTitle.value = "Add Student";
  form.value = { id: 0, name: "", email: "", classIds: [] };
};

// Close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Fetch students on component mount
onMounted(fetchStudents);
</script>
