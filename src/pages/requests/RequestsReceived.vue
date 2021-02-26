<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    {{ error }}
  </base-dialog>
  <section>
    <base-card>
      <h3>Requests Received</h3>
      <header>
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </header>
    </base-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import RequestItem from "../../components/requests/RequestItem.vue";
import BaseDialog from "../../components/ui/BaseDialog.vue";
export default {
  components: { BaseCard, BaseSpinner, RequestItem, BaseDialog },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("requestsModule", ["requests", "hasRequests"]),
  },
  created() {
    this.handleLoadRequests();
  },
  methods: {
    async handleLoadRequests() {
      this.isLoading = true;
      try {
        await this.loadRequests();
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    ...mapActions("requestsModule", ["loadRequests"]),
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
