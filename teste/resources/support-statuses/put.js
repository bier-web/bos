let helpers = requireModule('helpers');

try {
	let supportStatusesBusiness = requireModule('support-statuses-business');
	let supportStatus = this;

	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	supportStatusesBusiness.canPut(ctx, dpd, me, supportStatus, function (canPut, message) {
		if (canPut) {
			supportStatusesBusiness.onPut(ctx, dpd, me, supportStatus, function (objectoToPost) {
				supportStatus = objectoToPost;
			});
		} else {
			cancel(message);
		}
	});
} catch (error) {
	helpers.notifyException('supportstatuses -> onPut -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
