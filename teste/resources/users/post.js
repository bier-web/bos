try {
	var helpers = requireModule('helpers');
	var usersBusiness = requireModule('users-business');
	var _user = this;

	helpers.log('users -> onPost -> Chamando usersBusiness -> canPost');
	usersBusiness.prepareObjectToPost(ctx, dpd, me, _user, function (userToPost) {
		helpers.log('users -> onPost -> Chamando usersBusiness -> canPost');
		usersBusiness.canPost(ctx, dpd, me, userToPost, function (canPost, message) {
			if (canPost) {
				usersBusiness.onPost(ctx, dpd, me, _user, function (userToPost) {
					_user = userToPost;
				});
			} else {
				cancel(message);
			}
		});
	});
} catch (error) {
	helpers.notifyException('users -> onPost -> Erro desconhecido ->');
	helpers.notifyException(error);
}
