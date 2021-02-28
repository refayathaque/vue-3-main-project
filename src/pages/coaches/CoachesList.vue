<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <!-- since the `show` directive wants a boolean we need to force a boolean out of the `error` data property (which can be null or a string) using !! (using just 1 ! would be the opposite, and we don't want that here) -->
      {{ error }}
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="handleLoadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as coach</base-button
          >
          <!-- register button should only display if the user is not a registered coach and also when data is NOT loading -->
        </div>
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul v-else-if="handleHasCoaches">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseDialog from "../../components/ui/BaseDialog.vue";
export default {
  components: {
    CoachItem,
    BaseCard,
    BaseButton,
    CoachFilter,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters("coachesModule", ["coaches", "hasCoaches", "isCoach"]),
    handleHasCoaches() {
      return !this.loading && this.hasCoaches;
      // want to make sure that we return true only if there are coaches AND when data is NOT loading
    },
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
          // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
          // returning true is sufficient because the method innately creates a new array with values that pass the condition (i.e., `return true`)
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async handleLoadCoaches(forceRefresh = false) {
      this.isLoading = true;
      try {
        await this.loadCoaches({ forceRefresh });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    ...mapActions("coachesModule", ["loadCoaches"]),
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.handleLoadCoaches();
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
