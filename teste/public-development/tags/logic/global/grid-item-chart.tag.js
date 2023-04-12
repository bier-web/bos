/* BOS - BierOnStack - File Reserved */
gridItemChartTag = function (opts) {
	this.on('mount', function () {
		opts.data.chartColumns.forEach((cc) => {
			cc.data = opts.gridProperties.data[0][cc.subCollection];
			riot.mount($(String.format('{0} .grid-content[data-id={1}] table tbody[data-id={1}] #{2}', opts.gridProperties.gridObject.gridIdClass, opts.gridProperties.gridObject.gridId, cc.name)), cc.name, cc);
		});
	});
};
