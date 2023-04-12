/* BOS - BierOnStack - File Reserved */
let helpersServer = require('../bos-helpers/helpers-server');
let bosServiceNotificationsManager = require('./services/bos-service-notifications-manager');
let bosServiceSecurity = require('./services/bos-service-security');
let bosServiceExportsManager = require('./services/bos-service-exports-manager');

module.exports = {
	startBosServices: function () {
		try {
			helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: Begin');

			process.setMaxListeners(Infinity);
			if (process.env.BOS_SERVICES_ACTIVE) {
				helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: Ativando serviços habilitados');
				if (process.env.BOS_SERVICE_NOTIFICATIONS_MANAGER) {
					helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: Iniciando serviço de notificações');
					bosServiceNotificationsManager.bosServiceNotificationsManagerStart();
				}
				if (process.env.BOS_SERVICE_SECURITY) {
					helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: Iniciando serviço de segurança');
					bosServiceSecurity.bosServiceSecurityStart();
				}
				if (process.env.BOS_SERVICE_EXPORTS_MANAGER) {
					helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: Iniciando serviço de exportação de relatórios');
					bosServiceExportsManager.bosServiceExportsManagerStart();
				}
			}
			helpersServer.showLog('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Ação :: End');
		} catch (error) {
			helpersServer.showException(helpersServer.both.formatString('BierOnStack: Recurso startBos :: Evento :: startBosServices :: Exceção :: {0}', error.message));
		}
	}
};
