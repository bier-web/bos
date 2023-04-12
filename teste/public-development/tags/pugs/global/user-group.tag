// BOS - BierOnStack - File Reserved
user-group.user-group-tag
    div.ui.segment.user-group-container
        form.user-group-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='user-group-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.two.columns
                    div.column
                        div.field
                            label Nome do Grupo
                            input(type='text' class='firstFocus' id='user-group-name' placeholder='Nome do Grupo de Usuários' )
                    div.column
                        div.field
                            label Grupo Ativo?
                            div.ui.toggle.checkbox
                                input.hidden(type='checkbox' id='user-group-active' data-type='checkbox' tabindex=0 value=false)
        div.ui.secondary.menu
            a.ignore.active.item(data-tab='users') Usuários
            a.ignore.item(data-tab='menus') Menus
            a.ignore.item(data-tab='permissions') Permissões
            a.ignore.item(data-tab='dimensions') Filtros (dimensões)
        div.ui.tab.active.segment(data-tab='users')
            div#user-group-users
        div.ui.tab.segment(data-tab='menus')
            div#user-group-menus
        div.ui.tab.segment(data-tab='permissions')
            div#user-group-permissions
        div.ui.tab.segment(data-tab='dimensions')
            div#user-group-dimensions
    script userGroupTag.call(this, this.opts)
