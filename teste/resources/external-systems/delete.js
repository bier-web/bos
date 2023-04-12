let helpers = requireModule('helpers');
let externalSystemsBusiness = requireModule('external-systems-business');
let externalSystem = this;

try {
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	externalSystemsBusiness.canDelete(ctx, dpd, me, externalSystem, function (canDelete, message) {
		if (canDelete) {
			externalSystemsBusiness.onDelete(ctx, dpd, me, externalSystem);
		} else {
			cancel(message);
		}
	});
} catch (error) {
	helpers.notifyException('externalsystems -> onDelete -> erro desconhecido ->');
	helpers.notifyException(error);
}
