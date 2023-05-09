/* BOS - BierOnStack */
let helpers = requireModule("helpers");
let __objectItem__ = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: AfterCommit :: Ação :: Begin");
    bbc.__collection__.get({ id: __objectItem__.id, paginationSettings: { skip: 0, limit: 1 } }, function (__collection__) {
        let objectItemFromCollection = __collection__.data[0];
        emit("__collection__:changed", objectItemFromCollection);
        helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: aftercommit :: Ação :: End");
    });
} catch (error) {
    helpers.helperServer.showException(
        helpers.helperServer.both.formatString("BierOnStack: Recurso __boscollectionname__ :: Evento :: AfterCommit :: Exceção :: {0}", error.message)
    );
}
