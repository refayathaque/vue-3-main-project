export default {
  namespaced: true,
  state() {
    return {
      userId: "c2",
    };
  },
  getters: {
    userId({ userId }) {
      return userId;
    },
  },
  actions: {
    login() {

    },
    signup(context, payload) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
      ', )
    },
  },
  mutations: {},
};
