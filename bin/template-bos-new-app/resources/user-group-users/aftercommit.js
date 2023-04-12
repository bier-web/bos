try {
	var helpers = requireModule('helpers');

	helpers.log('userGroupUsers -> afterCommit -> begin');
	helpers.log('userGroupUsers -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('userGroupUsers -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
