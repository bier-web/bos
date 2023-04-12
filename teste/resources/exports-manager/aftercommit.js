var helpers = requireModule('helpers');

try {
	if (!internal) {
		emit('exports-manager:changed', this);
	}
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso exportsManager :: Evento :: afterCommit :: Exceção :: {0}', error.message));
}
