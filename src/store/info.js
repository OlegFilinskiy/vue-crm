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
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = {...getters.info, ...toUpdate} // concat info data with toUpdate
        await firebase.database().ref(`/users/${uid}/info`).update(updateData) // update data
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const infoFB = await firebase.database().ref(`/users/${uid}/info`).once('value') // return object
        const info = infoFB.val()
        commit('setInfo', info)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
