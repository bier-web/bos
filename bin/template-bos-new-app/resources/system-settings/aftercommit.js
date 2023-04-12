try {
	var helpers = requireModule('helpers');

	helpers.log('systemSettings -> afterCommit -> begin');
	if (!internal) {
		helpers.log('systemSettings -> afterCommit -> Emitindo alerta para front-end -> systemsettings:changed');
		emit('system-settings:changed', this);
	}

	helpers.log('systemSettings -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('systemSettings -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
