/* BOS - BierOnStack - File Reserved */
var helpersServer = require('../../bos-helpers/helpers-server');
require('dotenv-extended').load();
let dpd = require('../db/dpd-connection');

module.exports = {
	bosServiceSecurityStart() {
		dpd.connect(function (server) {
			let _userName = process.env.BOS_SERVICE_USER_NAME;
			let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
			server.users.login({ username: _userName, password: _userPassword }, function (user, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Debug: bosServiceSecurity -> get Exception {0}', error.message));
				} else {
					console.log(moment(new Date()).tz('America/Sao_Paulo').format('lll'), 'bosServiceSecurityStart - Logado');
					server.users.get({ isActive: true }, function (users) {
						users.forEach((user) => {
							dpd.connect(function (serverLogin) {
								serverLogin.users.login(
									{
										username: user.username,
										password: user.username
									},
									function (user, error) {
										if (error) {
											console.log(moment(new Date()).tz('America/Sao_Paulo').format('lll'), 'bosServiceSecurityStart - Usuário OK, senha não é padrão', error);
										} else {
											serverLogin.users.me(function (loggedUser) {
												console.log(
													moment(new Date()).tz('America/Sao_Paulo').format('lll'),
													'bosServiceSecurityStart - !!! Alerta de Segurança (usuário com senha padrão)',
													loggedUser.username
												);
												loggedUser.isActive = false;
												serverLogin.users.post(loggedUser, function () {
													console.log(
														moment(new Date()).tz('America/Sao_Paulo').format('lll'),
														'bosServiceSecurityStart - Usuário desativado: ',
														loggedUser.username
													);
												});
											});
										}
									}
								);
							});
						});
					});
				}
			});
		});
	}
};
