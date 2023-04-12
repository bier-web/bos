/* BOS - BierOnStack - File Reserved */
require('dotenv-extended').load();
var helpersServer = require('../../bos-helpers/helpers-server');
let dpd = require('../db/dpd-connection');
let notifyingClients = false;

module.exports = {
	bosServiceNotificationsManagerStart() {
		dpd.connect(function (serverDeployd) {
			let _userName = process.env.BOS_SERVICE_USER_NAME;
			let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
			serverDeployd.users.login({ username: _userName, password: _userPassword }, function (user, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Debug: bosServiceNotificationManager -> login Exception {0}', error.message));
				} else {
					setInterval(function () {
						if (!notifyingClients) {
							notifyingClients = true;
							helpersServer.showLog('BierOnStack Debug: bosServiceNotificationManager -> Running Notifications Manager Service');
							serverDeployd.appsettings.get(function (appSettings, error) {
								// let appSetting = appSettings[0];
								if (error) {
									helpersServer.showException(helpersServer.both.formatString('BierOnStack Debug: bosServciceNotificationManagger -> get Exception {0}', error.message));
								} else {
									helpersServer.showLog('BierOnStack Debug: bosServiceNotificationManager -> Reading Notifications to Notify');
									serverDeployd.notificationsmanager.get({ isNotified: false }, function (notificationsToSend, error) {
										if (notificationsToSend.length > 0) {
											helpersServer.showLog(helpersServer.both.formatString('BierOnStack Debug: bosServiceNotificationManager -> Notifying...', notificationsToSend));
											notificationsToSend.forEach((notificationToSend) => {
												notificationToSend.isNotified = true;
												notificationToSend.$limitRecursion = notificationsToSend.length;
												serverDeployd.notificationsmanager.post(notificationToSend);
											});

											notifyingClients = false;
										} else {
											helpersServer.showLog(
												'BierOnStack: Recurso BosServiceNotificationsManager :: Evento :: bosServiceNotificationsManagerStart :: Ação :: End sem nofificações'
											);
											notifyingClients = false;
										}
									});
								}
							});
						}
					}, process.env.BOS_SERVICE_NOTIFICATIONS_MANAGER_INTERVAL);
				}
			});
		});
	}
};
