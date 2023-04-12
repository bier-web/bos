/* BOS - BierOnStack */
var helpers = requireModule('helpers');
helpers.helperServer.pinoLogger.warn(helpers.helperServer.both.formatString('BierOnStack: Recurso Audits :: Evento :: post :: Ação :: Tentativa de registro de log {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User'));
cancelUnless(internal, 'BierOnStack: Não é permitido inserir logs de auditoria!');
