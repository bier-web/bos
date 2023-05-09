// BOS - BierOnStack - File Reserved
header.header-tag
    div.header-tag-container.ui.container
        div.ui.two.column.grid
            div.column
                button.menu-button.ui.icon.button.medium(if='{ app.loginData.isLogged }' onclick='{ showNavigation }'
                    data-content = 'Mostrar Menu'
                    data-position='bottom center'
                    data-variation='mini')
                    i.icon.sidebar
                div.ui.small.logo.image
            div.column
                header-profile-info
    script headerTag.call(this, this.opts)                    
