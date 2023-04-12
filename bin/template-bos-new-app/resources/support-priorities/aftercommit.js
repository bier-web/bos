try {
	let helpers = requireModule('helpers');
	let supportPriority = this;

	if (!internal) {
		emit('support-priorities:changed', this);
	}
} catch (error) {
	helpers.notifyException('support-priorities -> afterCommit -> erro desconhecido -> ');
	helpers.notifyException(error);
}
