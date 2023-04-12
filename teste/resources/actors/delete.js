/* BOS - BierOnStack File Reserved*/
let helpersServer = require('../../bos-helpers/helpers-server');
helpersServer.showLog('BierOnStack: Recurso Actors :: Evento :: Delete :: Ação :: Begin');
helpersServer.pinoLogger.warn(helpersServer.both.formatString('BierOnStack: !! actors deletion attempt {0} !!', typeof me != 'undefined' ? me.username : 'No Logged User'));
cancel('BierOnStack: Não é permitido apagar atores de sistema!');
