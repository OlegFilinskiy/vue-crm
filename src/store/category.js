import firebase from "firebase/app"

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit}) // create fields in database and return new category
        return {title, limit, id: category.key} // 'id' - id of category in database
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const categoryOnce = await firebase.database().ref(`/users/${uid}/categories`).once('value') // create fields in database and return new category
        const categories = categoryOnce.val() || {}
        
        // first version of implementation
        // const categoriesForSelect = []
        // Object.keys(categories).forEach(key => {
        //   categoriesForSelect.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // return categoriesForSelect

        // second version of implementation
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
