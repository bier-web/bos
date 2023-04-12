/* BOS - BierOnStack - File Reserved */
logoutTag = function (opts) {
	var self = this;
	this.on('mount', function () {
		dpd.users.logout(function () {
			app.startRoutes(function () {
				app.navigationTag = undefined;
				window.location.href = '#/login';
			});
		});
	});
};
