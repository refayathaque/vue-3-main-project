<template>
  <section>filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in coaches" :key="coach.id">
        <!-- https://v3.vuejs.org/style-guide/#prop-name-casing-strongly-recommended -->
        <coach-item
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :hourly-rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </li>
    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/layout/coaches/CoachItem.vue";
export default {
  components: { CoachItem },
  computed: {
    ...mapGetters("coachesModule", ["coaches", "hasCoaches"]),
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
