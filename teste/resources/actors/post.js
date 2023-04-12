/* BOS - BierOnStack */
var helpers = requireModule('helpers');
helpers.helperServer.showLog('BierOnStack Debug: Actors -> post');
helpers.helperServer.pinoLogger.warn(helpers.helperServer.both.formatString('BierOnStack: !! actors insertion attempt {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User'));

cancelUnless(internal, 'BierOnStack: Não é permitido inserir atores de sistema!');
