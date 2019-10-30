import Vue from "vue"
import Router from "vue-router"
import firebase from "firebase/app"

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { layout: "auth" },
      component: () => import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "auth", auth: true },
      component: () => import("./views/Register.vue")
    },
    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Home.vue")
    },
    {
      path: "/categories",
      name: "categories",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Categories.vue")
    },
    {
      path: "/history",
      name: "history",
      meta: { layout: "main", auth: true },
      component: () => import("./views/History.vue")
    },
    {
      path: "/detail-record/:id",
      name: "detail-record",
      meta: { layout: "main", auth: true },
      component: () => import("./views/DetailRecord.vue")
    },
    {
      path: "/planning",
      name: "planning",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Planning.vue")
    },
    {
      path: "/profile",
      name: "profile",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/record",
      name: "record",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Record.vue")
    }
  ]
})

// for protect routes

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)  // matched - [array]

  if (requireAuth && !currentUser) {
    next('/login?message=login')  // redirect to the login page
  } else if (to.path === '/login' && currentUser) {
    next('/') // for authorized users did not get to the login page
  } else {
    next() // redirect to the next page
  }
})

export default router
