import api from "./api.js";
import router from '../router';

export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters: {
    userId({ userId }) {
      return userId;
    },
    token({ token }) {
      return token;
    },
    isAuthenticated({ token }) {
      return !!token;
      // safe to assume someone is logged in if there is a token in the local module state
      // forcing boolean out of value with !!
    },
  },
  actions: {
    async login(context, { email, password }) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api.WEB_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      console.log(responseData);
      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    async signUp(context, { email, password }) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api.WEB_API_KEY}`,

        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      console.log(responseData);
      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    logout({ commit }) {
      commit("setUser", {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
      router.replace('/coaches')
      // example of programmatic navigation in a vuex store module
    },
  },
  mutations: {
    setUser(state, { token, userId, tokenExpiration }) {
      state.token = token;
      state.userId = userId;
      state.tokenExpiration = tokenExpiration;
    },
  },
};
