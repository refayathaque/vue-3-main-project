<template>
  <section>
    <base-card>
      <header>
        <ul v-if="hasRequests">
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
import { mapGetters } from "vuex";
import BaseCard from "../../components/ui/BaseCard.vue";
import RequestItem from "../../components/requests/RequestItem.vue";

export default {
  components: { BaseCard, RequestItem },
  ...mapGetters("requestsModule", ["requests", "hasRequests"]),
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
