// BOS - BierOnStack - File Reserved: ToChange
credit-card-information.credit-card-information-tag
    div.ui.modal.credit-card-information-modal
        div.content
            div.ui.segment.credit-card-information-container
                div.ui.warning.tiny.message
                    div.header Importante!
                    |Seus dados bancários não serão salvos!
                form.credit-card-information-form.ui.tiny.equal.width.form.error(autocomplete="off")
                    h4.ui.dividing.header Informação de Pagamento
                    div.ui.grid.wide.middle.aligned
                        div.row
                            div.ui.error.message
                        div.row.three.columns
                            div.column
                                div.field
                                    label Nome Impresso no Cartão
                                    input.firstFocus(type='text' id='credit-card-information-holder-name' placeholder='Nome Impresso no Cartão' )
                            div.column
                                div.field
                                    label Número do Cartão
                                    input(type='text' id='credit-card-information-number' placeholder='Número do Cartão')
                            div.column
                                div.field
                                    label Tipo de Cartão
                                    div(id='credit-card-information-card-type')
                                        div.lookup-combobox-type
                        div.row.three.columns
                            div.column
                                div.field
                                    label Código de Segurança
                                    input(type='text' id='credit-card-information-security-code' placeholder='Código de Segurança' )
                            div.column
                                div.field
                                    label Vencimento do Cartão
                                    div(id='credit-card-information-expiration-month')
                                        div.lookup-combobox-months
                            div.column
                                div.field
                                    label Ano
                                    input(type='number' data-type='number' id='credit-card-information-expiration-year' placeholder='Ano de Vencimento' )
        div.actions
            div.ui.buttons.centered.medium 
                button.ui.positive.button(type="button" onclick='{ processClick }') Processar
                div.or(data-text="ou")
                button.ui.button(type="button" onclick='{ cancelClick }') Cancelar
    script creditCardInformationTag.call(this, this.opts)
