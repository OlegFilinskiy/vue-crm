export default {
  install(Vue, options) { // install is system method for using plugin
    Vue.prototype.$message = function(text) { // create own varible $message
      M.toast({ html: text })
    }

    Vue.prototype.$error = function (text) { // create own varible $error
      M.toast({ html: `[Ошибка]: ${text}` })
    }
  }
}
