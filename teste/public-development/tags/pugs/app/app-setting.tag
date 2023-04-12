// BOS - BierOnStack - File Reserved: ToChange
app-setting.app-setting-tag
    div.ui.segment.app-setting-container
        form.app-setting-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='app-setting-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.one.columns
                    div.column
                        div.field
                            label Nome da Configuração
                            input.firstFocus(type='text' id='app-setting-name' placeholder='Nome da Configuração')
                div.row
                    div.column 
                        a.ui.ribbon.label.purple Configurações de Cadastros
                div.row.two.columns
                    div.column
                        div.field
                            label Cargo para Supervisores
                            div(id='app-setting-supervisor-employee-position-ids')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Cargo para Coordenadores
                            div(id='app-setting-coordinator-employee-position-ids')
                                div.lookup-combobox
                div.row.two.columns
                    div.column
                        div.field
                            label Cargo para Vendedores
                            div(id='app-setting-seller-employee-position-ids')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Cargo para Backoffices
                            div(id='app-setting-backoffice-employee-position-ids')
                                div.lookup-combobox
                div.row
                    div.column 
                        a.ui.ribbon.label.purple Configurações Status de Vendas
                div.row.two.columns
                    div.column
                        div.field
                            label Status - Não bloqueantes
                            div(id='app-setting-sale-status-non-blocking-ids')
                                div.lookup-combobox
                div.row
                    div.column 
                        a.ui.ribbon.label.purple Configurações Filas de Vendas
                div.row.two.columns
                    div.column
                        div.field
                            label Status Permitidos na Fila de Pendentes  
                            div(id='app-setting-allowed-status-on-queue-pending-ids')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Status Mostrados na Fila de Pendentes  
                            div(id='app-setting-showed-status-on-queue-pending-ids')
                                div.lookup-combobox
                div.row.two.columns
                    div.column
                        div.field
                            label Status Permitidos na Fila de Pré Vendas  
                            div(id='app-setting-allowed-status-on-queue-pre-sale-ids')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Status Mostrados na Fila de Pré Vendas  
                            div(id='app-setting-showed-status-on-queue-pre-sale-ids')
                                div.lookup-combobox
                div.row.two.columns
                    div.column
                        div.field
                            label Status Permitidos na Fila de Pós Vendas
                            div(id='app-setting-allowed-status-on-queue-pos-sale-ids')
                                div.lookup-combobox
                    div.column
                        div.field
                            label Status Mostrados na Fila de Pós Vendas 
                            div(id='app-setting-showed-status-on-queue-pos-sale-ids')
                                div.lookup-combobox
                div.row
                    div.column 
                        a.ui.ribbon.label.purple Configurações de Vendas
                div.row.two.columns
                    div.column
                        div.field
                            label Status Índice de Progressão    
                            div(id='app-setting-sale-status-index-progression-ids')
                                div.lookup-combobox
    script appSettingTag.call(this, this.opts)
