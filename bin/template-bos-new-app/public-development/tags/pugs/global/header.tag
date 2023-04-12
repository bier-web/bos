// BOS - BierOnStack - File Reserved
header.header-tag
    div.header-grid.ui.wide.grid.middle.aligned
        div.two.column.mobile.only.row
            div.fourteen.wide.column.left.aligned
                button.menu-button.ui.icon.button.mini(onclick='{showNavigation}' 
                    data-content = 'Mostrar Menu'
                    data-position='bottom center'
                    data-variation='mini')
                    i.icon.sidebar
                div.label-screen.ui.label.left.pointing.small 
                    i.circular(class='{opts.icon}')
                    | { opts.title }
            div.two.wide.column.right.aligned
                img.menu-icon-profile.ui.mini.avatar.image(src='{ user.photoUrl }')
        // Header for Desktop 
        div.three.columns.computer.tablet.only.row
            div.column.left.aligned
                button.menu-button.ui.icon.button.medium(onclick='{ showNavigation }'
                    data-content = 'Mostrar Menu'
                    data-position='bottom center'
                    data-variation='mini')
                    i.icon.sidebar
                div.label-screen.ui.label.left.pointing
                    i.circular(class='{opts.icon}')
                    | { opts.title }
            div.column.center.aligned
                div.ui.small.centered.logo.image
            div.column.right.aligned
                header-profile-info
    script headerTag.call(this, this.opts)                    
