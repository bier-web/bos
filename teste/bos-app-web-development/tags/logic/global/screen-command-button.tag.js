/* BOS - BierOnStack - File Reserved */
screenCommandButtonTag = function (opts) {
	var self = this;

	this.cancelClick = function () {
		$(String.format('{0} .grid-content', self.parent.opts.properties.mainContainer)).dimmer('hide');
		$(String.format('{0} {1}', self.parent.opts.properties.mainContainer, '#screen')).transition({
			animation: 'scale',
			onComplete: function () {}
		});
	};
};
