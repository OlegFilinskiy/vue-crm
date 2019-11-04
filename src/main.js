import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Paginate from 'vuejs-paginate'
import dateFilter from "@/filters/date.filter"
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from "@/directives/tooltip.directive"
import messagePlugin from "@/utils/message.plugin"
import Loader from "@/components/app/Loader"
import Vuelidate from "vuelidate"
import "./registerServiceWorker"
import "materialize-css/dist/js/materialize.min"

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter("date", dateFilter) // Registration of filter
Vue.filter("currency", currencyFilter) // Registration of filter
Vue.directive("tooltip", tooltipDirective) // Registration own directive 'tooltip'
Vue.component('Loader', Loader) // Global registration of component
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyCyZ6qDSOpnljjMQ1p4tNMilQrETabRc3g",
  authDomain: "vue-crm-fb.firebaseapp.com",
  databaseURL: "https://vue-crm-fb.firebaseio.com",
  projectId: "vue-crm-fb",
  storageBucket: "vue-crm-fb.appspot.com",
  messagingSenderId: "108635644201",
  appId: "1:108635644201:web:bbce29cadc02a528db5738",
  measurementId: "G-NT09LN1DSV"
})

let app

firebase.auth().onAuthStateChanged(() => { // if firabse can Auth, we init Vue
  if (!app) { // for not duplicating app
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
})
