/* BOS - BierOnStack - File Reserved */
messageTag = function (opts) {
	this.on('mount', function () {
		$('.message-tag').modal('show');
	});

	this.closeMessage = function () {
		$('.message-tag').modal('hide');
	};

	this.processClick = function (buttonClicked) {
		if (buttonClicked.item.click !== 'undefined') buttonClicked.item.click();
		if (opts.closeAfterAction) $('.message-tag').modal('hide');
	};
};
