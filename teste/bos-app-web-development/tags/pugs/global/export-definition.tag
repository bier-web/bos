// BOS - BierOnStack - File Reserved
export-definition.export-definition-tag
    div.ui.segment.export-definition-container
        form.export-definition-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='export-definition-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.two.columns
                    div.column
                        div.field
                            label Nome da Definição
                            input.firstFocus(type='text' id='export-definition-name' placeholder='Nome da definição' )
                    div.column
                        div.field
                            label Nome da Coleção
                            input(type='text' id='export-definition-collection-name' placeholder='Nome da coleção' )
                div.row.one.columns
                    div.column
                        div.field
                            label Configuração da Definição
                            textarea(type='text' id='export-definition-export-definitions' placeholder='Configurações da Definição' )
    script exportDefinitionTag.call(this, this.opts)
