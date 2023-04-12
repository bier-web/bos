/* BOS - BierOnStack - File Reserved */
// Tag responsável por acomodar as outras tags do header da aplicação (botão de menu, notificações, foto, etc)
headerTag = function (opts) {
	// guarda na variável local o usuário logado na aplicação;
	this.user = window.loggedUser;

	// método que mostra a barra de navegação já renderizada;
	this.showNavigation = function () {
		$('.navigation-tag').sidebar({}).sidebar('toggle');
	};

	this.on('mount', function () {
		$('.menu-button').popup();
	});
};
