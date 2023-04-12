try {
	var helpers = requireModule('helpers');
	var collectionBusiness = requireModule('user-group-permissions-business');
	var _objectItem = this;

	helpers.log('userGroupPermissions -> onDelete -> begin');
	helpers.log('userGroupPermissions -> onDelete -> está logado ou é chamada interna?');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);

	helpers.log('userGroupPermissions -> onDelete -> Chamando collectionBusiness -> canDelete');
	collectionBusiness.canDelete(ctx, dpd, me, _objectItem, function (canDelete, message) {
		if (canDelete) {
			helpers.log('userGroupPermissions -> onDelete -> Chamando collectionBusiness -> canDelete ok, chamando onDelete');
			collectionBusiness.onDelete(ctx, dpd, me, _objectItem);
		} else {
			helpers.log('userGroupPermissions -> onDelete -> Chamando collectionBusiness -> canDelete negado');
			cancel(message);
		}
	});

	helpers.log('userGroupPermissions -> onDelete -> end');
} catch (error) {
	helpers.notifyException('userGroupPermissions -> onDelete -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
