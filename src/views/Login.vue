<template>
  <div><form-login /> <snack-bar-login /></div>
</template>

<script>
import FormLogin from "../components/FormLogin.vue";
import SnackBarLogin from "../components/SnackBarLogin.vue";
export default {
  name: "Login",

  components: {
    FormLogin,
    SnackBarLogin,
  },
};
</script>
