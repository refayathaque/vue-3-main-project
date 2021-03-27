export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  getters: {
     requests({ requests }, _, _2, rootGetters) {
       console.log(rootGetters)
       const coachId  = rootGetters['authModule/userId'];
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
    async addRequest({ commit }, payload) {
      const newRequest = {
        ...payload,
        // id: new Date().toISOString()
        // firebase will create a proper id for request
      }

      const response = await fetch(`https://vue-coach-finder-2-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
        method: 'POST',
        body: JSON.stringify(newRequest)
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send request');
        throw error
      }

      newRequest.id = responseData.name // taking id created by firebase and adding to `newRequest` before committing to mutation to then go into state

      commit('addRequest', newRequest)
    },
    async loadRequests({ commit, rootGetters }) {
      const coachId = rootGetters['authModule/userId']
      
      const token = rootGetters['authModule/token']

      const response = await fetch(
        `https://vue-coach-finder-2-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
        );
      // we only want to fetch requests associated with the user that is logged

      const responseData = await response.json(); // .json() also returns a promise so that's why we need to await again

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch requests!')
        throw error
      }

      let requests = []

      for (const key in responseData) {
        const request = {
          id: key,
          coachId: responseData[key].coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        }
        requests.push(request)
      }

      commit('setRequests', requests)
    }
  },
  mutations: {
    addRequest({ requests }, payload) {
      requests.push(payload)
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
};
