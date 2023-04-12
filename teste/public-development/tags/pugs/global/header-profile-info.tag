// BOS - BierOnStack - File Reserved
header-profile-info.header-profile-info-tag
    div.label-screen.ui.right.pointing.label { user.username }
    notification
    a(href='#/profile')
        img.menu-icon-profile.ui.mini.avatar.image(src='{ user.photoUrl }')
    script headerProfileInfoTag.call(this, this.opts)                    
