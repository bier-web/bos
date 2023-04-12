try {
	var helpers = requireModule('helpers');
	var userGroupMenusBusiness = requireModule('user-group-menus-business');
	var _userGroupMenu = this;

	helpers.log('userGroupMenus -> onPut -> begin');
	helpers.log('userGroupMenus -> onPut -> Validando permissões');
	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('userGroupMenus -> onGet -> Chamando userGroupBusiness -> canGet');
	if (!internal) {
		userGroupMenusBusiness.canPut(ctx, dpd, me, _userGroupMenu, function (canPut) {
			cancelIf(!canPut, 'Usuário não autorizado');
		});
	}

	helpers.log('userGroupMenus -> onPut -> end');
} catch (error) {
	helpers.notifyException('userGroupMenus -> onPut -> Erro desconhecido ->');
	helpers.notifyException(error);
}
