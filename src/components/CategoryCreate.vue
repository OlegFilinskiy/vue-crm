<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: ($v.title.$dirty && !$v.title.required) }"
          >
          <label for="name">Название</label>
          <span 
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: ($v.limit.$dirty && !$v.limit.minValue) }"
          >
          <label for="limit">Лимит</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальное значение {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)} // indicate min value
  },
  mounted() {
    window.M.updateTextFields() // to reinitialize all labels for dynamically adding inputs
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) { // if form completely invalid
        this.$v.$touch()      // this method activate validation
        return
      }

      const formData = {
        title: this.title,
        limit: this.limit
      }

      try {   
        const category = await this.$store.dispatch('createCategory', formData) // await because this is async function
        this.$message(`Категория ${this.title} успешно создана`)
        this.title = ''
        this.limit = 100
        this.$v.$reset() // reset form state validations
        this.$emit('created', category)
      } catch (error) {
        console.error(error)
      }

    }
  }
}
</script>
