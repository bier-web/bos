try {
	var helpers = requireModule('helpers');
	if (!internal) {
		helpers.log('dimensions -> afterCommit -> Emitindo alerta para front-end -> dimensions:changed');
		emit('dimensions:changed', this);
	}
} catch (error) {
	helpers.log('dimensions -> afterCommit -> erro desconhecido ->');
	helpers.log(error);
}
