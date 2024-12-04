<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Professors and Their Students by Class
          </v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <!-- Loop through Professors -->
              <v-expansion-panel v-for="professor in professors" :key="professor.id">
                <v-expansion-panel-title>
                  {{ professor.name }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul>
                    <!-- Loop through Classes Taught by the Professor -->
                    <li v-for="classId in professor.classIds" :key="classId">
                      <strong>{{ getClassName(classId) }}</strong>
                      <ul>
                        <!-- Loop through Students Enrolled in the Class -->
                        <li v-for="student in getStudentsByClass(classId)" :key="student.id">
                          {{ student.name }}
                        </li>
                      </ul>
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
      // Fetch professors, students, and classes
      const [professorsRes, studentsRes, classesRes] = await Promise.all([
        $axios.get("/professors"),
        $axios.get("/students"),
        $axios.get("/classes")
      ]);

      return {
        professors: professorsRes.data,
        students: studentsRes.data,
        classes: classesRes.data
      };
    } catch (error) {
      console.error("Error fetching data during SSR:", error);
      return { professors: [], students: [], classes: [] };
    }
  },
  data() {
    return {
      professors: [],
      students: [],
      classes: []
    };
  },
  methods: {
    // Get Class Name by ID
    getClassName(classId) {
      const cls = this.classes.find((c) => c.id === classId);
      return cls ? cls.name : "Unknown Class";
    },
    // Get Students by Class ID
    getStudentsByClass(classId) {
      return this.students.filter((student) => student.classIds.includes(classId));
    }
  }
};
</script>
