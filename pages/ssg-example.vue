<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Students and Their Professors</v-card-title>
          <v-card-text>
            <p>This page is statically generated with student-professor relationships:</p>
            <v-expansion-panels>
              <!-- Loop through Students -->
              <v-expansion-panel v-for="student in students" :key="student.id">
                <v-expansion-panel-title>
                  {{ student.name }} ({{ student.email }})
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <strong>Classes:</strong>
                  <ul>
                    <li v-for="classId in student.classIds" :key="classId">
                      {{ getClassName(classId) }} - Taught by {{ getProfessorByClass(classId) }}
                    </li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      // Fetch students, classes, and professors
      const [studentsRes, classesRes, professorsRes] = await Promise.all([
        $axios.get("/students"),
        $axios.get("/classes"),
        $axios.get("/professors")
      ]);
      return {
        students: studentsRes.data,
        classes: classesRes.data,
        professors: professorsRes.data
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { students: [], classes: [], professors: [] };
    }
  },
  data() {
    return {
      students: [],
      classes: [],
      professors: []
    };
  },
  methods: {
    // Get class name by ID
    getClassName(classId) {
      const cls = this.classes.find((c) => c.id === classId);
      return cls ? cls.name : "Unknown Class";
    },
    // Get professor teaching the class
    getProfessorByClass(classId) {
      const professor = this.professors.find((prof) =>
        prof.classIds.includes(classId)
      );
      return professor ? professor.name : "Unknown Professor";
    }
  }
};
</script>
