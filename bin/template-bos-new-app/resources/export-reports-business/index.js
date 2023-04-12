var auditBusiness = requireModule('audit-business');
var securityBusiness = requireModule('security-business');
var helpers = requireModule('helpers');

var exportReportsBusiness = {
	canGet: function (ctx, dpd, loggedUser, exportReport, query, callback) {
		try {
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, exportReport, 'exportreports', helpers.helperServer.both.actions.read, function (canRead) {
				if (canRead) {
					callback(true);
				} else {
					callback(false, 'Usuário não tem permissão');
				}
			});
		} catch (error) {
			helpers.notifyException('exportsManagerBusiness -> canGet -> erro desconhecido ->');
			helpers.notifyException(error);
		}
	}
};

module.exports = exportReportsBusiness;
