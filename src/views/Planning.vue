<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('UAH')}}</h4>
    </div>

    <loader v-if="loading" />

    <p v-else-if="!categories.length" class="center-align">
      Категорий пока нет. <router-link to="/categories" >Добавить категорию</router-link>
    </p>

    <section v-else>
      <div 
        v-for="cat of categories"
        :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}</strong>
          {{cat.spend | currency('UAH')}} из {{cat.limit | currency('UAH')}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import currencyFilter from "@/filters/currency.filter"

export default {
  name: 'planning', 
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(rec => rec.categoryId === cat.id)  // choose category
        .filter(rec => rec.type === 'outcome')  // filter outcome
        .reduce((total, record) => {
          return total += +record.amount  // total spend
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent  // if excess of limit more than 100%
      const progressColor = percent < 60  // color for progressbar
        ? 'green' 
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>

<style lang="scss">
  .progress {
    height: 6px;
  }
</style>
