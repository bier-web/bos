/*
    Módulos que são utilizados no código;
 */
var auditBusiness = requireModule('audit-business');
var securityBusiness = requireModule('security-business');
var helpers = requireModule('helpers');

var exportDefinitionsBusiness = {
	canGet: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> canGet -> begin');
			helpers.log('exportDefinitionsBusiness -> canGet -> Chamando securityBusiness -> hasPermissionToAction para validar permissão');
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, exportDefinition, 'exportdefinitions', helpers.helperServer.both.actions.read, function (canRead) {
				// retorna para a função o valor true ou false (tem ou não permissão)
				callback(canRead);
			});

			helpers.log('exportDefinitionsBusiness -> canGet -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> canGet -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canGet';
		}
	},

	/*
        O método canPost, tem como objetivo incluir validações no momento da criação do registro (inserção)
        No caso do template abaixo, está sendo feita uma validação de segurança, que é a validação mínima necessária para leitura de um registro
    */
	canPost: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> canPost -> begin');
			helpers.log('exportDefinitionsBusiness -> canPost -> chamando securityBusiness -> hasPermissionToAction');
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, exportDefinition, 'exportdefinitions', helpers.helperServer.both.actions.add, function (canAdd) {
				if (canAdd) {
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});

			helpers.log('exportDefinitionsBusiness -> canPost -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> canPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canPost';
		}
	},

	/*
        O método onPost, tem como objetivo incluir regras de negócio que são executadas após ser validada o evento de inserção.
        Ou seja, após validar com canPost, o método abaixo será executado, juntamente com os códigos necessários baseado nas regras
    */
	onPost: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> onPost -> begin');

			helpers.log('exportDefinitionsBusiness -> canPost -> chamando registro de auditoria');
			auditBusiness.logAction(dpd, helpers.helperServer.both.actions.add, loggedUser, 'exportdefinitions', '(' + exportDefinition.id + ') - ' + exportDefinition.name, ctx.req.headers['x-real-ip']);

			helpers.log('exportDefinitionsBusiness -> onPost -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> onPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onPost';
		}
	},

	/*
        O método canPut, tem como objetivo validar se o registro está atendendo as regras para a edição.
        Validações de campos obrigatórios e regras de negócios, devem ser inseridas aqui;
    */
	canPut: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportdefinitions -> canPut -> begin');
			helpers.log('exportdefinitions -> canPut -> chamando securityBusiness -> hasPermissionToAction');
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, exportDefinition, 'exportdefinitions', helpers.helperServer.both.actions.edit, function (canEdit) {
				if (canEdit) {
					/*
                    Abaixo, o padrão que deve ser mantido para validações. Atentar-se para o conceito da validação!
                    Experimente ref-dpd-canput-validation
                */
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
			helpers.log('exportdefinitions -> canPut -> end');
		} catch (error) {
			helpers.notifyException('exportdefinitions -> canPut -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canPut';
		}
	},
	/*
        O método onPut, tem como objetivo incluir regras de negócio que são executadas após ser validada o evento de edição.
        Ou seja, após validar com canPut, o método abaixo será executado, juntamente com os códigos necessários baseado nas regras
    */
	onPut: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> onPut -> begin');
			exportDefinition.systemIsPost = false;
			helpers.log('exportDefinitionsBusiness -> canPut -> Registrando log de auditoria');
			auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'exportdefinitions', '(' + exportDefinition.id + ') - ' + exportDefinition.name, ctx.req.headers['x-real-ip']);
			callback(exportDefinition);
			helpers.log('exportDefinitionsBusiness -> onPut -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> onPut -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onPut';
		}
	},

	/*
        O método canDelete, tem como objetivo validar se o registro pode ser excluído, incluindo regras de negócios e validações de permissão
    */
	canDelete: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> canDelete -> begin');
			helpers.log('exportDefinitionsBusiness -> canDelete -> chamando securityBusiness -> hasPermissionToAction');
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, exportDefinition, 'exportdefinitions', helpers.helperServer.both.actions.remove, function (canRemove) {
				/*
                    Abaixo, o padrão que deve ser mantido para validações. Atentar-se para o conceito da validação!
                */

				if (canRemove) {
					throw 'Implemente as validações de remoção da coleção';
					// Experimente ref-dpd-candelete-validation
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
			helpers.log('exportDefinitionsBusiness -> canDelete -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> canDelete -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar canDelete';
		}
	},

	/*
        O método onDelete, tem como objetivo incluir regras de negócio que são executadas após ser validada o evento de remoção.
        Ou seja, após validar com canDelete, o método abaixo será executado, juntamente com os códigos necessários baseado nas regras
    */
	onDelete: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> onDelete -> begin');
			// helpers.log('exportDefinitionsBusiness -> canPut -> Registrando log de auditoria');
			// auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'exportdefinitions', '(' + exportDefinition.id + ') - ' + exportDefinition.name, ctx.req.headers['x-real-ip']);
			helpers.log('exportDefinitionsBusiness -> onDelete -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> onDelete -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar onDelete';
		}
	},
	/*
        Todo objeto, antes do post, deve passar pelo prepareObjectToPost
        Esse método prepara o objeto para ser inserido na coleção obedecendo a dimensão do usuário (caso ele pertença)
        Além disso, os valores default devem ser setados nesse método
    */
	prepareObjectToPost: function (ctx, dpd, loggedUser, exportDefinition, callback) {
		try {
			helpers.log('exportDefinitionsBusiness -> prepareObjectToPost -> begin');
			helpers.log('exportDefinitionsBusiness -> prepareObjectToPost -> chamando securityBusiness -> prepareObjectToPost');
			securityBusiness.prepareObjectToPost(ctx, dpd, loggedUser, exportDefinition, 'exportdefinitions', function (objectToPost) {
				/*
                    Setar valores Default aqui. ex:
                    objectToPost.isActive = false
                    Seta o valor de isActive para false na insesção do objeto
                */

				exportDefinition.systemIsPost = true;

				callback(objectToPost);
			});

			helpers.log('exportDefinitionsBusiness -> prepareObjectToPost -> end');
		} catch (error) {
			helpers.notifyException('exportDefinitionsBusiness -> prepareObjectToPost -> erro desconhecido ->');
			helpers.notifyException(error);
			throw 'Erro ao chamar prepareToPost';
		}
	}
};

module.exports = exportDefinitionsBusiness;
