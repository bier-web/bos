try {
	var helpers = requireModule('helpers');

	helpers.log('users -> afterCommit -> begin');
	if (!internal) {
		helpers.log('users -> afterCommit -> Emitindo alerta para front-end -> user:changed');
		emit('users:changed', this);
	}

	helpers.log('users -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('users -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
