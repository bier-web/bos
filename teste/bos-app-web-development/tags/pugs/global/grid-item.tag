// BOS - BierOnStack - File Reserved
grid-item.grid-item
    td(each='{ c, index in opts.gridProperties.properties.dataColumns }' if='{ !c.ignoreByColSpan  }' colspan='{ c.colSpan!=undefined ? c.colSpan : c.colSpanField!=undefined ? parent.opts.data[c.colSpanField] : undefined  }' class='{typeof parent.opts.gridProperties.properties.item_tap == "function" ? "cursor pointer" : "" } { c.type } { (typeof c.class == "string") ? c.class : "" }' data-index='{index}' onClick='{columnOnClick}')
        div(if='{ typeof c.label != "undefined" }' class='{(typeof c.label === "function") ? (getLabel()).class : c.label }') { (typeof c.label === "function") ? (getLabel()).title : c.label.title }
        label(if='{c.type == "object"}'  class='{ c.class }') { JSON.stringify(parent.opts.data[c.name]) }
        label(if='{c.type == "text"}'  class='{ c.class }') { parent.opts.data[c.name] }
        label(if='{c.type == "number"}'  class='{ c.class }') { parent.opts.data[c.name] }
        label(if='{c.type == "date"}'  class='{ c.class }') { ((typeof parent.opts.data[c.name] === 'undefined') || (typeof parent.opts.data[c.name] !== 'undefined' && (parent.opts.data[c.name] == null || parent.opts.data[c.name] == '' ))) ? 'Sem data definida' : moment(parent.opts.data[c.name]).format(c.format) }
        label(if='{c.type == "time"}'  class='{ c.class }') {  moment(parent.opts.data[c.name]).format(c.format)  }
        label(if='{c.type == "money"}'  class='{ c.class }') {  (parent.opts.data[c.name]).formatMoney(2, "", ".", ",")  }
        img(if='{c.type == "image"}'   class='{ c.class }' src='{ parent.opts.data[c.name] }')
        img(if='{c.type == "avatar"}'  class='ui tiny avatar image {c.class}' src='{ parent.opts.data[c.name] }')
        i(if='{c.type == "icon" }'      class='{c.class} { typeof (c.icon) === "function" ? getIcon() : c.icon }' title='{ typeof(c.tooltip) === "function" ? getTooltip() : c.tooltip }' )
        button-tag(if='{c.type == "button"}' 
            each=' { btn in c.actionButtons }' 
            button-type='{ btn.type }' 
            button-click='{ parent.defaultClick }'
            button-enabled='{ (btn.type === helpersWebApp.both().actions.edit && parent.opts.gridProperties.collection.permissionOptions.canEdit) || (btn.type === helpersWebApp.both().actions.remove && parent.opts.gridProperties.collection.permissionOptions.canRemove && !parent.opts.data.systemIsProtected) || btn.enabled===true}')
        grid-checkbox(if='{c.type == "checkbox" }' data = '{ parent.opts.data }' is-checked = '{parent.opts.data[c.name]}' checkbox-click='{ c.onClick }' )
        a(if='{c.type == "mail" }'  class='{ c.class }' target='_blank' href='mailto:{ parent.opts.data[c.name] }') {parent.opts.data[c.name]}
        a(if='{c.type == "telephone" }'  class='{ c.class }' target='_blank' href='tel:{ parent.opts.data[c.name] }') {parent.opts.data[c.name]}
        a(if='{c.type == "link" }'  class='{ c.class }' target='_blank' href='{ parent.opts.data[c.name] }') {parent.opts.data[c.name]}
    script gridItemTag.call(this, this.opts)
