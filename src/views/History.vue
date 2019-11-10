<template>
  <div>
    <div class="page-title">
      <h3>{{'HistoryTitle'|localize}}</h3>
    </div>

    <div class="history-chart">
      <!--Canvas need ref 'canvas' for init, have error without it-->
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length">
      {{'HistoryEmptyRecord'|localize}}
      <router-link to="/record">{{'HistoryAddRecordLink'|localize}}</router-link>
    </p>

    <section v-else>
      <!--'items' - dynamic data from paginationMixin-->
      <HistoryTable :records="items" />

      <!--'pagination' and 'waves-effect' - classes from Materialize.css-->
      <!--page, pageCount, pageChangeHandler from paginationMixin-->
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'HistoryPrevText'|localize"
        :next-text="'HistoryNextText'|localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixin' // include fields: page, pageSize, pageCount, allItems, items, setupPagination
  import HistoryTable from '@/components/HistoryTable'
  import { Pie } from 'vue-chartjs'

  export default {
    name: 'history',
    extends: Pie, // renderChart method
    mixins: [paginationMixin], // setupPagination method
    data: () => ({
      loading: true,
      records: []
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.setup(categories)

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(cat => {
            return this.records.reduce((total, rec) => { // iterate over records related costs in this category, and summarize them
              if (rec.categoryId === cat.id && rec.type === 'outcome') {
                total += +rec.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })

      this.loading = false
    },
    methods: {
      setup(categories) {
        const recordsWithAdditionalFields = this.records.map(record => {  // transform records
          return {
            ...record,
            categoryName: categories.find(cat => cat.id === record.categoryId).title,  // find category title
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',
          }
        })

        this.setupPagination(recordsWithAdditionalFields)
      }
    },
    components: {
      HistoryTable
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
