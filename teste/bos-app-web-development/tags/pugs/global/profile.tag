// BOS - BierOnStack - File Reserved
profile.profile-tag
    div(id='crop-image')
    div.profile-container.ui.container
        div.ui.center.aligned.grid
            div.row
                a.ui.circular.image
                    img.profile-image(src='{model.photoUrl}')
                    input.input-upload(type='file' accept='image/*')
        form.profile-form.ui.tiny.equal.width.form
            div.two.fields
                div.disabled.field
                    label Nome de Usuário
                    input(type='text' id='profile-userName' placeholder='Nome do Usuário' value='{ model.username }')
                div.disabled.field
                    label Criado em
                    input(type='text' id='profile-created' value = '{ moment(model.created).format("DD/MM/YYYY HH:mm:ss") }')
            div.two.fields
                div.field
                    label Nome
                    input(type='text' id='profile-fullName' placeholder='Nome Completo' value='{ model.fullName }')
                div.field
                    label E-mail
                    input(type='email' id='profile-email' placeholder='Endereço de E-mail' value='{ model.email }')
            div.two.fields
                div.field
                    label Senha
                    input(type='password' id='profile-password' placeholder='Senha' value='{ model.password }')
                div.field
                    label Confirmar Senha
                    input(type='password' id='profile-passwordConfirm' placeholder='Confirmar Senha' value='{ model.passwordConfirm }')
            div.ui.error.message
            div.ui.buttons.centered.small 
                button.ui.primary.button(type="submit") Salvar
    script profileTag.call(this, this.opts)