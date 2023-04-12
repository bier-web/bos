try {
	var helpers = requireModule('helpers');
	var exportDefinitionsBusiness = requireModule('export-definitions-business');
	var exportDefinition = this;

	helpers.log('exportdefinitions -> onPut -> begin');
	helpers.log('exportdefinitions -> onPut -> está logado ou é chamada interna?');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);

	helpers.log('exportdefinitions -> onPut -> Chamando exportDefinitionsBusiness -> canPut');
	exportDefinitionsBusiness.canPut(ctx, dpd, me, exportDefinition, function (canPut, message) {
		if (canPut) {
			helpers.log('exportdefinitions -> onPut -> Chamando exportDefinitionsBusiness -> canPut ok, chamando onPut');
			exportDefinitionsBusiness.onPut(ctx, dpd, me, exportDefinition, function (objectoToPost) {
				exportDefinition = objectoToPost;
			});
		} else {
			helpers.log('exportdefinitions -> onPut -> Chamando exportDefinitionsBusiness -> canPut negado');
			cancel(message);
		}
	});

	helpers.log('exportdefinitions -> onPut -> end');
} catch (error) {
	helpers.notifyException('exportdefinitions -> onPut -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
