try {
	var helpers = requireModule('helpers');
	var userGroupsBusiness = requireModule('user-groups-business');
	var _userGroup = this;

	helpers.log('userGroups -> onDelete -> begin');
	helpers.log('userGroups -> onDelete -> Validando permissões');
	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('userGroups -> onDelete -> Chamando userGroupsBusiness -> canPut');
	userGroupsBusiness.canDelete(ctx, dpd, me, _userGroup, function (canDelete, message) {
		if (canDelete) {
			userGroupsBusiness.onDelete(ctx, dpd, me, _userGroup, function () {});
		} else {
			cancel(message);
		}
	});

	helpers.log('userGroups -> onDelete -> end');
} catch (error) {
	helpers.notifyException('userGroups -> onDelete -> Erro desconhecido ->');
	helpers.notifyException(error);
}
