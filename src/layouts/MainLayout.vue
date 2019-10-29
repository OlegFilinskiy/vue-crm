<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @burgerClick="isOpen = !isOpen" />

      <Sidebar :open="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link 
          class="btn-floating btn-large blue" 
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) { // check if object empty
      await this.$store.dispatch('fetchinfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  }
};
</script>

<style lang="scss">
  .fixed-action-btn {
    bottom: 35px;
    right: 35px;
  }
</style>
