const bosBackend = require('bos-backend');
const bosHelpers = require('../helpers/bos-helpers.js');
const bosKeys = require('../helpers/bos-keys.js');
const fs = require('fs');
const moment = require('moment-timezone');

require('shelljs/global');

module.exports = {
	prepareBosApp() {
		return new Promise((resolve, reject) => {
			let exec = require('child_process').exec;
			exec(`npm install`, function (error, stdout, stderr) {
				if (error !== null) {
					reject(error);
				} else {
					bosHelpers.log.info(stdout);
					exec(`npm i riot@3.10.1 -g && npm i pug -g && npm i less@2.7.2 -g && npm i bos-watcherless -g`, function (error, stdout, stderr) {
						if (error !== null) {
							reject(error);
						} else {
							bosHelpers.log.info(stdout);
							bosHelpers.log.success('*** Dependências instaladas, iniciando compilação');

							module.exports
								.buildTags()
								.then(() => {
									bosHelpers.log.success('*** Componentes riot compilados com sucesso!');
									module.exports
										.buildLess()
										.then(() => {
											bosHelpers.log.success('*** Classes css compiladas com sucesso!');
											resolve();
										})
										.catch((error) => {
											bosHelpers.log.error(`*** Erro classes css ${error}`);
											reject(error);
										});
								})
								.catch((error) => {
									bosHelpers.log.error(`*** Erro compilando componentes riot ${error}`);
									reject(error);
								});
						}
					});
				}
			});
		});
	},
	buildTags() {
		return new Promise((resolve, reject) => {
			let exec = require('child_process').exec;
			exec(`riot --template pug public-development/tags/pugs/ public-development/assets/bos-client/tags`, function (error, stdout, stderr) {
				if (error !== null) {
					reject(error);
				} else {
					bosHelpers.log.info(stdout);
					resolve();
				}
			});
		});
	},
	buildLess() {
		return new Promise((resolve, reject) => {
			let exec = require('child_process').exec;
			exec(`npm install`, function (error, stdout, stderr) {
				if (error !== null) {
					reject(error);
				} else {
					exec(`boswatcherless public-development/tags/styles public-development/assets/css -j -c`, function (error, stdout, stderr) {
						if (error !== null) {
							reject(error);
						} else {
							bosHelpers.log.info(stdout);
							resolve();
						}
					});
				}
			});
		});
	},
	tryStartBosBackend(mongoConnectionString, mongoDatabaseName, dirServer) {
		return new Promise((resolve, reject) => {
			try {
				const bosBackEnd = bosBackend({
					server_dir: dirServer,
					port: 9090,
					env: 'development',
					db: {
						name: mongoDatabaseName,
						connectionString: mongoConnectionString,
						options: {}
					}
				});

				bosBackEnd.listen();
				bosBackEnd.on('listening', function () {
					resolve(bosBackEnd);
				});

				bosBackEnd.on('error', function (error) {
					reject(error);
				});
			} catch (error) {
				reject(error);
			}
		});
	},
	createBosAppFile(bosAppName, mongoConnectionString, mongoDatabaseName) {
		return new Promise((resolve, reject) => {
			try {
				let envFile =
					`bosAppName=${bosAppName}` +
					`\nbosEnvironment=development` +
					`\nbosMongoCs=${mongoConnectionString}` +
					`\nbosMongoDatabaseName=${mongoDatabaseName}` +
					`\nbosBackendPort=9090` +
					`\nbosBackendRequestTimeOut=1000` +
					`\nbosMoment_Locale=pt-br`;
				fs.writeFile(`${bosAppName}.env`, envFile, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	},
	startApp(options) {
		let getBosBackendServer = function (options) {
			return (bosBackEnd = bosBackend(options));
		};

		let applySettings = (callback) => {
			moment.locale(process.env.bosMoment_Locale);
			callback();
		};
		applySettings(() => {
			let bosBackendServer = getBosBackendServer(options);
			bosBackendServer.listen();
			bosBackendServer.on('listening', function () {
				bosHelpers.log.info(`*** BosApp ${process.env.bosAppName} rodando na porta ${process.env.bosBackendPort}`);
				// helpersServer.showLog(helpersServer.both.formatString('BierOnStack: Deployd {0} is running on port {1}', process.env.APP, process.env.DEPLOYD_APP_PORT || 5000));
				// startDataBos.verifySystemData(false, function () {
				//  helpersServer.showLog('BierOnStack: Recurso ServiceBierOnStackStart :: Evento :: startTheMagic :: Ação :: End serviço de dados executado com sucesso');
				//  startBos.startBosServices();
				//  startApp.startAppServices();
				// });
			});

			bosBackendServer.on('error', function (error) {
				// helpersServer.showException(helpersServer.both.formatString('Arghhh, error starting deployd: {0}', error.message));
				// process.nextTick(function () {
				//  process.exit();
				// });
			});
		});
	},
	showkey() {
		return new Promise((resolve, reject) => {
			try {
				let _bosKeys = new bosKeys();
				if (_bosKeys.path.indexOf('.bos-backend') === 0 && !fs.existsSync('.bos-backend')) fs.mkdirSync('.bos-backend');

				_bosKeys.getLocal(function (error, key) {
					if (error) {
						reject(error);
					} else {
						if (!key) {
							reject('Não existe chave criada, use bos keygen');
						} else {
							resolve(key);
						}
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	},
	keygen() {
		return new Promise((resolve, reject) => {
			try {
				let _bosKeys = new bosKeys();
				if (_bosKeys.path.indexOf('.bos-backend') === 0 && !fs.existsSync('.bos-backend')) fs.mkdirSync('.bos-backend');

				_bosKeys.create(function (error, key) {
					if (error) reject(error);
					else resolve(key);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
};
