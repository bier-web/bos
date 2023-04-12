/* BOS - BierOnStack - File Reserved */
gridBodyTag = function (opts) {
	var _self = this;

	opts.properties.showAnimationOnUpdate = opts.properties.showAnimationOnUpdate !== undefined ? opts.properties.showAnimationOnUpdate : true;

	this.on('mount', function () {
		if (typeof opts.collection.events !== 'undefined') {
			for (index = 0; index < opts.collection.events.length; index++) {
				const element = opts.collection.events[index];

				// Eventos só podem ser configurados em collections do Deployd, em Views, que são codeResources, não é possível.
				dpd[opts.collection.name].off(element.name);
				dpd[opts.collection.name].on(element.name, function (data) {
					element.onEvent(data, opts);
				});
			}
		}

		if (opts.properties.gridType == helpersWebApp.gridType.crud && !opts.refreshData && !opts.collection.noUpdateEvent) {
			dpd[opts.collection.name].off('changed');
			dpd[opts.collection.name].on('changed', function (data) {
				if ($('#grid-item-' + data.id).length > 0) {
					if (opts.properties.showAnimationOnUpdate) {
						setTimeout(function () {
							$(String.format('#grid-item-{0}', data.id)).transition({
								animation: 'flash',
								duration: '1.5s',
								onComplete: function () {
									let gridItem = riot.mount(String.format('#grid-item-{0}', data.id), { data: data, gridProperties: opts });

									if (typeof opts.properties.item_changed !== 'undefined') {
										opts.properties.item_changed(gridItem, data);
									}

									setTimeout(function () {}, 10);
								}
							});
						}, 10);
					} else {
						let gridItem = riot.mount(String.format('#grid-item-{0}', data.id), { data: data, gridProperties: opts });

						if (typeof opts.properties.item_changed !== 'undefined') {
							opts.properties.item_changed(gridItem, data);
						}
					}
				}
			});
		}

		$('.button-tag .button').popup();
		app.loading(false);
	});
};
