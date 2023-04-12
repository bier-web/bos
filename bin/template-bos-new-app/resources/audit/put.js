/* BOS - BierOnStack */
var helpers = requireModule('helpers');
helpers.helperServer.pinoLogger.warn(helpers.helperServer.both.formatString('BierOnStack: !! audit insertion attempt {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User'));

cancel('BierOnStack: Não é permitido alterar logs de auditoria!');
