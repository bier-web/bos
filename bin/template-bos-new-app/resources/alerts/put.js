try {
	var helpers = requireModule('helpers');
	var alertsBusiness = requireModule('alerts-business');
	var alert = this;
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (typeof ctx.body.include !== 'undefined' && ctx.body.include.indexOf('setReaded') >= 0) {
		dpd.alerts.get(alert.id, function (alertUpdated, error) {
			if (error) {
				console.log(error);
			} else {
				if (ctx.body.isReaded) {
					alertUpdated.usersReadIds.push(me.id);
				} else {
					for (var i = alertUpdated.usersReadIds.length - 1; i >= 0; i--) {
						if (alertUpdated.usersReadIds[i] == me.id) {
							alertUpdated.usersReadIds.splice(i, 1);
						}
					}
				}

				alert.usersReadIds = alertUpdated.usersReadIds;
				if (ctx.body.isReaded) {
					alertUpdated.usersReadIds.forEach(function (userToAlert) {
						if (previous.usersReadIds.indexOf(userToAlert) < 0) {
							emit('alerts:' + userToAlert + 'alertRead');
						}
					});
				} else {
					previous.usersReadIds.forEach(function (userToAlert) {
						if (alertUpdated.usersReadIds.indexOf(userToAlert) < 0) {
							emit('alerts:' + userToAlert + 'alertUnRead');
						}
					});
				}
			}
		});
	}

	alertsBusiness.canPut(ctx, dpd, me, alert, function (canPut) {
		if (canPut) {
			if (changed('actorId') || changed('userGroupId') || changed('userId')) {
				alert.emittedAt = new Date().toISOString();
				alert.systemIsPost = false;
				helpers.log('alerts -> onPut -> Chamando alertsBusiness -> registerToUsers');
				alertsBusiness.registerToUsers(ctx, dpd, me, alert, function (arrayUsersToAlert) {
					alert.usersIds = arrayUsersToAlert;

					arrayUsersToAlert.forEach(function (userToAlert) {
						if (previous.usersIds.indexOf(userToAlert) < 0) {
							emit('alerts:' + userToAlert + 'newAlert');
							emit('alerts:' + userToAlert + 'updatedHomeAlerts');
						}
					});

					previous.usersIds.forEach(function (oldUserToAlert) {
						if (arrayUsersToAlert.indexOf(oldUserToAlert) < 0) {
							emit('alerts:' + oldUserToAlert + 'newAlert');
							emit('alerts:' + oldUserToAlert + 'updatedHomeAlerts');
						}
					});
				});
			}

			if (changed('isActive') || changed('startDate') || changed('endDate')) {
				alert.usersIds.forEach(function (userToAlert) {
					emit('alerts:' + userToAlert + 'alertUpdated');
				});
			}
		} else if (!(typeof ctx.body.include !== 'undefined' && ctx.body.include.indexOf('setReaded') >= 0)) {
			cancel('Usuário não autorizado');
		}
	});
} catch (error) {
	helpers.notifyException('alerts -> onPut -> Erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
