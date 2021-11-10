<template>
  <div>
    <v-app-bar prominent color="#002942"
      ><router-link style="text-decoration: none; color: inherit" to="/">
        <v-img
          class="mx-16 my-4"
          contain
          lazy-src="logo"
          max-height="100"
          max-width="200"
          :src="logo"
        ></v-img
      ></router-link>
      <v-spacer></v-spacer>
      <v-card
        v-if="validateUser()"
        color="transparent"
        dark
        elevation="6"
        class="mx-16 my-auto"
      >
        <h5 class="ma-3">
          {{ text }}<v-icon class="mx-3" big>mdi-account</v-icon>
        </h5>
      </v-card>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    logo: require("../assets/MacenaLogo.png"),
    //text: "",
  }),

  computed: {
    text() {
      let h = this.$store.getters.getUser;
      if (h !== "") {
        return this.$store.getters.getUser;
      } else {
        return "";
      }
    },
  },

  methods: {
    validateUser() {
      let h = this.$store.getters.getUser;

      if (h !== "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
