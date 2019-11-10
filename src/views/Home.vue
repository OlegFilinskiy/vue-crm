<template>
  <div>
    <div class="page-title">
      <h3>{{'HomeTitle'|localize}}</h3>

      <button 
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <!-- Loader globaly registrated in main.js -->
    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill 
        :rates="currency.rates"
      />
      <HomeCurrency 
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill"
import HomeCurrency from "@/components/HomeCurrency"

export default {
  name: "home",
  metaInfo() { // need func for rerender
    return {
      title: this.$title('HomeTitle')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
