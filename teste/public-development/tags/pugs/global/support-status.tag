// BOS - BierOnStack - File Reserved
support-status.support-status-tag
    div.ui.segment.support-status-container
        form.support-status-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='support-status-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.two.columns
                    div.column
                        div.field
                            label Nome
                            input.firstFocus(type='text' id='support-status-name' placeholder='Nome' )
                    div.column
                        div.field
                            label CSS Class
                            input(type='text' id='support-status-css-class-icon' placeholder='Classe CSS Ícone' )
                div.row.two.columns
                    div.column
                        div.ui.grid.wide.middle.aligned
                            div.row.two.columns
                                div.column
                                    div.field
                                        label Status Ativo?
                                        div.ui.toggle.checkbox
                                            input.hidden(type='checkbox' id='support-status-is-active' data-type='checkbox' tabindex=0)                                         
                                div.column
                                    div.field
                                        label Status Finaliza Chamado?
                                        div.ui.toggle.checkbox
                                            input.hidden(type='checkbox' id='support-status-is-final-status' data-type='checkbox' tabindex=0)                                         
    script supportStatusTag.call(this, this.opts)
