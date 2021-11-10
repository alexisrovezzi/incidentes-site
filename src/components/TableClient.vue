<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="clientesComputed"
      :single-expand="singleExpand"
      :search="search"
      :footer-props="{ 'items-per-page-text': 'Licencias por página' }"
      :expanded.sync="expanded"
      item-key="cliente_nombre"
      show-expand
      sort-by="cliente_id"
      class="elevation-1"
    >
      <!-- cambiar of por de -->
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Licencias de clientes</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar nombre cliente"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <!--<template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>-->
            <v-card>
              <!-- <v-card-title>
                <span class="text-h5">Editar nueva fecha corte</span>
              </v-card-title> -->

              <!-- <v-banner></v-banner> -->

              <v-card-text>
                <!-- Edit de fecha corte con datapicker -->
                <!--<v-col cols="auto" sm="10" md="8">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.nuevaFechaCorte"
                        label="Fecha Corte"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.nuevaFechaCorte"
                      color="blue darken-1"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>-->

                <v-row>
                  <v-col cols="12" lg="7">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          label="Fecha nuevo corte"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        color="blue darken-1"
                        no-title
                        locale="es-ar"
                        @input="
                          (menu = false),
                            (editedItem.nuevaFechaCorte = dateFormatted)
                        "
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Eliminar nueva fecha corte?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >SI</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          Mas informacion acerca de {{ item.cliente_nombre }}
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Resetear </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "TableClient",

  data: (vm) => ({
    dialog: false,
    expanded: [],
    search: "",
    dialogDelete: false,
    singleExpand: false,
    /*date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),*/

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),

    menu: false,
    modal: false,
    headers: [
      {
        text: "Nombre Cliente",
        align: "start",
        sortable: false,
        value: "cliente_nombre",
      },
      { text: "ID cliente", value: "cliente_id" },
      { text: "Fecha Corte", value: "fechaCorte", sortable: true },
      { text: "Ultima Conexión", value: "ultimaConexion", sortable: true },
      { text: "Nueva Fecha Corte", value: "nuevaFechaCorte", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    clientes: [],
    editedIndex: -1,
    editedItem: {
      cliente_id: 0,
      cliente_nombre: "",
      fechaCorte: "",
      ultimaConexion: "",
      nuevaFechaCorte: "",
    },
    defaultItem: {
      cliente_id: 0,
      cliente_nombre: "",
      fechaCorte: "",
      ultimaConexion: "",
      nuevaFechaCorte: "",
    },
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    clientesComputed() {
      return this.$store.getters.getClientes;
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  /*created() {
    this.initialize();
  },*/

  methods: {
    /*initialize() {
      this.clientes = [];

      /*this.clientes.forEach((element) => {
        element.fechaCorte = this.dateCorrectorLatImp(element.fechaCorte);
        element.ultimaConexion = this.dateCorrectorLatImp(
          element.ultimaConexion
        );
        element.nuevaFechaCorte = this.dateCorrectorLatImp(
          element.nuevaFechaCorte
        );
      });
    },*/

    dateCorrectorImpLat(dateImp) {
      let res = "00/00/0000";
      if (dateImp.length > 1) {
        res =
          dateImp.charAt(8) +
          dateImp.charAt(9) +
          "/" +
          dateImp.charAt(5) +
          dateImp.charAt(6) +
          "/" +
          dateImp.charAt(0) +
          dateImp.charAt(1) +
          dateImp.charAt(2) +
          dateImp.charAt(3);
      }

      return res;
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    dateCorrectorLatImp(dateLat) {
      let res = "0000-00-00";
      if (dateLat.length > 1) {
        res =
          dateLat.charAt(6) +
          dateLat.charAt(7) +
          dateLat.charAt(8) +
          dateLat.charAt(9) +
          "-" +
          dateLat.charAt(3) +
          dateLat.charAt(4) +
          "-" +
          dateLat.charAt(0) +
          dateLat.charAt(1);
      }

      return res;
    },

    editItem(item) {
      let h = this.clientesComputed;
      console.log(h);
      this.editedIndex = h.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let h = this.clientesComputed;
      console.log(h);
      this.editedIndex = h.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.editedItem.nuevaFechaCorte);
      console.log(this.editedIndex);
      let payload = { index: this.editedIndex, nuevaFechaCorte: "" };
      this.$store.dispatch("asyncClienteDispatch", payload);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let payload = {
          index: this.editedIndex,
          nuevaFechaCorte: this.dateFormatted,
        };
        this.$store.dispatch("asyncClienteDispatch", payload);
      } else {
        this.clientes.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
