<template >
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'CategoryEditTitle'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select 
            ref="select"
            v-model="current"
          >
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{'CategoryEditSelectLabel'|localize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: ($v.title.$dirty && !$v.title.required) }"
          >
          <label for="name">{{'CategoryEditNameLabel'|localize}}</label>
          <span 
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{'CategoryEditNameMessage'|localize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: ($v.limit.$dirty && !$v.limit.minValue) }"
          >
          <label for="limit">{{'CategoryEditLimitLabel'|localize}}</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{'CategoryEditLimitMessage'|localize}} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'ButtonUpdate'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    categories: {  // check insert data
      type: Array,
      required: true,
      // default: []
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)} // indicate min value
  },
  watch: {
    current(catId) { // watch for change category
      const {title, limit} = this.categories.find(cat => cat.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() { // init default caltegory
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select) // to initialize select
    window.M.updateTextFields() // to reinitialize all labels for dynamically adding inputs
  },
  methods: {
    async submitHandler() {
      if (this.$v.invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch("updateCategory", categoryData) // update category data
        this.$message(localizeFilter('CategoryUpdateSucces'))
        this.$emit('updatedCategory', categoryData)
      } catch (error) {
        console.log(error)
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
       this.select.destroy // destroy select to avoid memory leaks
    }
  }
}
</script>
