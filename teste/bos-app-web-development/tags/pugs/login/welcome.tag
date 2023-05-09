// BOS - BierOnStack - File Reserved
welcome.welcome-tag
    div.welcome-container.ui.green.raised.segment.center.aligned.middle.center(if='{show}')
        div.ui.icon.message
            i.checkmark.icon
            div.content
                div.header Cadastro realizado com sucesso!
                p Seja Bem Vindo!
    script welcomeTag.call(this, this.opts)