try {
	var helpers = requireModule('helpers');
	var exportDefinitionsBusiness = requireModule('export-definitions-business');
	var exportDefinition = this;

	helpers.log('exportdefinitions -> onDelete -> begin');
	helpers.log('exportdefinitions -> onDelete -> está logado ou é chamada interna?');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);

	helpers.log('exportdefinitions -> onDelete -> Chamando exportDefinitionsBusiness -> canDelete');
	exportDefinitionsBusiness.canDelete(ctx, dpd, me, exportDefinition, function (canDelete, message) {
		if (canDelete) {
			helpers.log('exportdefinitions -> onDelete -> Chamando exportDefinitionsBusiness -> canDelete ok, chamando onDelete');
			exportDefinitionsBusiness.onDelete(ctx, dpd, me, exportDefinition);
		} else {
			helpers.log('exportdefinitions -> onDelete -> Chamando exportDefinitionsBusiness -> canDelete negado');
			cancel(message);
		}
	});

	helpers.log('exportdefinitions -> onDelete -> end');
} catch (error) {
	helpers.notifyException('exportdefinitions -> onDelete -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
