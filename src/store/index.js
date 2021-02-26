import { createStore } from "vuex";
import requestsModule from "./requestsModule.js";
import coachesModule from "./coachesModule.js";

const store = createStore({
  modules: { coachesModule, requestsModule },
  state() {
    return {
      userId: "c2",
    };
  },
  getters: {
    userId({ userId }) {
      return userId;
    }
  }
});

export default store;
