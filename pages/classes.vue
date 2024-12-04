<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Classes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog">Add Class</v-btn>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="classes"
            item-value="id"
            class="elevation-1"
            dense
          >
            <template v-slot:item.actions="{ item }">
              <v-btn small icon color="primary" @click="editClass(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn small icon color="red" @click="deleteClass(item.id)">
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
                  label="Instructor"
                  v-model="form.instructor"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Schedule"
                  v-model="form.schedule"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveClass">
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
import { Class } from "~/types/class"; // Importing Class type

// Reactive data
const classes = ref<Class[]>([]);
const dialog = ref(false);
const dialogTitle = ref("Add Class");
const form = ref<Class>({
  id: 0,
  name: "",
  instructor: "",
  schedule: "",
});
const headers = [
  { text: "Name", value: "name" },
  { text: "Instructor", value: "instructor" },
  { text: "Schedule", value: "schedule" },
  { text: "Actions", value: "actions", sortable: false },
];

// Fetch all classes
const fetchClasses = async () => {
  try {
    const response = await axios.get<Class[]>("/classes");
    classes.value = response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

// Save a class (Add or Update)
const saveClass = async () => {
  try {
    if (form.value.id) {
      // Update class
      await axios.put(`/classes/${form.value.id}`, form.value);
    } else {
      // Add new class
      await axios.post("/classes", { ...form.value, id: Date.now() });
    }
    closeDialog();
    fetchClasses();
  } catch (error) {
    console.error("Error saving class:", error);
  }
};

// Delete a class
const deleteClass = async (id: number) => {
  try {
    await axios.delete(`/classes/${id}`);
    fetchClasses();
  } catch (error) {
    console.error("Error deleting class:", error);
  }
};

// Edit class
const editClass = (classItem: Class) => {
  dialog.value = true;
  dialogTitle.value = "Edit Class";
  form.value = { ...classItem };
};

// Open dialog for adding a new class
const openDialog = () => {
  dialog.value = true;
  dialogTitle.value = "Add Class";
  form.value = { id: 0, name: "", instructor: "", schedule: "" };
};

// Close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Fetch classes on component mount
onMounted(fetchClasses);
</script>
