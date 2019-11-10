<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'LoginTitle'|localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'LoginEmailMessageEmpty'|localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'LoginEmailMessageCorrect'|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'LoginPasswordLabel'|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'LoginPasswordMessageEmpty'|localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'LoginPasswordMessageMust'|localize}} {{$v.password.$params.minLength.min}} {{'LoginPasswordMessageSymbol'|localize}} {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'ButtonEnter'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'LoginMessageAccount'|localize}}
        <router-link to="/register">{{'LoginMessageLink'|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators"
import messages from "@/utils/messages"

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) } // indicate the number of characters
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      // check, if our messages has this key
      this.$message(messages[this.$route.query.message]) // show message from url query parameters
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        // if form completely invalid
        this.$v.$touch() // this method activate validation
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch("login", formData) // await because this is async function
        this.$router.push("/")
      } catch (error) {
        // without error handling
      }
    }
  }
}
</script>
