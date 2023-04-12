/* BOS - BierOnStack - File Reserved: ToChange */
let helpersServer = require('../bos-helpers/helpers-server');
let nedServiceImportMailings = require('./services/ned-service-import-mailings');

var startAppServices = {
	startAppServices: async function () {
		try {
			helpersServer.showLog('BierOnStack: Recurso StartApp :: Evento :: startAppServices :: Ação :: Start iniciando serviços de aplicação');
			process.setMaxListeners(Infinity);
			if (process.env.NED_SERVICE_IMPORT_MAILINGS) {
				nedServiceImportMailings.nedServiceImportMailingStart();
			}
		} catch (error) {
			helpersServer.showException(helpersServer.both.formatString('BierOnStack Debug:  ->  Exception {0}', JSON.stringify(error)));
		}
	}
};

module.exports = startAppServices;
