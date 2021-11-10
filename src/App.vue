<template>
  <v-app>
    <nav-bar />

    <v-main class="ma-5">
      <router-view />
    </v-main>

    <foot-bar />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FootBar from "./components/FootBar.vue";

export default {
  name: "App",

  components: {
    NavBar,
    FootBar,
  },

  data: () => ({}),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.dispatch("initClientesDispatch");
      this.$store.dispatch("getClientes");
    },
  },
};
</script>
