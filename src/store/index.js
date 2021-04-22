import categoryModule from "./modules/category";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    category: categoryModule,
  },
});

export default store;
