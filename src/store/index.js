import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      categories: [],
    };
  },
  mutations: {
    add(state, category) {
      state.categories.push(category);
    },
  },
  getters: {
    categories(state) {
      return state.categories;
    },
  },
});

export default store;
