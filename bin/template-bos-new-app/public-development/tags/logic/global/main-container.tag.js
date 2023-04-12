/* BOS - BierOnStack - File Reserved */
mainContainerTag = function (opts) {
	this.loading = function (isLoading) {
		$('.main-loading').dimmer(isLoading ? 'show' : 'hide');
	};
};
