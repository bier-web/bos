/* BOS - BierOnStack */
let helpers = requireModule('helpers');
let menusBusiness = requireModule('menus-business');
let _menu = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso Menus :: Evento :: get :: Ação :: Begin');
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (!internal) {
		menusBusiness.canGet(ctx, me, _menu, session, function (canGet) {
			helpers.helperServer.showLog(helpers.helperServer.both.formatString('BierOnStack: Recurso Menus :: Evento :: get :: Ação :: End usuário não autorizado {0}', _menu.name));
			cancelIf(!canGet);
		});
	}

	if (typeof query.include !== 'undefined' && query.include.indexOf('usergroupmenus') > -1) {
		dpd.usergroupmenus.get({ menuId: _menu.id, userGroupId: query.userGroupId, $ignoreLimitRecursion: true }, function (userGroupMenus, error) {
			if (error) {
				helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso Menus :: Evento :: get :: Exceção :: {0}', error.message));
			} else {
				helpers.helperServer.showLog('BierOnStack: Recurso Menus :: Evento :: get :: Ação :: Adicionado informações de grupo de usuário');
				_menu.userGroupMenuIsAllowed = userGroupMenus.length > 0;
				_menu.userGroupMenuId = userGroupMenus.length > 0 ? userGroupMenus[0].id : undefined;
			}
		});
	}
	helpers.helperServer.showLog('BierOnStack: Recurso Menus :: Evento :: get :: Ação :: End');
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso Menus :: Evento :: get :: Exceção :: {0}', error));
}
