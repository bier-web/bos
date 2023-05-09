/* BOS - BierOnStack */
let helpers = requireModule("helpers");
let exportsManagerBusiness = requireModule("exports-manager-business");
let exportManager = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso ExportsManager :: Evento :: get :: Ação :: Begin");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    if (!internal) {
        exportsManagerBusiness.canGet(ctx, bbc, me, exportManager, function (canGet) {
            if (canGet) {
                helpers.helperServer.showLog("BierOnStack: Recurso ExportsManager :: Evento :: get :: Ação :: End usuário autorizado");
                cancelIf(!canGet);
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso ExportsManager :: Evento :: get :: Ação :: End usuário não autorizado");
                cancel("Usuário não autorizado");
            }
        });
    }

    if (!internal) {
        hide("optsCollection");
        hide("queryOptions");
    }

    helpers.helperServer.showLog("BierOnStack: Recurso ExportsManager :: Evento :: get :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso ExportsManager :: Evento :: get :: Exceção :: {0}", error.message));
}
