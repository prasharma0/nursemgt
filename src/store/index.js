import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      stateNurse: {},
    };
  },
  mutations: {
    addNursesToState(state, payload) {
      state.stateNurse = payload;
    },
  },
});

export default store;
