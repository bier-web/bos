let helpers = requireModule('helpers');

try {
	let supportPrioritiesBusiness = requireModule('support-priorities-business');
	let supportPriority = this;

	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	supportPrioritiesBusiness.prepareObjectToPost(ctx, dpd, me, supportPriority, function (objectItemToPost) {
		supportPrioritiesBusiness.canPost(ctx, dpd, me, objectItemToPost, function (canPost, message) {
			if (canPost) {
				supportPrioritiesBusiness.onPost(ctx, dpd, me, objectItemToPost);
			} else {
				cancel(message);
			}
		});
	});
} catch (error) {
	helpers.notifyException('support-priorities -> onPost -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
