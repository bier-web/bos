// BOS - BierOnStack - File Reserved
support-request.support-request-tag
    div.ui.segment.support-request-container
        form.support-request-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='support-request-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row
                    div.column.center.aligned
                        label.ui.label.basic Identificação do Chamado
                        label.ui.red.label.basic { uniqueId() }
                div.row.four.columns
                    div.column
                        div.field
                            label Criado por
                            input.ui.disabled.input(type='text' readonly id='support-request-username-created' tabindex=0)                                         
                    div.column
                        div.field
                            label Criado em
                            input.ui.disabled.input(type='text' readonly id='support-request-created-at' tabindex=0)                                         
                    div.column
                        div.field
                            label Última Movimentação por
                            input.ui.disabled.input(type='text' readonly id='support-request-last-move-username' tabindex=0)                                         
                    div.column
                        div.field
                            label Última Movimentação em
                            input.ui.disabled.input(type='text' readonly id='support-request-last-move-at' tabindex=0)                                         
                div.row
                    div.column
                        div.field
                            label Título
                            input.firstFocus(type='text' id='support-request-title' placeholder='Ex. Problema em Relatório' tabindex=0)                                         
                div.row
                    div.column
                        div.field
                            label Descrição do Chamado
                            textarea(type='text' id='support-request-description' placeholder='Ex. No relatório de vendas detalhadas (menu relatório -> vendas detalhadas), não está aparecendo a coluna X, quando exporto o relatório.' tabindex=0)                                         
                div.row.two.columns
                    div.column
                        div.field
                            label.ui.basic.label.red Atualize o Status do Chamado
                        label Status do Chamado
                            div(id='support-request-support-status-id')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Prioridade do Chamado
                            div(id='support-request-support-priority-id')
                                div.lookup-combobox
                div.row
                    div.column
                        label.ui.basic.label.violet Feed de atualização
                div.row
                    div.column
                      div#support-request-comments
    script supportRequestTag.call(this, this.opts)
