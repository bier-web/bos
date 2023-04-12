let auditBusiness = requireModule('audit-business');
let securityBusiness = requireModule('security-business');
let moment = require('moment-timezone');
let helpers = requireModule('helpers');

var supportRequestsBusiness = {
	canPost: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, supportRequest, 'supportrequests', helpers.helperServer.both.actions.add, function (canAdd) {
				if (canAdd) {
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('supportRequestsBusiness -> canPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canPost';
		}
	},
	onPost: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
		} catch (error) {
			helpers.notifyException('supportRequestsBusiness -> onPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onPost';
		}
	},
	canPut: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, supportRequest, 'supportrequests', helpers.helperServer.both.actions.edit, function (canEdit) {
				if (canEdit) {
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('supportrequests -> canPut -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	onPut: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			if (supportRequest.systemIsPost) {
				module.exports.createAlertForNewSupportRequest(dpd, loggedUser, supportRequest);
			}

			dpd.supportstatuses.get(supportRequest.supportStatusId, function (supportStatus) {
				if (supportStatus.isFinalStatus) {
					supportRequest.isConcluded = true;
				}

				auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'supportrequests', '(' + supportRequest.id + ') - ' + supportRequest.title, ctx.req.headers['x-real-ip']);
				supportRequest.systemIsPost = false;
				callback(supportRequest);
			});
		} catch (error) {
			helpers.notifyException('supportRequestsBusiness -> onPut -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	createAlertForNewSupportRequest: function (dpd, loggedUser, supportRequest) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: createAlertForNewSupportRequest :: Ação :: Begin');
			dpd.supportpriorities.get(supportRequest.supportPriorityId, function (supportPriority) {
				dpd.supportstatuses.get(supportRequest.supportStatusId, function (supportStatus) {
					if (supportPriority.isToNotification && process.env.BOS_PUSHOVER_NOTIFICATIONS == 'true') {
						let title = process.env.BOS_CUSTOMER_NAME + ' Chamado ' + supportStatus.name + ' ' + supportPriority.name + ' ' + supportRequest.uniqueId;
						let message = '<b>' + supportRequest.title + '</b>' + '\n' + supportRequest.description + '\n\n' + '<b>Comentários:</b>' + '\n';
						supportRequest.comments.forEach((comment) => {
							message += '\n' + '<b>' + comment.author + ' - </b>' + comment.message;
						});
						helpers.sendPushover(Array.from(process.env.BOS_PUSHOVER_DEVICES.split(',')), title, message, supportPriority.priorityId, 1, 3600, 60, 'magic');
					}
					dpd.systemsettings.get({ name: 'supportRequestsUserGroupsAlert' }, function (systemSettings, error) {
						if (error) {
							helpers.notifyException('createAlertForNewSupportRequest Error');
							helpers.notifyException(error);
						} else {
							if (systemSettings.length == 0) {
								helpers.notifyException('createAlertForNewSupportRequest supportRequestsUserGroupsAlert Not Found');
							} else {
								let groupUsersToAlert = systemSettings[0].value.split(',');
								dpd.usergroupusers.get(
									{
										userGroupId: {
											$in: groupUsersToAlert
										}
									},
									function (userGroupUsers, error) {
										if (error) {
											helpers.notifyException('createAlertForNewSupportRequest Error');
											helpers.notifyException(error);
										} else {
											let arrayUsersToAlert = userGroupUsers.map((ugu) => {
												return ugu.userId;
											});
											dpd.alerts.post(
												{
													typeId: 1,
													title: 'Novo Chamado!',
													alert: 'Chamado: ' + supportRequest.uniqueId + ' - Aberto por: ' + supportRequest.userNameCreated + ' - ' + supportStatus.name + ' - ' + supportPriority.name + ' - ' + supportRequest.title,
													startDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).toDate().toISOString(),
													endDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).add(1, 'days').toDate().toISOString(),
													emittedAt: new Date().toISOString(),
													usersIds: arrayUsersToAlert,
													isActive: true
												},
												function (alert, error) {
													if (error) {
														helpers.notifyException('createAlertForNewSupportRequest Error');
														helpers.notifyException(error);
													} else {
														arrayUsersToAlert.forEach((userToAlert) => {
															dpd.notificationsmanager.post({
																collectionToNotification: 'alerts',
																messageToNotification: userToAlert + 'newAlert',
																isNotified: false,
																objectToNotification: alert
															});
														});
													}
													helpers.helperServer.showLog('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: createAlertForNewSupportRequest :: Ação :: End alerta de solicitação criado');
												}
											);
										}
									}
								);
							}
						}
					});
				});
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: createAlertForNewSupportRequest :: Exceção :: {0}', error.message));
		}
	},
	notifyUsersAboutRequestChanged: function (dpd, loggedUser, supportRequest) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: notifyUsersAboutRequestChanged :: Ação :: Begin');
			dpd.supportpriorities.get(supportRequest.supportPriorityId, function (supportPriority) {
				dpd.supportstatuses.get(supportRequest.supportStatusId, function (supportStatus) {
					if (supportPriority.isToNotification && process.env.BOS_PUSHOVER_NOTIFICATIONS == 'true') {
						let title = process.env.BOS_CUSTOMER_NAME + ' novo comentário ou status ' + supportStatus.name + ' ' + supportPriority.name + ' ' + supportRequest.uniqueId;
						let message = '<b>' + supportRequest.title + '</b>' + '\n\n' + '<b>Último Comentário:</b>' + '\n';

						if (supportRequest.comments.length > 0) {
							let lastComment = supportRequest.comments[supportRequest.comments.length - 1];
							message += '\n' + '<b>' + lastComment.author + ' - </b>' + lastComment.message;
						}

						helpers.sendPushover(Array.from(process.env.BOS_PUSHOVER_DEVICES.split(',')), title, message, supportPriority.priorityId, 1, 3600, 60, 'magic');
					}

					if (loggedUser.id == supportRequest.userCreatedId) {
						dpd.systemsettings.get({ name: 'supportRequestsUserGroupsAlert' }, function (systemSettings, error) {
							if (error) {
								helpers.notifyException('notifyUsersAboutRequestChanged Error');
								helpers.notifyException(error);
							} else {
								if (systemSettings.length == 0) {
									helpers.notifyException('notifyUsersAboutRequestChanged supportRequestsUserGroupsAlert Not Found');
								} else {
									let groupUsersToAlert = systemSettings[0].value.split(',');
									dpd.usergroupusers.get(
										{
											userGroupId: {
												$in: groupUsersToAlert
											}
										},
										function (userGroupUsers, error) {
											if (error) {
												helpers.notifyException('createAlertForNewSupportRequest Error');
												helpers.notifyException(error);
											} else {
												let arrayUsersToAlert = userGroupUsers.map((ugu) => {
													return ugu.userId;
												});
												dpd.alerts.post(
													{
														typeId: 1,
														title: 'Chamado Alterado!',
														alert: 'Chamado: ' + supportRequest.uniqueId + ' - Alterado por: ' + supportRequest.lastMoveUserName + ' - ' + supportStatus.name + ' - ' + supportPriority.name + ' - ' + supportRequest.title,
														startDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).toDate().toISOString(),
														endDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).add(1, 'days').toDate().toISOString(),
														emittedAt: new Date().toISOString(),
														usersIds: arrayUsersToAlert,
														isActive: true
													},
													function (alert, error) {
														if (error) {
															helpers.notifyException('createAlertForNewSupportRequest Error');
															helpers.notifyException(error);
														} else {
															arrayUsersToAlert.forEach((userToAlert) => {
																dpd.notificationsmanager.post({
																	collectionToNotification: 'alerts',
																	messageToNotification: userToAlert + 'newAlert',
																	isNotified: false,
																	objectToNotification: alert
																});
															});
														}
													}
												);
											}
										}
									);
								}
							}
						});
					} else {
						dpd.alerts.post(
							{
								typeId: 1,
								title: 'Chamado Alterado!',
								alert: 'Chamado: ' + supportRequest.uniqueId + ' - Alterado por: ' + supportRequest.lastMoveUserName + ' - ' + supportStatus.name + ' - ' + supportPriority.name + ' - ' + supportRequest.title,
								startDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).toDate().toISOString(),
								endDate: moment().hours(0).minutes(0).seconds(0).milliseconds(0).add(1, 'days').toDate().toISOString(),
								emittedAt: new Date().toISOString(),
								usersIds: [supportRequest.userCreatedId],
								isActive: true
							},
							function (alert, error) {
								if (error) {
									helpers.notifyException('createAlertForNewSupportRequest Error');
									helpers.notifyException(error);
								} else {
									dpd.notificationsmanager.post({
										collectionToNotification: 'alerts',
										messageToNotification: supportRequest.userCreatedId + 'newAlert',
										isNotified: false,
										objectToNotification: alert
									});
								}
							}
						);
					}
				});
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: notifyUsersAboutRequestChanged :: Exceção :: {0}', error.message));
		}
	},
	canDelete: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, supportRequest, 'supportrequests', helpers.helperServer.both.actions.remove, function (canRemove) {
				if (canRemove) {
					//throw 'Implemente as validações de remoção da coleção';
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('supportRequestsBusiness -> canDelete -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	onDelete: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			// helpers.log('supportRequestsBusiness -> canPut -> Registrando log de auditoria');
			auditBusiness.logAction(dpd, helpers.helperServer.both.actions.remove, loggedUser, 'supportrequests', '(' + supportRequest.id + ') - ' + supportRequest.name, ctx.req.headers['x-real-ip']);
		} catch (error) {
			helpers.notifyException('supportRequestsBusiness -> onDelete -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onDelete';
		}
	},
	prepareObjectToPost: function (ctx, dpd, loggedUser, supportRequest, callback) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: prepareObjectToPost :: Ação :: Begin');
			securityBusiness.prepareObjectToPost(ctx, dpd, loggedUser, supportRequest, 'supportrequests', function (objectToPost) {
				dpd.systemsettings.get({ name: { $in: ['supportRequestStatusDefault', 'supportRequestPriorityDefault'] } }, function (systemSettings, error) {
					if (error) {
						helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: prepareObjectToPost :: Exceção :: {0}', error.message));
						callback(supportRequest);
					} else if (systemSettings.length == 0) {
						helpers.helperServer.showException('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: prepareObjectToPost :: Exceção :: Sem status e prioridade padrão!');
					}

					let supportRequestStatusDefault = helpers.helperServer.both.getSystemSettingFromArray(systemSettings, 'supportRequestStatusDefault');
					let supportRequestPriorityDefault = helpers.helperServer.both.getSystemSettingFromArray(systemSettings, 'supportRequestPriorityDefault');
					let newComment = {
						date: new Date(),
						message: 'Chamado Aberto',
						author: loggedUser.username
					};

					supportRequest.uniqueId = helpers.shortGuid().toUpperCase();
					supportRequest.createdAt = new Date().toISOString();
					supportRequest.userCreatedId = loggedUser.id;
					supportRequest.userNameCreated = loggedUser.username;
					supportRequest.lastMoveAt = new Date().toISOString();
					supportRequest.lastMoveUserName = loggedUser.username;
					supportRequest.userLastMoveId = loggedUser.id;
					supportRequest.systemIsPost = true;
					supportRequest.isConcluded = false;
					supportRequest.comments = [];
					supportRequest.comments.push(newComment);
					supportRequest.supportStatusId = supportRequestStatusDefault;
					supportRequest.supportPriorityId = supportRequestPriorityDefault;
					helpers.helperServer.showLog('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: prepareObjectToPost :: Ação :: Begin');
					callback(objectToPost);
				});
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportRequestsBusiness :: Evento :: prepareObjectToPost :: Exceção :: {0}', error.message));
		}
	}
};

module.exports = supportRequestsBusiness;
