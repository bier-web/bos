try {
	var helpers = requireModule('helpers');
	var alert = this;
	if (!internal) {
		alert.isVisualized = alert.usersReadIds.indexOf(me.id) >= 0;
		if (typeof ctx.body.include === 'undefined' || (typeof ctx.body.include !== 'undefined' && ctx.body.include.indexOf('no_emit') < 0)) emit('alerts:changed', alert);
	}
} catch (error) {
	helpers.notifyException('alerts -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
