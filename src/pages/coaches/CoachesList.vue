<template>
  <section>filter</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as coach</base-button>
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
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
export default {
  components: { CoachItem, BaseCard, BaseButton },
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
