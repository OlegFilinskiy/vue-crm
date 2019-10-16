import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password) // async method (return promise)
      } catch (error) {
        throw error
      }
    }
  }
}
