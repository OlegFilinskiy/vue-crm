<template>
  <div>
    <loader v-if="loading" />
  
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb"> {{'DetailRecordTitle'|localize}}</router-link>
        <a 
          @click.prevent
          class="breadcrumb"
        >
          {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
            class="card red"
            :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      {{'DetailRecordMessageRecord'|localize}} id = "{{$route.params.id}}" {{'DetailRecordMessageNotFound'|localize}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'detailRecord',
  metaInfo() { // need func for rerender
    return {
      title: this.$title('DetailRecordTitle')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id  // take id from url ("/detail-record/:id")
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    
    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>
