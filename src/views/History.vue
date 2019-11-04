<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавить запись</router-link>
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
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixin' // include fields: page, pageSize, pageCount, allItems, items, setupPagination
  import HistoryTable from '@/components/HistoryTable'

  export default {
    name: 'history',
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: []
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      const recordsWithAdditionalFields = this.records.map(record => {  // transform records
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,  // find category title
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      })

      this.setupPagination(recordsWithAdditionalFields)

      this.loading = false
    },
    components: {
      HistoryTable
    }
  }
</script>
