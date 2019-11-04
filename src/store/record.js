import firebase from "firebase/app"

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid")
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (error) {
        commit("setError", error);
        throw error
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const recordOnce = await firebase.database().ref(`/users/${uid}/records`).once('value') // create fields in database and return new record
        const records = recordOnce.val() || {}

        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const recordOnce = await firebase.database().ref(`/users/${uid}/records`).child(id).once('value') // .child(id) select record by id
        const record = recordOnce.val() || {}

        return {...record, id: id} // return current record with id
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
