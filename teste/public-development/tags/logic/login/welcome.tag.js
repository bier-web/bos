/* BOS - BierOnStack - File Reserved */
welcomeTag = function (opts) {
	var self = this;

	this.on('before-mount', function () {
		this.show = opts.show;
	});

	this.on('mount', function () {
		if (opts.show) {
			$('.login-container-tag .login-container-grid').transition({
				animation: 'fade left',
				onComplete: function () {
					$('.register-tag').hide();
					$('.welcome-tag').show();
					$('.login-container-tag .login-container-grid').transition({
						animation: 'fade right',
						onComplete: function () {
							setTimeout(function () {
								helperClient.isLogged(function (isLogged, user) {
									if (isLogged) {
										app.loadRoutesByMenus(function () {
											window.loggedUser = user;
											app.mainTag = riot.mount('#root-content', 'main-container', { showHeader: true });
											window.location.href = '#/home';

											app.listenUserEvents(user);
										});
									} else {
										riot.mount('login', { show: true, animation: false });
									}
								});
							}, 2000);
						}
					});
				}
			});
		}
	});
};
