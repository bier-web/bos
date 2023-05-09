// BOS - BierOnStack - File Reserved
alert.alert-tag
    div.ui.segment.alert-container
        form.alert-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='alert-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.four.columns
                    div.column
                        div.field
                            label Título
                            input(type='text' class='firstFocus' id='alert-title' placeholder='Informe o título do alert')
                    div.column
                        div.field
                            label Tipo de Alerta
                            div(id='alert-type-id')
                                div.lookup-combobox-types
                    div.column
                        div.field
                            label Início da Vigência
                            input(type='date' id='alert-start-date' placeholder='Data de início do alerta')
                    div.column
                        div.field
                            label Fim da Vigência
                            input(type='date' id='alert-end-date' placeholder='Data de fim do alerta')
                div.row.four.columns
                    div.column
                        div.field
                            label Público Alvo
                            div(id='alert-actor-id')
                                div.lookup-combobox-actors
                    div.column
                        div.field
                            label Grupo de Usuários
                            div(id='alert-user-group-id')
                                div.lookup-combobox-user-groups
                    div.column
                        div.field
                            label Usuários
                            div(id='alert-user-id')
                                div.lookup-combobox-users
                    div.column
                        div.field
                            label Alerta Ativo?
                            div.ui.toggle.checkbox
                                input.hidden(type='checkbox' id='alert-is-active' data-type='checkbox' tabindex=0 value=false)
                            
                div.row.one.columns
                    div.column
                        div.field
                            label Alerta
                            textarea(type='text'  id='alert-alert' placeholder='Digite o aviso que deseja emitir')
    script alertTag.call(this, this.opts)
