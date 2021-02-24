export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  getters: {
     requests({ requests }) {
       console.log(requests)
       return requests;
     },
     hasRequests({ requests }) {
       console.log(requests && requests.length > 0)
       return requests && requests.length > 0
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
