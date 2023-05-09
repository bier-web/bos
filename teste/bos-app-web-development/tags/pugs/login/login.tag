// BOS - BierOnStack - File Reserved
login.login-tag
    div.login-tag-container.ui.grid.middle.aligned.centered.container
        div.sixteen.wide.mobile.eight.wide.tablet.six.wide.computer.column
            a(href="/")
                div.logo.float-center
            form.login-form.ui.large.form
                div.ui.segment
                    div.field
                        div.ui.left.icon.input
                            input(type="text" placeholder="Digite seu nome de usuário" id="login-username")
                            i.mail.icon
                    div.field
                        div.ui.left.icon.input
                            input(type="password" placeholder="Digite sua senha" id="login-password")
                            i.lock.icon
                    div.ui.error.message
                    div.ui.buttons.centered.fluid.small 
                        button.ui.primary.button(type="submit") Entrar
                        div.or(if='{  helpersWebApp.bosAppSettings.showRegisterOnLogin }' data-text="ou")
                        button.ui.primary.button(if='{ helpersWebApp.bosAppSettings.showRegisterOnLogin }' type="button" onclick='{ registerClick }') Registrar            
    script loginTag.call(this, this.opts)