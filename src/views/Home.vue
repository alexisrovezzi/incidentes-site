<template>
  <div align="center">
    <router-link
      v-if="snackbar"
      style="text-decoration: none; color: inherit"
      to="/Login"
      ><v-btn color="#113c57" dark rounded> Iniciar sesión </v-btn></router-link
    >
    <router-link
      v-if="!snackbar"
      style="text-decoration: none; color: inherit"
      to="/licencias-clientes"
      ><v-btn color="#113c57" dark rounded>
        Licencias y clientes
      </v-btn></router-link
    >
  </div>
</template>

<script>
//import FormLogin from "../components/FormLogin.vue";
export default {
  name: "Home",

  components: {
    //FormLogin,
  },

  computed: {
    snackbar() {
      console.log("computed home " + !this.$store.getters.getUserLog);
      return !this.$store.getters.getUserLog;
    },
  },
};
</script>
