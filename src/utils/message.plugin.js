import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue, options) { // install is system method for using plugin
    Vue.prototype.$message = function(text) { // create own variable $message
      M.toast({ html: localizeFilter(text) })
    }

    Vue.prototype.$error = function (text) { // create own varible $error
      M.toast({ html: `[${localizeFilter('Error')}]: ${localizeFilter('text')}` })
    }
  }
}
