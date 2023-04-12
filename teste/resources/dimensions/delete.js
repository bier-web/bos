try {
	var helpers = requireModule('helpers');
	var dimensionsBusiness = requireModule('dimensions-business');
	var _dimension = this;

	cancelUnless(me || internal, 'Você não está logado', 401);
	helpers.log('dimensions -> onDelete -> Chamando dimensionsBusiness -> canDelete');
	dimensionsBusiness.canDelete(ctx, dpd, me, _dimension, function (canDelete) {
		if (canDelete) {
			dimensionsBusiness.onDelete(ctx, dpd, me, _dimension, function (sucess, message) {
				cancelIf(!sucess, message);
			});
		} else {
			cancelIf(!canDelete, 'Usuário não autorizado');
		}
	});

	helpers.log('dimensions -> onDelete -> end');
} catch (error) {
	helpers.notifyException('dimensions -> onDelete -> Erro desconhecido ->');
	helpers.notifyException(error);
}
