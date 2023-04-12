/* BOS - BierOnStack - File Reserved */
var app = new (function () {
	var navigationTag;
	var mainTag;
	var state;
	var _loadingCounter = 0;
	var previousUrl;

	var isMobile = function () {
		return (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
				navigator.userAgent
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				navigator.userAgent.substr(0, 4)
			)
		);
	};

	var bootstrapApp = function () {
		moment.locale('pt-br');
		iziToast.settings({
			timeout: false
		});
		riot.observable(app);
		this.notificationCount = 0;
		this.state = appState.away;
		this.startRoutes();
		this.notificationCount = 0;
		this.mainTag = riot.mount('#root-content', 'main-container', {
			showHeaderProfile: false,
			showHeaderAlert: false
		});
		// waiting for route-changed event;
		app.on('route-changed', function (url) {
			if (this.navigationTag) this.navigationTag[0].routed(url);
		});
		// waiting for loading event;
		app.on('loading', function (isLoading) {
			$.getJSON('https://ipapi.co/json/', function (data) {
				window.connectionData = data;
			});
			// emit event to main-container show or hide loading;
			if (this.mainTag) this.mainTag[0].loading(isLoading);
		});
	};

	var startRoutes = function (callback) {
		route.base('/');
		route.stop();
		route.start(true);
		helpersWebApp.isLogged(function (isLogged, user) {
			if (isLogged) {
				app.loadRoutesByMenus();
				app.listenUserEvents(user);
			}
		});
		route('#/login', function () {
			this.mainTag = riot.mount('#root-content', 'main-container', {
				showHeaderProfile: false,
				showHeaderAlert: true
			});
			riot.mount('#tag-container', 'login-container');
		});
		route(function () {
			window.location.href = '#/login';
		});
		if (typeof callback === 'function') callback();
	};

	var loadRoutesByMenus = function (callback) {
		// verificando as rotas e configurando de acordo com menus;
		dpd.menus.get(function (menus) {
			menus.forEach((menu) => {
				if (menu.url) {
					route(menu.url, function () {
						if (menu.url != app.previousUrl) {
							if (app.state in [appState.away, appState.browsing]) {
								appOnBeforeNavigation(menu, function (canNavigate) {
									if (canNavigate) {
										$('#tag-container').transition({
											animation: 'fade',
											onComplete: function () {
												this.mainTag = riot.mount('#root-content', 'main-container', {
													showHeaderProfile: true,
													showHeaderAlert: false
												});
												riot.mount('header', {
													title: menu.name,
													icon: menu.iconClass
												});
												riot.mount('#tag-container', menu.tagName, { menu: menu });
												app.trigger('route-changed', menu.url);
											}
										});

										app.previousUrl = menu.url;
									}
								});
							} else {
								iziToast.warning({
									title: '',
									message: 'Você está inserindo ou editando um registro, use o botão <b>Salvar</b> ou <b>Cancelar</b>',
									position: 'center',
									timeout: false
								});

								window.location.href = app.previousUrl;
							}
						}
					});
				}
			});

			if (typeof callback === 'function') callback();
		});
	};

	var loadTimeZone = function (callback) {
		dpd.systemsettings.get({ name: 'timeZone' }, function (systemSettings) {
			let timeZone = systemSettings.length == 0 ? 'America/Sao_Paulo' : systemSettings[0].value;
			callback(timeZone);
		});
	};

	var updateNotificationLabel = function (user) {
		dpd.boswrappergetdata.get(
			{
				collectionSettings: JSON.stringify({ dataType: helpersBoth.dataType.singleView, viewName: 'viewalertshome', bosAction: 'count' }),
				queryOptions: JSON.stringify({})
			},
			function (dataResult, error) {
				if (error || dataResult.result.id == helpersBoth.dataResult.error.id) {
					iziToast.error({
						title: 'Ocorreu um erro',
						message: String.format('Erro ao carregar notificações de alertas: {0}', error || dataResult.errorMessage),
						position: 'center',
						timeout: false
					});
				} else {
					app.notificationCount = dataResult.count;
					riot.mount('notification');
				}
			}
		);
	};

	var showCaptchaSolver = function (captchaToSolve) {
		if (!captchaToSolve.isCaptchaSolved) {
			iziToast.show({
				class: 'captcha-solver-izi-toast',
				backgroundColor: 'white',
				titleColor: 'orange',
				title: 'Hey humano, preciso da sua ajuda!',
				message: 'Resolve isso pra mim?',
				position: 'topCenter',
				timeout: 0,
				image: captchaToSolve.captchaImageUrl,
				imageWidth: 200,
				inputs: [['<input id=captcha-solver-result type="text">']],
				buttons: [
					[
						'<button><b>Pronto!</b></button>',
						function (instance, toast) {
							captchaToSolve.captchaResult = $('#captcha-solver-result').val();
							captchaToSolve.isCaptchaSolved = true;
							dpd.captchaSolvers.post(captchaToSolve);
							instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
						},
						true
					]
				]
			});
		} else {
			iziToast.hide({ transitionOut: 'fadeOutUp' }, $('.captcha-solver-izi-toast')[0]);
		}
	};

	var clearCaptchaSolver = function () {
		iziToast.hide({ transitionOut: 'fadeOutUp' }, $('.captcha-solver-izi-toast')[0]);
	};

	var listenUserEvents = function (user) {
		// Quando um alerta é marcado como LIDO, recebe o evento para atualização a central de notificação.
		dpd.alerts.off(user.id + 'alertRead');
		dpd.alerts.on(user.id + 'alertRead', function () {
			updateNotificationLabel(user);
		});

		// Quando um alerta é marcado como NÃO LIDO, recebe o evento para atualização a central de notificação.
		dpd.alerts.off(user.id + 'alertUnRead');
		dpd.alerts.on(user.id + 'alertUnRead', function () {
			updateNotificationLabel(user);
		});

		// Quando um alerta é inserido, recebe o evento para atualização a central de notificação.
		dpd.alerts.off(user.id + 'newAlert');
		dpd.alerts.on(user.id + 'newAlert', function () {
			updateNotificationLabel(user);
		});

		// Quando um alerta é marcado como LIDO, recebe o evento para atualização a central de notificação.
		dpd.alerts.off(user.id + 'alertDeleted');
		dpd.alerts.on(user.id + 'alertDeleted', function () {
			updateNotificationLabel(user);
		});

		// Quando um alerta é atualizado, recebe o evento para atualização a central de notificação.
		dpd.alerts.off(user.id + 'alertUpdated');
		dpd.alerts.on(user.id + 'alertUpdated', function () {
			updateNotificationLabel(user);
		});

		// Quando um robô precisa da ajuda de um usuário para resolver um captcha (captcha-solver)
		dpd.captchasolvers.off(user.id + 'newCaptchaSolver');
		dpd.captchasolvers.on(user.id + 'newCaptchaSolver', function (captchaToSolve) {
			showCaptchaSolver(captchaToSolve);
		});

		dpd.captchasolvers.off(user.id + 'deleteCaptchaSolver');
		dpd.captchasolvers.on(user.id + 'deleteCaptchaSolver', function () {
			clearCaptchaSolver();
		});

		dpd.boswrappergetdata.get(
			{
				collectionSettings: JSON.stringify({ dataType: helpersBoth.dataType.singleView, viewName: 'viewalertshome', bosAction: 'count' }),
				queryOptions: JSON.stringify({})
			},
			function (dataResult, error) {
				if (error || dataResult.result.id == helpersBoth.dataResult.error.id) {
					iziToast.error({
						title: 'Ocorreu um erro',
						message: String.format('Erro ao carregar notificações de alertas: {0}', error || dataResult.errorMessage),
						position: 'center',
						timeout: false
					});
				} else {
					app.notificationCount = dataResult.count;
					riot.mount('notification');
				}
			}
		);
	};

	var loading = function (isLoading) {
		if (_loadingCounter < 0) _loadingCounter = 0;

		if (isLoading) {
			_loadingCounter += 1;
			if (_loadingCounter == 1) {
				// emit event to main-container show or hide loading;
				app.trigger('loading', isLoading);
			}
		} else {
			_loadingCounter -= 1;
			if (_loadingCounter == 0) {
				// emit event to main-container show or hide loading;
				app.trigger('loading', isLoading);
			}
		}
	};

	return {
		bootstrapApp: bootstrapApp,
		startRoutes: startRoutes,
		loading: loading,
		isMobile: isMobile,
		loadRoutesByMenus: loadRoutesByMenus,
		listenUserEvents: listenUserEvents,
		loadTimeZone: loadTimeZone
	};
})();
