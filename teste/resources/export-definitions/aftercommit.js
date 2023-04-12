try {
	var helpers = requireModule('helpers');
	var exportDefinition = this;

	helpers.log('exportdefinitions -> afterCommit -> begin');
	if (!internal) {
		helpers.log('exportdefinitions -> afterCommit -> emitindo alerta para front-end -> export-definitions:changed');
		emit('export-definitions:changed', this);
	}

	helpers.log('exportdefinitions -> afterCommit -> end');
} catch (error) {
	helpers.notifyException('exportdefinitions -> afterCommit -> erro desconhecido -> ');
	helpers.notifyException(error);
}
