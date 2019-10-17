import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) { // to not cache data on logout
      state.info = {}
    }
  },
  actions: {
    async fetchinfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const infoFB = await firebase.database().ref(`/users/${uid}/info`).once('value') // return object
        const info = infoFB.val()
        commit('setInfo', info)
      } catch (error) {
        // without handling
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
