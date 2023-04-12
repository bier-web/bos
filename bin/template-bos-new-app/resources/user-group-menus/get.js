var helpers = requireModule('helpers');
var userGroupMenusBusiness = requireModule('user-group-menus-business');
var _userGroupMenu = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso UserGroupMenus :: Evento :: get :: Ação :: Begin');
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (!internal) {
		userGroupMenusBusiness.canGet(ctx, dpd, me, _userGroupMenu, function (canGet) {
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroupMenus :: Evento :: get :: Ação :: End usuário não autorizado');
			cancelIf(!canGet, 'Usuário não autorizado');
		});
	}

	if (typeof query.include !== 'undefined' && query.include.indexOf('menu') > -1) {
		dpd.menus.get({ id: _userGroupMenu.menuId }, function (menu) {
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroupMenus :: Evento :: get :: Ação :: Inserindo informações de menu');
			_userGroupMenu.menuId = menu.id;
			_userGroupMenu.menuName = menu.name;
			_userGroupMenu.menuDescription = menu.description;
		});
	}
	helpers.helperServer.showLog('BierOnStack: Recurso UserGroupMenus :: Evento :: get :: Ação :: End');
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroupMenus :: Evento :: get :: Exceção :: {0}', error.message));
}
