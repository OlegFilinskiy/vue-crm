export default {
  bind(el, {value}) {  // input parameter - "string"
    window.M.Tooltip.init(el, {html: value})  // init tooltips from Materialize.css
  },
  unbind(el) {  // this method like destroy
    const tooltip = window.M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
