<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a coach</router-link></h1>
      <ul>
        <li>
          <router-link to="/coaches">All coaches</router-link>
          <router-link v-if="isAuthenticated" to="/requests"
            >Requests</router-link
          >
          <router-link v-else to="/auth">Login</router-link>
          <base-button v-if="isAuthenticated" @click="logout"
            >Logout</base-button
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../ui/BaseButton.vue";

export default {
  components: { BaseButton },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("authModule", ["logout"]),
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
