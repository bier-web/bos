

riot.tag2('register', '<div class="ui green raised segment center aligned middle center"> <form class="register-form ui large form"> <div class="ui segment stacked"> <div class="field"> <div class="ui left icon input"> <input type="text" placeholder="Digite seu nome de usuário" id="register-username"><i class="user icon"></i> </div> </div> <div class="field"> <div class="ui left icon input"> <input placeholder="Digite seu e-mail" id="register-email" type="email"><i class="mail icon"></i> </div> </div> <div class="field"> <div class="ui left icon input"> <input type="text" placeholder="Digite seu nome completo" id="register-fullname"><i class="user icon"></i> </div> </div> <div class="field"> <div class="ui left icon input"> <input type="password" placeholder="Digite sua senha" id="register-password"><i class="lock icon"></i> </div> </div> <div class="field"> <div class="ui left icon input"> <input type="password" placeholder="Confirme sua senha" id="register-passwordconfirm"><i class="lock icon"></i> </div> </div> <div class="field"> <div id="register-recaptcha"></div> </div> <div class="ui error message"></div> <div class="ui buttons centered fluid small"> <button class="ui positive button" type="submit">Salvar</button> <div class="or" data-text="ou"></div> <button class="ui yellow button" type="button" onclick="{cancelClick}">Cancelar</button> </div> </div> </form> </div>', '', 'class="register-tag"', function(opts) {
registerTag.call(this, this.opts)
});