/* BOS - BierOnStack - File Reserved */
gridCheckBoxTag = function (opts) {
	var _self = this;

	this.on('mount', function () {
		$('.ui.checkbox', this.root).checkbox(opts.isChecked ? 'check' : 'uncheck');

		$('.ui.checkbox', this.root).checkbox({
			onChecked: function () {
				opts.checkboxClick(true, opts.data);
			},
			onUnchecked: function () {
				opts.checkboxClick(false, opts.data);
			}
		});
	});
};
