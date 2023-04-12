try {
	var helpers = requireModule('helpers');
	var userGroupsBusiness = requireModule('user-groups-business');
	var _userGroup = this;

	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('userGroups -> onPost -> Chamando userGroupsBusiness -> canPost');
	userGroupsBusiness.canPost(ctx, dpd, me, _userGroup, function (canPost) {
		if (canPost) {
			helpers.log('userGroups -> onPost -> Chamando userGroupsBusiness -> onPost');
			userGroupsBusiness.onPost(ctx, dpd, me, _userGroup);
		} else {
			cancelIf(!canPost, 'Usuário não autorizado');
		}
	});
} catch (error) {
	helpers.notifyException('userGroups -> onPost -> Erro desconhecido ->');
	helpers.notifyException(error);
}
