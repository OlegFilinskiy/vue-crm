import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import dateFilter from "@/filters/date.filter"
import Vuelidate from "vuelidate"
import "./registerServiceWorker"
import "materialize-css/dist/js/materialize.min"

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter("date", dateFilter)  // Filter registration

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
