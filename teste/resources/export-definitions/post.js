try {
    var helpers = requireModule("helpers");
    var exportDefinitionsBusiness = requireModule("export-definitions-business");
    var exportDefinition = this;

    helpers.log("exportdefinitions -> onPost -> begin");
    helpers.log("exportdefinitions -> onPost -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("exportdefinitions -> onPost -> Chamando exportDefinitionsBusiness -> prepareObjectToPost");
    exportDefinitionsBusiness.prepareObjectToPost(ctx, bbc, me, exportDefinition, function (objectItemToPost) {
        helpers.log("exportdefinitions -> onPost -> Chamando exportDefinitionsBusiness -> canPost");
        exportDefinitionsBusiness.canPost(ctx, bbc, me, objectItemToPost, function (canPost, message) {
            if (canPost) {
                helpers.log("exportdefinitions -> onPost -> canPost ok, chamando onPost");
                exportDefinitionsBusiness.onPost(ctx, bbc, me, objectItemToPost);
            } else {
                helpers.log("exportdefinitions -> onPost -> canPost negado");
                cancel(message);
            }
        });
    });

    helpers.log("exportdefinitions -> onPost -> end");
} catch (error) {
    helpers.notifyException("exportdefinitions -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
