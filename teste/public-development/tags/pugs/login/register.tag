// BOS - BierOnStack - File Reserved
register.register-tag
    div.ui.green.raised.segment.center.aligned.middle.center(if='{show}')
        form.register-form.ui.large.form
            div.ui.segment.stacked
                div.field
                    div.ui.left.icon.input
                        input(type="text" placeholder="Digite seu nome de usuário" id="register-username")
                        i.user.icon
                div.field
                    div.ui.left.icon.input
                        input(type="email" placeholder="Digite seu e-mail" id="register-email")
                        i.mail.icon
                div.field
                    div.ui.left.icon.input
                        input(type="text" placeholder="Digite seu nome completo" id="register-fullname")
                        i.user.icon
                div.field
                    div.ui.left.icon.input
                        input(type="password" placeholder="Digite sua senha" id="register-password")
                        i.lock.icon
                div.field
                    div.ui.left.icon.input
                        input(type="password" placeholder="Confirme sua senha" id="register-passwordconfirm")
                        i.lock.icon
                div.field
                    div#register-recaptcha
                div.ui.error.message
                div.ui.buttons.centered.fluid.small 
                    button.ui.positive.button(type="submit") Salvar
                    div.or(data-text="ou")
                    button.ui.yellow.button(type="button" onclick='{cancelClick}') Cancelar
    script registerTag.call(this, this.opts)