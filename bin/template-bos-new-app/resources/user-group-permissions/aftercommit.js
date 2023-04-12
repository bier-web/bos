try {
	var helpers = requireModule('helpers');

	helpers.log('userGroupPermissions -> afterCommit -> begin');
	helpers.log('userGroupPermissions -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('userGroupPermissions -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
