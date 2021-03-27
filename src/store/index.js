import { createStore } from "vuex";
import requestsModule from "./requestsModule.js";
import coachesModule from "./coachesModule.js";
import authModule from "./authModule.js";

const store = createStore({
  modules: { coachesModule, requestsModule, authModule },
});

export default store;
