import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active: undefined,
    names: undefined,
  },
  getters: {
    getActive({ active }) {
      return active;
    },
    getNames({ names }) {
      return names;
    },
  },
  mutations: {
    ["SET_ACTIVE"](state, active) {
      state.active = active;
    },
    ["SET_NAMES"](state, names) {
      state.names = names;
    },
  },
  actions: {
    setActive({ commit }, active) {
      commit("SET_ACTIVE", active);
    },
    setNames({ commit }, names) {
      commit("SET_NAMES", names);
    },
  },
  modules: {},
});
