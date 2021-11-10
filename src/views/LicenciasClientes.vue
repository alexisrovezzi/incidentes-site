<template>
  <div class="LicenciasClientes">
    <table-client />
  </div>
</template>

<script>
import TableClient from "../components/TableClient.vue";

export default {
  name: "LicenciasClientes",

  components: {
    TableClient,
  },
};
</script>
