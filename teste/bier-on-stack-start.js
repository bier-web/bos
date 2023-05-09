/* BOS - BierOnStack - File Reserved */
require('dotenv-extended').load();
let helpersServer = require('./bos-helpers/helpers-server');
let startDataBos = require('./bos-server/db/start-data-bos');
let startBos = require('./bos-server/start-bos');
let startApp = require('./bos-server/start-app');

module.exports = {
	startTheMagic: function () {
		let serverDeployd = getServerApp();
		helpersServer.pinoLogger.info('BierOnStack is Burning :)');
		serverDeployd.listen();
		serverDeployd.on('listening', function () {
			helpersServer.showLog(helpersServer.both.formatString('BierOnStack: Deployd {0} is running on port {1}', process.env.APP, process.env.DEPLOYD_APP_PORT || 5000));
			startDataBos.verifySystemData(false, function () {
				helpersServer.showLog('BierOnStack: Recurso ServiceBierOnStackStart :: Evento :: startTheMagic :: Ação :: End serviço de dados executado com sucesso');
				startBos.startBosServices();
				startApp.startAppServices();
			});
		});

		serverDeployd.on('error', function (error) {
			helpersServer.showException(helpersServer.both.formatString('Arghhh, error starting deployd: {0}', error.message));
			process.nextTick(function () {
				process.exit();
			});
		});
	}
};

require('make-runnable');
