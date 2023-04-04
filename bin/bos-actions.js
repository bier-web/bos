const bosHelpers = require('../helpers/bos-helpers.js');
const bosCore = require('./bos-core.js');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

require('shelljs/global');

module.exports = {
	actionNew(bosAppName) {
		bosAppName = bosAppName || 'my-bos-app';
		if (bosHelpers.directoryExists(bosAppName)) {
			bosHelpers.log.error(`BosApp ${bosAppName} já existe nesse diretório!`);
		} else {
			bosHelpers
				.createDirectory(bosAppName)
				.then(() => {
					bosHelpers
						.createDirectory(`${bosAppName}/.bos-backend`)
						.then(() => {
							cp('-Rf', path.join(__dirname, '/template-new-bos-app/*'), bosAppName);
							const questions = [
								{
									type: 'input',
									name: 'mongoHost',
									message: `Informe endereço do servidor e porta mongodb onde ficarão seus dados`,
									default() {
										return 'ac-4obm9bc-shard-00-00.jasfylk.mongodb.net:27017,ac-4obm9bc-shard-00-01.jasfylk.mongodb.net:27017,ac-4obm9bc-shard-00-02.jasfylk.mongodb.net:27017';
									}
								},
								{
									type: 'input',
									name: 'mongoUserName',
									message: `Informe o nome do usuário do servidor mongodb`,
									default() {
										return 'youbos';
									}
								},
								{
									type: 'input',
									name: 'mongoPassword',
									message: `Informe a senha do usuário do servidor mongodb`,
									default() {
										return 'AIKghwDQhWHUTBOV';
									}
								},
								{
									type: 'input',
									name: 'mongoDatabaseName',
									message: `Informe o nome do banco de dados no seu servidor mongodb`,
									default() {
										return 'you_bos';
									}
								},
								{
									type: 'input',
									name: 'mongoReplicaSetName',
									message: `Informe o nome do replicaSet no seu servidor mongodb`,
									default() {
										return 'atlas-u0qbn9-shard-0';
									}
								}
							];

							const prompt = inquirer.createPromptModule();
							prompt(questions).then((mongoAnswers) => {
								const mongoConnectionString = `mongodb://${mongoAnswers.mongoUserName}:${mongoAnswers.mongoPassword}@${mongoAnswers.mongoHost}/${mongoAnswers.mongoDatabaseName}?ssl=true&replicaSet=${mongoAnswers.mongoReplicaSetName}&authSource=admin&retryWrites=true&w=majority`;
								bosCore
									.createBosAppFile(`${fs.realpathSync('./')}/${bosAppName}/`, mongoConnectionString, mongoAnswers.mongoDatabaseName)
									.then(() => {
										bosCore
											.tryStartBosBackend(mongoConnectionString, mongoAnswers.mongoDatabaseName, `${fs.realpathSync('./')}/${bosAppName}`)
											.then((bosBackend) => {
												bosHelpers.log.success('Conexão bosBackend feita com sucesso, configurações ok');
												bosHelpers.log.info(`Para iniciar seu projeto: cd ${bosAppName} bos start <ENTER>`);
												bosBackend.stop();
												bosHelpers.stop(1);
											})
											.catch((error) => {
												bosHelpers.log.error(`Erro tentando iniciar bosBackend: ${error}`);
											});
									})
									.catch((error) => {
										bosHelpers.log.error(`Erro criando arquivo de configuração .env do bosBackend: ${error}`);
									});
							});
						})
						.catch((error) => {
							bosHelpers.log.error(`Erro criando seu App Bos: ${bosAppName}: ${error}`);
						});
				})
				.catch((error) => {
					bosHelpers.log.error(`Erro criando seu App Bos: ${bosAppName}: ${error}`);
				});
		}
	},
	actionRemove(bosAppName) {
		inquirer
			.prompt([
				{
					type: 'confirm',
					name: 'confirmation',
					message: `Tem certeza que deseja remove o projeto ${bosAppName}?`,
					default: false
				}
			])
			.then((response) => {
				if (response.confirmation) {
					if (!bosHelpers.directoryExists(bosAppName)) {
						bosHelpers.log.info(`Não existe um BosApp ${bosAppName} nesse diretório!`);
					} else {
						bosHelpers.removeDirectory(bosAppName).catch((error) => {
							bosHelpers.log.error(`Erro apagando o projeto ${removeDir.error}...`);
						});
					}
				}
			});
	},
	startApp(options) {
		let _options = {
			port: process.env.bosBackendPort || 9090,
			env: options.environment || process.env.bosEnvironment || 'development',
			requestTimeout: process.env.bosBackendRequestTimeOut ? parseInt(process.env.bosBackendRequestTimeOut) : 1000 || 10000,
			db: {
				name: process.env.bosMongoDatabaseName,
				connectionString: process.env.bosMongoCs,
				options: {}
			}
		};

		if (_options.env !== 'development') {
			bosHelpers.log.attention(`*** BosApp em modo ${_options.env}`);
		}

		bosCore.startApp(_options);
	},
	keygen() {
		let generateKey = () => {
			bosCore
				.keygen()
				.then((key) => {
					bosHelpers.log.attention(`chave gerada ${key.substr(0, 16)}...`);
				})
				.catch((error) => {
					bosHelpers.log.error(`Erro criando a chave do seu App Bos: ${error}`);
				});
		};
		if (!bosHelpers.directoryExists('./.bos-backend')) {
			bosHelpers
				.createDirectory(`.bos-backend`)
				.then(() => {
					generateKey();
				})
				.catch((error) => {
					bosHelpers.log.error(`Erro criando a chave do seu App Bos: ${error}`);
				});
		} else {
			generateKey();
		}
	},
	showkey() {
		bosCore
			.showkey()
			.then((key) => {
				bosHelpers.log.info(`Sua chave Bos App é: \n${key}`);
			})
			.catch((error) => {
				bosHelpers.log.error(`Erro lendo chave BosApp: ${error}`);
			});
	}
};
