/* BOS - BierOnStack */
var helpers = requireModule('helpers');
helpers.helperServer.showLog('BierOnStack Debug: Actors -> put');
helpers.helperServer.pinoLogger.warn(helpers.helperServer.both.formatString('BierOnStack: !! actors insertion attempt {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User'));

cancel('BierOnStack: Não é permitido alterar atores do sistema!');
