export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
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
    isCoach({ coaches }, _, _2, rootGetters) {
      const userId = rootGetters['authModule/userId']
      console.log(userId)
      return coaches.some((coach) => coach.id === userId);
      // returns true if it finds at least one coach that has the same id as the `userId` authModule state property
    },
    shouldUpdate({ lastFetch }) {
      if (!lastFetch) {
        return true
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
      // checking to see if `lastFetch` occurred more than a minute ago - Caching
    }
  },
  actions: {
    async registerCoach(context, payload) {
      const userId = context.rootGetters['authModule/userId'];
      const newCoachData = {
        ...payload, // using spread operator to copy payload here and then make changes (just adding a new property `id` to the obj)
        id: userId,
      };

      const response = await fetch(
        `https://vue-coach-finder-2-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        {
          method: "PUT", // firebase will not create it's own id for PUTs
          body: JSON.stringify(newCoachData),
        }
      );

      // const responseData = await response.json() // .json() also returns a promise so that's why we need to await again

      if (!response.ok) {
        console.log(response);
      }

      context.commit("registerCoach", newCoachData);
    },
    async loadCoaches(context, { forceRefresh }) {
      if (!forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(
        `https://vue-coach-finder-2-default-rtdb.firebaseio.com/coaches.json`
      );

      const responseData = await response.json(); // .json() also returns a promise so that's why we need to await again

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      let coaches = [];

      for (const key in responseData) {
        const coach = {
          id: responseData[key].id,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }
      // firebase returns an object with kv pairs for each coach, but we want the coaches to be objects in an array

      context.commit("setCoaches", coaches);
      context.commit("setFetchTimestamp")
    },
  },
  mutations: {
    registerCoach({ coaches }, payload) {
      coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
};
