/* BOS - BierOnStack */
let helpers = requireModule('helpers');
let __collectioncamelcase__Business = requireModule('__boscollectionname__-business');
let __objectItem__ = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Delete :: Ação :: Begin');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	__collectioncamelcase__Business.canDelete(ctx, bos, me, __objectItem__, function (canDelete, message) {
		if (canDelete) {
			__collectioncamelcase__Business.onDelete(ctx, bos, me, __objectItem__);
		} else {
			cancel(message);
		}
		helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Delete :: Ação :: End');
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Delete :: Exceção :: {0}', error.message));
}
