let auditBusiness = requireModule('audit-business');
let securityBusiness = requireModule('security-business');
let helpers = requireModule('helpers');

var externalSystemsBusiness = {
	canGet: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, externalSystem, 'externalsystems', helpers.helperServer.both.actions.read, function (canRead) {
				callback(canRead);
			});
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> canGet -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	canPost: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, externalSystem, 'externalsystems', helpers.helperServer.both.actions.add, function (canAdd) {
				if (canAdd) {
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> canPost -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	onPost: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> onPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onPost';
		}
	},
	canPut: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, externalSystem, 'externalsystems', helpers.helperServer.both.actions.edit, function (canEdit) {
				if (canEdit) {
					let _errorCode = 0;
					if (externalSystem.name == '') _errorCode = 1;

					switch (_errorCode) {
						case 0:
							callback(true);
							break;
						case 1:
							callback(false, 'O campo nome é obrigatório');
							break;
					}
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('externalsystems -> canPut -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	onPut: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			externalSystem.systemIsPost = false;
			throw 'Implemente o log onPut da coleção';
			// auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'externalsystems', '(' + externalSystem.id + ') - ' + externalSystem.name, ctx.req.headers['x-real-ip']);
			callback(externalSystem);
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> onPut -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	canDelete: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, externalSystem, 'externalsystems', helpers.helperServer.both.actions.remove, function (canRemove) {
				if (canRemove) {
					throw 'Implemente as validações de remoção da coleção';
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> canDelete -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canDelete';
		}
	},
	onDelete: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			// helpers.log('externalSystemsBusiness -> canPut -> Registrando log de auditoria');
			auditBusiness.logAction(dpd, helpers.helperServer.both.actions.remove, loggedUser, 'externalsystems', '(' + externalSystem.id + ') - ' + externalSystem.name, ctx.req.headers['x-real-ip']);
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> onDelete -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	},
	prepareObjectToPost: function (ctx, dpd, loggedUser, externalSystem, callback) {
		try {
			securityBusiness.prepareObjectToPost(ctx, dpd, loggedUser, externalSystem, 'externalsystems', function (objectToPost) {
				externalSystem.systemIsPost = true;
				callback(objectToPost);
			});
		} catch (error) {
			helpers.notifyException('externalSystemsBusiness -> prepareObjectToPost -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	}
};

module.exports = externalSystemsBusiness;
