<template>
  <section><coach-filter @change-filter="setFilters"></coach-filter></section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <li v-for="coach in filteredCoaches" :key="coach.id">
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
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: { CoachItem, BaseCard, BaseButton, CoachFilter },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
    }
  },
  computed: {
    ...mapGetters("coachesModule", ["coaches", "hasCoaches"]),
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
          // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
          // returning true is sufficient because the method innately creates a new array with values that pass the condition (i.e., `return true`)
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        } else {
          return false
        }
      })
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    }
  }
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
