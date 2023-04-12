/* BOS - BierOnStack */
let helpersServer = require('../../bos-helpers/helpers-server');
helpersServer.pinoLogger.warn(
	helpersServer.both.formatString('BierOnStack: Recurso Audit :: Evento :: delete :: Ação :: Tentativa de Apagar Log {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User')
);
cancel('BierOnStack: Não é permitido apagar logs de auditoria!');
