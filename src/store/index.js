import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logUser: { user: "", pass: "" },
    snackbarLog: { state: false },
    userLog: { state: false },
    clientes: [
      {
        cliente_id: 201,
        cliente_nombre: "ACLISA",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 202,
        cliente_nombre: "Ariston - RED HI",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 203,
        cliente_nombre: "ASISTIR",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 204,
        cliente_nombre: "Bernal PMI",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 205,
        cliente_nombre: "CEGO - GENS",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 206,
        cliente_nombre: "CENESA S.A.",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 207,
        cliente_nombre: "Centro de Ojos Arroyo Seco - COAS",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 208,
        cliente_nombre: "Clínica Sucre",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 209,
        cliente_nombre: "Conci",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
      {
        cliente_id: 2010,
        cliente_nombre: "DASPU",
        fechaCorte: "13/04/2022",
        ultimaConexion: "13/04/2022",
        nuevaFechaCorte: "13/04/2022",
      },
    ],
  },
  getters: {
    getUser: (state) => {
      return state.logUser.user;
    },
    getPassUser: (state) => {
      return state.logUser.pass;
    },
    getSnackbarLog: (state) => {
      return state.snackbarLog.state;
    },
    getUserLog: (state) => {
      return state.userLog.state;
    },
    getClientes: (state) => {
      return state.clientes;
    },
  },
  mutations: {
    commitUser: (state, payload) => {
      state.logUser.user = payload;
      state.userLog.state = true;
    },
    commitPass: (state, payload) => {
      state.logUser.pass = payload;
    },
    commitSnackBarLog: (state) => {
      state.snackbarLog.state = !state.snackbarLog.state;
    },
    commitCliente: (state, payload) => {
      let h = state.clientes[payload.index];
      h.nuevaFechaCorte = payload.nuevaFechaCorte;
      state.clientes[payload.index] = h;
    },
    commitInitClientes: (state, payload) => {
      state.clientes = payload;
    },
  },
  actions: {
    asyncUserDispatch: ({ commit }, payload) => {
      commit("commitUser", payload.user);
      commit("commitPass", payload.pass);
    },
    asyncSnackBarDispatch: ({ commit }) => {
      commit("commitSnackBarLog");
    },
    asyncClienteDispatch: ({ commit }, payload) => {
      commit("commitCliente", payload);
    },
    asyncInitClientesDispatch2: ({ commit }, payload) => {
      commit("commitInitClientes", payload);
    },
    async initClientesDispatch() {
      let variableClientes = [
        {
          cliente_id: 201,
          cliente_nombre: "ACLISA",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 202,
          cliente_nombre: "Ariston - RED HI",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 203,
          cliente_nombre: "ASISTIR",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 204,
          cliente_nombre: "Bernal PMI",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 205,
          cliente_nombre: "CEGO - GENS",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 206,
          cliente_nombre: "CENESA S.A.",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 207,
          cliente_nombre: "Centro de Ojos Arroyo Seco - COAS",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 208,
          cliente_nombre: "Clínica Sucre",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 209,
          cliente_nombre: "Conci",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
        {
          cliente_id: 2010,
          cliente_nombre: "DASPU",
          fechaCorte: "13/04/2022",
          ultimaConexion: "13/04/2022",
          nuevaFechaCorte: "13/04/2022",
        },
      ];

      await axios.post(
        "https://licenciasclientes-10e10-default-rtdb.firebaseio.com/clientes.json",
        variableClientes
      );
    },
    async getClientes() {
      const res = await axios.get(
        "https://licenciasclientes-10e10-default-rtdb.firebaseio.com/clientes.json"
      );

      console.log(res.data);
    },
  },
  modules: {},
});
