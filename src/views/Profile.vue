<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          Введите имя
        </small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators"
  import messages from "@/utils/messages"

  export default {
    data: () => ({
      name: '',
      isRuLocale: true
    }),
    validations: {
      name: { required }
    },
    mounted() {
      this.name = this.info.name

      this.isRuLocale = this.info.locale === 'ru-Ru'

      setTimeout(() => { // life hack for plugin init
        window.M.updateTextFields()
      }, 0)
    },
    computed: {
      ...mapGetters(['info'])
    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if (this.$v.$invalid) { // if form completely invalid
          this.$v.$touch()      // this method activate validation
          return
        }

        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? 'ru-Ru' : 'en-Us'
          })

          if (messages['updateInfo']) {
            // check, if our messages has this key
            this.$message(messages['updateInfo']) // show message from url query parameters
          }
        } catch (error) {}

      }
    }
  }
</script>

<style lang="scss" scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
