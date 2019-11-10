<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordTitle'|localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length">
      {{'RecordEmptyRecord'|localize}}.
      <router-link to="/categories" >{{'RecordAddRecordLink'|localize}}</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select 
          ref="select"
          v-model="category"
        >
          <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{'RecordSelectLabel'|localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{'RecordRadioIncome'|localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{'RecordRadioOutcome'|localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: ($v.amount.$dirty && !$v.amount.minValue) }"
        >
        <label for="amount">{{'RecordAmountLabel'|localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >{{'RecordAmountMin'|localize}} {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: ($v.description.$dirty && !$v.description.required) }"
        >
        <label for="description">{{'RecordDescriptionLabel'|localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >{{'RecordDescriptionMessage'|localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'ButtonCreate'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import { mapGetters } from "vuex"

export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    setTimeout(() => { // need setTimeout because not enough time for select init after loader
      this.select = window.M.FormSelect.init(this.$refs.select) // to initialize select
      window.M.updateTextFields()
    }, 0)

    if (this.categories.length) {
      this.category = this.categories[0].id // select default option after init
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {// if form completely invalid
        this.$v.$touch() // this method activate validation
        return
      }
      
      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income' 
            ? this.info.bill + this.amount 
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill}) // update in database
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } else {
          this.$message(`Недостаточно средств на счете (-${this.amount - this.info.bill})`)
        }
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
