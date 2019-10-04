import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      meta: {layout: "auth"},
      component: () => import("./views/Login.vue")
    },
    {
      path: "/categories",
      name: "categories",
      meta: {layout: "main"},
      component: () => import("./views/Categories.vue")
    }
  ]
});
