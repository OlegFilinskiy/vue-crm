import localizeFilter from '@/filters/localize.filter'

export default {
  bind(el, {value, modifiers}) {  // input parameter - "string"
    window.M.Tooltip.init(el, {
      html: modifiers.noloc ? value : localizeFilter(value)
    })  // init tooltips from Materialize.css
  },
  unbind(el) {  // this method like destroy
    const tooltip = window.M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
