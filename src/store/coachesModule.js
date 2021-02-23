export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Maximilian",
          lastName: "Schwarzmuller",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 37,
        },
        {
          id: "c2",
          firstName: "Julie",
          lastName: "Jones",
          areas: ["frontend", "career"],
          description:
            "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
          hourlyRate: 30,
        },
      ],
    };
  },
  getters: {
    coaches({ coaches }) {
      return coaches;
    },
    hasCoaches({ coaches }) {
      return coaches && coaches.length > 0;
    },
    isCoach({coaches}, _, _2, { userId }) {
      return coaches.some(coach => coach.id === userId)
      // returns true if it finds at least one coach that has the same id as the `userId` root state property
    }
  },
  actions: {
    registerCoach(context, payload) {
      const newCoachData = {
        ...payload, // using spread operator to copy payload here and then make changes (just adding a new property `id` to the obj)
        id: context.rootGetters.userId
      }
      context.commit('registerCoach', newCoachData)
    }
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload)
    }
  },
};
