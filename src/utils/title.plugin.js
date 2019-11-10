import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function (titleKey) { // create own variable $title
      const appName = process.env.VUE_APP_TITLE
      return `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}
