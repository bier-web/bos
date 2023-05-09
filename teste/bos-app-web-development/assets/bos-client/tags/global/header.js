

riot.tag2('header', '<div class="header-tag-container ui container"> <div class="ui two column grid"> <div class="column"> <button class="menu-button ui icon button medium" if="{app.loginData.isLogged}" onclick="{showNavigation}" data-content="Mostrar Menu" data-position="bottom center" data-variation="mini"><i class="icon sidebar"></i></button> <div class="ui small logo image"></div> </div> <div class="column"> <header-profile-info></header-profile-info> </div> </div> </div>', '', 'class="header-tag"', function(opts) {
headerTag.call(this, this.opts)
});