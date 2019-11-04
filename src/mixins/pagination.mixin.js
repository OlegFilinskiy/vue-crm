import _ from 'lodash'

export default {
  data() {
    return {
      page: 1, // default page for display
      pageSize: 5,
      pageCount: 0,
      allItems: [], // all items for display
      items: [] // dynamic data, current items for display
    }
  },
  methods: {
    setupPagination(someItems) { // return new array of chunks
      this.allItems = _.chunk(someItems, this.pageSize) // break all elements into chunks
      this.pageCount = _.size(this.allItems) // allItems.length
      this.items = this.allItems[this.page - 1] || this.allItems[0] // current items for display, '-1' because array start from 0
    },
    pageChangeHandler(page) {
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
