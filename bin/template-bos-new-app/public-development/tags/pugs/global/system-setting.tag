// BOS - BierOnStack - File Reserved
system-setting.system-setting-tag
    div.ui.segment.system-setting-container
        form.system-setting-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='system-setting-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.two.columns
                    div.column
                        div.field
                            label Configuração
                            input(type='text' class='firstFocus' id='system-setting-name' placeholder='Nome da Configuração' )
                    div.column
                        div.field
                            label Descrição
                            input(type='text' id='system-setting-description' placeholder='Descrição da Configuração' )
                div.row.columns
                    div.column
                        div.field
                            label Valor
                            input(type='text' id='system-setting-value' placeholder='Valor da Configuração')
    script systemSettingTag.call(this, this.opts)
