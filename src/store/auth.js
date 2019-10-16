import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password) // async method (return promise)
      } catch (error) {
        commit('setError', error) // call mutation to create error
        throw error
      }
    },
    async logout() {
      await firebase.auth().signOut() // async method (return promise)
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password) // async method (return promise)
        const uid = await dispatch('getUid') // take user id in promise
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        }) // put to the database with initial bill and name (payload)
      } catch (error) {
        commit('setError', error) // call mutation to create error
        throw error
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
