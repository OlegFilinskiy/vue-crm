<template>
  <div>
    <div class="page-title">
      <h3>{{'CategoryTitle'|localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <!-- when the number :key changes, the component will be redrawn -->
        <CategoryEdit 
          v-if="categories.length"
          :categories="categories" 
          :key="categories.length + updateCount"
          @updatedCategory="updateCategories"
        />
        <p v-else="" class="center">{{'CategoryEmptyCategory'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "categories",
  metaInfo() { // need func for rerender
    return {
      title: this.$title('CategoryTitle')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(cat => cat.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
};
</script>
