var helpers = requireModule("helpers");
var userGroupDimensionsBusiness = requireModule("user-group-dimensions-business");
var _userGroupDimension = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Ação :: Begin");
    cancelUnless(me || internal, "Você não está logado", 401);

    if (!internal) {
        userGroupDimensionsBusiness.canGet(ctx, bbc, me, _userGroupDimension, function (canGet) {
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Ação :: End usuário não autorizado");
            cancelIf(!canGet, "Usuário não autorizado");
        });
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("dimension") > -1) {
        bbc.dimensions.get(_userGroupDimension.dimensionId, function (dimension, error) {
            if (error) {
                helpers.helperServer.showException(
                    helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Exceção :: {0}", error.message)
                );
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Ação :: Inserindo dados da dimensão");
                _userGroupDimension.dimensionId = dimension.id;
                _userGroupDimension.dimensionName = dimension.name;
                _userGroupDimension.dimensionCollection = dimension.collectionName;
                _userGroupDimension.dimensionCollectionField = dimension.collectionField;
                _userGroupDimension.dimensionUserField = dimension.userField;
            }
        });
    }

    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupDimensions :: Evento :: get :: Exceção :: {0}", error.message));
}
