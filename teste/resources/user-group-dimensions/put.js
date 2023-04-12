try {
	var helpers = requireModule('helpers');
	var userGroupDimensionsBusiness = requireModule('user-group-dimensions-business');
	var _userGroupDimension = this;

	cancelUnless(me || internal, 'Você não está logado', 401);
	helpers.log('userGroupDimensions -> onPut -> Chamando userGroupDimensionsBusiness -> canPost');
	userGroupDimensionsBusiness.canPut(ctx, dpd, me, _userGroupDimension, function (canPut) {
		cancelIf(!canPut, 'Usuário não autorizado');
	});

	helpers.log('userGroupDimensions -> onPut -> End');
} catch (error) {
	helpers.notifyException('userGroupDimensions -> onPut -> Erro desconhecido ->');
	helpers.notifyException(error);
}
