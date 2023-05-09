

riot.tag2('header-profile-info', '<div class="ui container"> <div class="ui two column grid" if="!{app.loginData.isLogged}"> <div class="column"><a href="#/login"><span class="ui text">Já tenho cadastro</span></a></div> <div class="column"><a href="#/register"><span class="ui text">Cadastre-se</span></a></div> </div> <div class="ui two column grid" if="{app.loginData.isLogged}"> <div class="column"><img class="menu-icon-profile ui mini avatar image" src="assets/imgs/user-photo-default.png"></div> </div> </div>', '', 'class="header-profile-info-tag"', function(opts) {
headerProfileInfoTag.call(this, this.opts)
});