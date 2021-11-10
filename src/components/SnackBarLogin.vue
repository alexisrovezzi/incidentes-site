<template>
  <div>
    <v-snackbar v-model="snackbar" color="#cf3048">
      Bienvenido {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn rounded color="White" text v-bind="attrs" @click="snackbarALT">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBarLogin",
  data: () => ({
    //snackbar: this.snackbar(),
  }),
  //watch: { snackbar() {} },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbarLog;
    },
    text() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    snackbarALT() {
      this.$store.dispatch("asyncSnackBarDispatch");
    },
  },
};
</script>
