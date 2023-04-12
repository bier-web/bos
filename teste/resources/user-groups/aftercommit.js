try {
	var helpers = requireModule('helpers');

	helpers.log('userGroups -> afterCommit -> begin');
	if (!internal) {
		helpers.log('userGroups -> afterCommit -> Emitindo alerta para front-end -> user-groups:changed');
		emit('user-groups:changed', this);
	}

	helpers.log('userGroups -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('userGroups -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
