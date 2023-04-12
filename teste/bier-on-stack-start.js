/* BOS - BierOnStack - File Reserved */
require('dotenv-extended').load();
let helpersServer = require('./bos-helpers/helpers-server');
let bosDeployd = require('bos-deployd');
let startDataBos = require('./bos-server/db/start-data-bos');
let startBos = require('./bos-server/start-bos');
let startApp = require('./bos-server/start-app');

let getServerApp = function () {
	return bosDeployd({
		port: process.env.DEPLOYD_APP_PORT || 80,
		env: process.env.ENVIRONMENT || 'development',
		requestTimeout: parseInt(process.env.REQUESTTIMEOUT) || 10000,
		db: {
			connectionString: process.env.MONGO_CS || '',
			host: process.env.MONGO_SERVER,
			port: process.env.MONGO_PORT,
			name: process.env.MONGO_DATABASE,
			credentials: {
				username: process.env.MONGO_USER,
				password: process.env.MONGO_PASSWORD
			}
		}
	});
};

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
