var helpers = requireModule('helpers');

try {
	var exportsManagerBusiness = requireModule('exports-manager-business');
	var exportManager = this;
	cancelUnless(internal, 'Usuário não autorizado!', 401);
	exportsManagerBusiness.onDelete(ctx, dpd, me, exportManager);
} catch (error) {
	helpers.notifyException('exports-manager -> onDelete -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
