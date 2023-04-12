/* BOS - BierOnStack - File Reserved */
notificationTag = function (opts) {
	var _self = this;
	this.notifications = app.notificationCount;

	this.navigateToNotificationScreen = function () {
		if (app.state in [appState.away, appState.browsing]) {
			window.location.href = '#/home';
		} else {
			iziToast.warning({
				title: '',
				message: 'Você está inserindo ou editando um registro, finalize o processo.',
				position: 'center'
			});
		}
	};
};
