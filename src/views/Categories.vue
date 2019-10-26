<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "categories",
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    console.log(this.categories)
    
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    }
  }
};
</script>
