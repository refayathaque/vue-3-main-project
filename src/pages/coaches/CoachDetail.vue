<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ selectedCoach.hourlyRate }}</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">
          Contact
        </base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area"></base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import BaseBadge from "../../components/ui/BaseBadge.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
export default {
  props: ["id"],
  components: { BaseCard, BaseButton, BaseBadge },
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    ...mapGetters("coachesModule", ["coaches"]),
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    contactLink() {
      return `${this.$route.path}/contact`;
      // ^ in case the route path changes for some reason, you don't have to come back here and change code
    }
  },
  created() {
    this.selectedCoach = this.coaches.find((coach) => coach.id === this.id);
  },
};
</script>

<style></style>
