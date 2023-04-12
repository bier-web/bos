try {
	var helpers = requireModule('helpers');
	var collectionBusiness = requireModule('user-group-menus-business');
	var _objectItem = this;

	helpers.log('userGroupMenus -> onDelete -> begin');
	helpers.log('userGroupMenus -> onDelete -> está logado ou é chamada interna?');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);

	helpers.log('userGroupMenus -> onDelete -> Chamando collectionBusiness -> canDelete');
	collectionBusiness.canDelete(ctx, dpd, me, _objectItem, function (canDelete, message) {
		if (canDelete) {
			helpers.log('userGroupMenus -> onDelete -> Chamando collectionBusiness -> canDelete ok, chamando onDelete');
			collectionBusiness.onDelete(ctx, dpd, me, _objectItem);
		} else {
			helpers.log('userGroupMenus -> onDelete -> Chamando collectionBusiness -> canDelete negado');
			cancel(message);
		}
	});

	helpers.log('userGroupMenus -> onDelete -> end');
} catch (error) {
	helpers.notifyException('userGroupMenus -> onDelete -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
