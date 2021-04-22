const state = () => ({
  categories: [],
});

const getters = {
  allCategories(state) {
    return state.categories;
  },
  categoryById: (state) => (id) => {
    var category = state.categories.find((cat) => cat.catid === id);
    var subCategories = state.categories.filter((cat) => cat.parent === id);
    return { category: category, subcategories: subCategories };
  },
};

const actions = {
  async addCategory({ commit }, payload) {
    commit("addCategory", payload);
  },
  getCategory({ commit }, id) {
    return commit("categoryById", id);
  },
};

const mutations = {
  saveAllCategories(state, payload) {
    state.categories = payload;
  },
  addCategory(state, payload) {
    state.categories.unshift(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
