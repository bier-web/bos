/* BOS - BierOnStack */
let helpers = requireModule('helpers');
let __collectioncamelcase__Business = requireModule('__boscollectionname__-business');
let __objectItem__ = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Put :: Ação :: Begin');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	__collectioncamelcase__Business.canPut(ctx, bos, me, __objectItem__, function (canPut, message) {
		if (canPut) {
			__collectioncamelcase__Business.onPut(ctx, bos, me, previous, __objectItem__, function (objectoToPost) {
				__objectItem__ = objectoToPost;
			});
		} else {
			cancel(message);
		}
		helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Put :: Ação :: End');
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Put :: Exceção :: {0}', error));
}
