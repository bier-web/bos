// BOS - BierOnStack - File Reserved
navigation.navigation-tag.ui.left.vertical.menu.sidebar
    div.ui.accordion(each=' { menusParent } ')
        div.title(class='{ active: isActive  }')
            i.dropdown.icon
            | { name }
        div.content(class='{ active: isActive  }')
            a.item(each='{ menusChildren } '
                class='{ "ui horizontal divider separator": isSeparator } { "selected": (!isSeparator && parent.selectedUrl === url) }'
                href='{url}'
                onclick = '{ menuClick }')
                    i.menu-icon(if='{!isSeparator}' class='{iconClass}')
                    | { isSeparator ? '' : name }
    script navigationTag.call(this, this.opts)
