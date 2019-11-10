<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'RegisterTitle'|localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'RegisterEmailMessageEmpty'|localize}}</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'RegisterEmailMessageCorrect'|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'RegisterPasswordLabel'|localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'RegisterPasswordMessageEmpty'|localize}}</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'RegisterPasswordMessageMust'|localize}} {{$v.password.$params.minLength.min}} С{{'RegisterPasswordMessageSymbol'|localize}} {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{'RegisterNameLabel'|localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'RegisterNameMessage'|localize}}</small>
      </div>
      <p>
        <label>
          <input 
            type="checkbox" 
            v-model="agree"
            :class="{invalid: $v.name.$dirty && !agree}"
          />
          <span>{{'RegisterRulesAgree'|localize}}</span>
        </label>
      </p>
      <small 
        class="helper-text invalid"
        v-if="$v.name.$dirty && !agree"
      >{{'RegisterRulesMessage'|localize}}</small>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'ButtonRegister'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{'RegisterAlreadyAccount'|localize}}
        <router-link to="/login">{{'ButtonEnter'|localize}}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() { // need func for rerender
    return {
      title: this.$title('RegisterTitle')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}, // indicate the number of characters
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) { // if form completely invalid
        this.$v.$touch()      // this method activate validation
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {   
        await this.$store.dispatch('register', formData) // await because this is async function
        this.$router.push('/')
      } catch (error) {
        // without error handling
      }

    }
  }
}
</script>

<style lang="sass">
  input[type="checkbox"]
    &.invalid
      + span
        &:before
          border-color: red
</style>
