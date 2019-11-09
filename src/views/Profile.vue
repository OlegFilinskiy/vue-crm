<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
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
          Русский
          <input type="checkbox">
          <span class="lever"></span>
          English
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

  export default {
    data: () => ({
      name: ''
    }),
    validations: {
      name: { required }
    },
    mounted() {
      this.name = this.info.name

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

        const formData = {
          name: this.name
        }

        try {
          await this.updateInfo({
            name: this.name
          })
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
