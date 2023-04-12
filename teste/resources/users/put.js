try {
	var helpers = requireModule('helpers');
	var usersBusiness = requireModule('users-business');
	var _user = this;
	helpers.log('users -> onPut -> Validando permissões');
	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('users -> onPut -> Chamando UserBusiness -> onPut');
	usersBusiness.canPut(ctx, dpd, me, _user, function (canPut) {
		if (canPut) {
			helpers.log('users -> onPost -> Chamando UserBusiness -> onPost');
			usersBusiness.onPut(ctx, dpd, me, _user, function (_userToPost) {
				_user = _userToPost;
			});
		} else {
			cancelIf(!canPut);
		}
	});
} catch (error) {
	helpers.notifyException('users -> onPut -> erro desconhecido ->');
	helpers.notifyException(error);
}
