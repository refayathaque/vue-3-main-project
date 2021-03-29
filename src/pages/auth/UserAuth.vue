<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="resetError">
      <!-- !! forces boolean out of any truthy/falsey value -->
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import { mapActions } from "vuex";
import BaseDialog from "../../components/ui/BaseDialog.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";

export default {
  components: { BaseButton, BaseCard, BaseDialog, BaseSpinner },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Sign up";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Sign up instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signUp";
      } else {
        this.mode = "login";
      }
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      // send http request to authenticate/create user and get token back from firebase
      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.login(actionPayload);
        } else {
          await this.signUp(actionPayload);
        }
        this.$router.replace('/coaches')
        // using `replace` because we don't need to let users 'go back' after being auth'ed
      } catch (error) {
        this.error = error.message || "Failed to authenticate, try later.";
      }
      // using async/await here because we want to set `isLoading` to false only after the signUp action has completed in vuex
      this.isLoading = false;
    },
    resetError() {
      this.error = null;
    },
    ...mapActions("authModule", ["signUp", "login"]),
  },
};
</script>

<style scoped>
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

form {
  margin: 1rem;
  padding: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.form-control {
  margin: 0.5rem 0;
}
</style>
