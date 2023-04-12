try {
	var helpers = requireModule('helpers');
	var alertsBusiness = requireModule('alerts-business');
	var _alert = this;

	cancelUnless(me || internal, 'Você não está logado', 401);
	alertsBusiness.canDelete(ctx, dpd, me, _alert, function (canDelete) {
		if (canDelete) {
			alertsBusiness.onDelete(ctx, dpd, me, _alert);
			_alert.usersIds.forEach(function (userToAlert) {
				emit('alerts:' + userToAlert + 'alertDeleted');
			});
		} else {
			cancelIf(!canDelete, 'Usuário não autorizado');
		}
	});
} catch (error) {
	helpers.notifyException('alerts -> onDelete -> Erro desconhecido ->');
	helpers.notifyException(error);
}
