/* BOS - BierOnStack */
var helpers = requireModule('helpers');

try {
	let auditBusiness = requireModule('audit-business');
	let _audit = this;

	cancelUnless(me || internal, 'Você não está logado', 401);
	if (!internal) {
		auditBusiness.canGet(ctx, dpd, me, _audit, function (canGet) {
			cancelIf(!canGet, 'Usuário não autorizado');
		});
	}

	switch (_audit.actionId) {
		case 0:
			_audit.actionDescription = 'Inseriu Registro';
			break;
		case 1:
			_audit.actionDescription = 'Editou Registro';
			break;
		case 2:
			_audit.actionDescription = 'Apagou Registro';
			break;
		case 9:
			_audit.actionDescription = 'Entrou no Sistema';
			break;
		case 17:
			_audit.actionDescription = 'Tentou logar';
			break;
		case 18:
			_audit.actionDescription = 'Tentou acessar recurso';
			break;
	}
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso Audit :: Evento :: get :: Exceção :: {0}', error.message));
}
