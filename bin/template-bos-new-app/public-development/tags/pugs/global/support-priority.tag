// BOS - BierOnStack - File Reserved
support-priority.support-priority-tag
    div.ui.segment.support-priority-container
        form.support-priority-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='support-priority-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.three.columns
                    div.column
                        div.field
                            label Nome
                            input.firstFocus(type='text' id='support-priority-name' placeholder='Nome' )
                    div.column
                        div.field
                            label CSS Class
                            input(type='text' id='support-priority-css-class-icon' placeholder='Nome' )
                    div.column
                        div.field
                            label ID da Prioridade Pushover
                            input(type='number' id='support-priority-priority-id' placeholder='ID Prioridade' )
                div.row.three.columns
                    div.column
                        div.ui.grid.wide.middle.aligned
                            div.row.two.columns
                                div.column
                                    div.field
                                        label Prioridade Ativa?
                                        div.ui.toggle.checkbox
                                            input.hidden(type='checkbox' id='support-priority-is-active' data-type='checkbox' tabindex=0)                                         
                                div.column
                                    div.field
                                        label Notificar?
                                        div.ui.toggle.checkbox
                                            input.hidden(type='checkbox' id='support-priority-is-to-notification' data-type='checkbox' tabindex=0)                                         
    script supportPriorityTag.call(this, this.opts)