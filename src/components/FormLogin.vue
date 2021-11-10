<template>
  <v-card elevation="6" class="mx-auto" width="300px">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="pa-md-2 mx-lg-auto"
      @submit.prevent="send"
    >
      <v-text-field
        class="ma-3"
        v-model="userLogin"
        :rules="rules"
        label="Usuario"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        class="ma-3"
        :rules="rules"
        label="Contraseña"
        required
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn class="ma-3" color="#113c57" dark type="submit" rounded>
        Ingresar
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "FormLogin",

  data: () => ({
    valid: true,
    userLogin: "",
    show1: false,
    rules: [(v) => !!v || "Este campo es requerido."],
    password: "",
  }),

  methods: {
    send() {
      if (this.$refs.form.validate()) {
        console.log("antes:  " + this.$store.getters.getSnackbarLog);
        this.$store.dispatch("asyncSnackBarDispatch");
        console.log("despues:  " + this.$store.getters.getSnackbarLog);
        this.$store.dispatch("asyncUserDispatch", {
          user: this.userLogin,
          pass: this.password,
        });
        //window.location.assign("../");
        //window.location.href("/");
        this.$router.push("/licencias-clientes");
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
