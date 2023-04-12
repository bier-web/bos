let helpers = requireModule('helpers');

try {
	let supportStatus = this;

	if (!internal) {
		emit('support-statuses:changed', supportStatus);
	}
} catch (error) {
	helpers.notifyException('supportstatuses -> afterCommit -> erro desconhecido -> ');
	helpers.notifyException(error);
}
