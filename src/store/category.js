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
    }
  }
}
