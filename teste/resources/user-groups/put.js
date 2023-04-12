try {
	var helpers = requireModule('helpers');
	var userGroupsBusiness = requireModule('user-groups-business');
	var _userGroup = this;

	helpers.log('userGroups -> onPut -> begin');
	helpers.log('userGroups -> onPut -> Validando permissões');
	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('userGroups -> onPut -> Chamando userGroupsBusiness -> canPut');
	userGroupsBusiness.canPut(ctx, dpd, me, _userGroup, function (canPut) {
		cancelIf(!canPut, 'Usuário não autorizado');
	});

	helpers.log('userGroups -> onPut -> end');
} catch (error) {
	helpers.notifyException('userGroups -> onPut -> Erro desconhecido ->');
	helpers.notifyException(error);
}
