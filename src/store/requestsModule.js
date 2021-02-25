export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  getters: {
     requests({ requests }, _, _2, rootGetters) {
       const { userId: coachId } = rootGetters;
       return requests.filter(request => request.coachId === coachId);
       // only want to show requests to the user that is logged in
     },
     hasRequests(_, { requests }) {
       return requests && requests.length > 0
       // using filtered requests value above from getter (not all requests in module state) hence `getters.requests`
       // will return true if there is at least 1 request
     }
  },
  actions: {
    addRequest({ commit }, payload) {
      const newRequest = {
        ...payload,
        id: new Date().toISOString()
      }
      commit('addRequest', newRequest)
    }
  },
  mutations: {
    addRequest({ requests }, payload) {
      requests.push(payload)
      console.log(requests)
    }
  },
};
