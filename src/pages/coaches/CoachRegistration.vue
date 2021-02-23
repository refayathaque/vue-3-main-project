<template>
  <base-card>
    <h2>Register as a coach now!</h2>
    <coach-form @save-data="saveData"></coach-form>
  </base-card>
</template>

<script>
import { mapActions } from "vuex";
import CoachForm from "../../components/coaches/CoachForm.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
export default {
  components: { CoachForm, BaseCard },
  methods: {
    saveData(formData) {
      this.registerCoach(formData);
      this.$router.replace("/coaches");
      // programmatic nav usually uses `.push`, but `.replace` ensures user cannot go back
    },
    ...mapActions("coachesModule", ["registerCoach"]),
  },
};
</script>

<style></style>
