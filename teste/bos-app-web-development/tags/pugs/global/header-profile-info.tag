// BOS - BierOnStack - File Reserved
header-profile-info.header-profile-info-tag
    div.ui.container
        div.ui.two.column.grid(if='!{ app.loginData.isLogged }')
            div.column
                a(href='#/login')
                    span.ui.text Já tenho cadastro
            div.column
                a(href='#/register')
                    span.ui.text Cadastre-se
        div.ui.two.column.grid(if='{ app.loginData.isLogged }')
            div.column
                img.menu-icon-profile.ui.mini.avatar.image(src='assets/imgs/user-photo-default.png')
    script headerProfileInfoTag.call(this, this.opts)                    
