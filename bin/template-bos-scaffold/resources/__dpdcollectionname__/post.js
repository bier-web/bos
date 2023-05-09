/* BOS - BierOnStack - File Reserved: ToChange */
let helpers = requireModule('helpers');
let __collectioncamelcase__Business = requireModule('__boscollectionname__-business');
let __objectItem__ = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Post :: Ação :: Begin');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	__collectioncamelcase__Business.prepareObjectToPost(ctx, bos, me, __objectItem__, function (objectItemToPost) {
		__collectioncamelcase__Business.canPost(ctx, bos, me, objectItemToPost, function (canPost, message) {
			if (canPost) {
				__collectioncamelcase__Business.onPost(ctx, bos, me, objectItemToPost);
			} else {
				cancel(message);
			}
			helpers.helperServer.showLog('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Post :: Ação :: End');
		});
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso __collectioncamelcase__ :: Evento :: Post :: Exceção :: {0}', error));
}
