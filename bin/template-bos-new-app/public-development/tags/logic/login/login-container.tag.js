/* BOS - BierOnStack - File Reserved */
loginContainerTag = function (opts) {
	this.on('mount', function () {
		helpersWebApp.isLogged(function (isLogged, user) {
			if (isLogged) {
				app.loadTimeZone(function (timeZone) {
					window.timeZone = timeZone;
					window.loggedUser = user;
					window.location.href = '#/home';
					moment.locale(timeZone);
				});
			} else {
				riot.mount('login', { show: true, animation: false });
			}
		});
	});
};
