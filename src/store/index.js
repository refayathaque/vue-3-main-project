import { createStore } from "vuex";
import requestsModule from "./requestsModule.js";
import coachesModule from "./coachesModule.js";

const store = createStore({
  modules: { coachesModule, requestsModule },
});

export default store;
