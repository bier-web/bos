// BOS - BierOnStack - File Reserved
user.user-tag
    div.ui.segment.user-container
        form.user-form.ui.tiny.equal.width.form.error(autocomplete="nope")
            input(type='hidden' id='user-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.four.columns
                    div.column
                        div.field
                            label Nome Completo
                            input.firstFocus(type='text' id='user-full-name' placeholder='Nome do Cliente' )
                    div.column
                        div.field
                            label Usuário
                            input(type='text' id='user-username' placeholder='Nome do Usuário' autocomplete="new-password")
                    div.column
                        div.field
                            label Senha
                            input(type='password' id='user-password' placeholder='Senha' autocomplete="new-password")
                    div.column
                        div.field
                            label Confirmar Senha
                            input(type='password' id='user-password-confirm' placeholder='Confirmar Senha' autocomplete="new-password")
                div.row.four.columns
                    div.column
                        div.field
                            label Coordenador
                            div(id='user-coordinator-id')
                                div.lookup-combobox-tag
                    div.column
                        div.field
                            label Supervisor
                            div(id='user-supervisor-id')
                                div.lookup-combobox-tag
                    div.column
                        div.field
                            label Vendedor
                            div(id='user-seller-id')
                                div.lookup-combobox-tag
                    div.column
                        div.field
                            label Backoffice
                            div(id='user-backoffice-id')
                                div.lookup-combobox-tag
                div.row.four.columns
                    div.column
                        label E-mail
                        input(type='text' id='user-email' data-type='email' placeholder='E-mail do Usuário' )
                    div.column
                        div.field
                            label Usuário Ativo?
                            div.ui.toggle.checkbox
                                input.hidden(type='checkbox' id='user-active' data-type='checkbox' tabindex=0 value=false)
        div.ui.secondary.menu
            a.active.item(data-tab='users') Grupos de Usuários
        div.ui.tab.active.segment(data-tab='groups')
            div#user-group-users
    script userTag.call(this, this.opts)
