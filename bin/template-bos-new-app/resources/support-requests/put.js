let helpers = requireModule('helpers');
let supportRequestsBusiness = requireModule('support-requests-business');
let supportRequest = this;

try {
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	supportRequestsBusiness.canPut(ctx, dpd, me, supportRequest, function (canPut, message) {
		if (canPut) {
			supportRequestsBusiness.onPut(ctx, dpd, me, supportRequest, function (objectoToPost) {
				if (supportRequest.comments.length != previous.comments.length || changed('supportStatusId')) {
					supportRequest.lastMoveAt = new Date().toISOString();
					supportRequest.lastMoveUserName = me.username;
					supportRequest.userLastMoveId = me.id;
					supportRequestsBusiness.notifyUsersAboutRequestChanged(dpd, me, supportRequest);
				}
				supportRequest = objectoToPost;
			});
		} else {
			cancel(message);
		}
	});
} catch (error) {
	helpers.notifyException('supportrequests -> onPut -> erro desconhecido ->');
	helpers.notifyException(error);
}
