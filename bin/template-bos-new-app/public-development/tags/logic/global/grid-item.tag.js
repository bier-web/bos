/* BOS - BierOnStack - File Reserved */
gridItemTag = function (opts) {
	let _self = this;
	let _iconCounter = 0;
	let _rowCounter = 0;

	let _gridProperties = opts.gridProperties;

	this.on('mount', function () {
		// depois de renderizar cada row da grid, caso exista, chama o método item_postRender definido pelo usuário, passando o elemento da dom e os dados como callback;
		_gridProperties.properties.item_postRender(_self.root, opts.data);
		$('.button-tag .button').popup();
	});

	this.on('before-mount', function () {
		_gridProperties.properties.dataColumns.forEach((column, index) => {
			column.ignoreByColSpan = column.ignoreByColSpan != undefined ? column.ignoreByColSpan : false;

			if (column.colSpan != undefined || column.colSpanField != undefined) {
				let colSpanValue = column.colSpan != undefined ? column.colSpan : opts.data[column.colSpanField];

				_gridProperties.properties.dataColumns.forEach((columnColSpan, indexColSpan) => {
					if (indexColSpan <= index) {
						return false;
					} else {
						columnColSpan.ignoreByColSpan = indexColSpan < colSpanValue;
					}
				});
			}
		});
	});

	// caso não tenha uma função passada pelo usuário (programador) para o botão, então trata como botão default, de acordo com o type;
	_self.defaultClick = function (buttonType) {
		if (typeof buttonType.item.btn.onClick !== 'undefined') {
			buttonType.item.btn.onClick(opts.data, _self);
		} else {
			switch (buttonType.item.btn.type) {
				case helpersWebApp.both().actions.edit:
					_self.editItem();
					break;

				case helpersWebApp.both().actions.remove:
					_self.removeItem();
					break;
			}
		}
	};

	_self.editItem = function (readOnly) {
		_gridProperties.gridCommandButtons.editClick(opts.data, readOnly);
	};

	_self.removeItem = function () {
		_gridProperties.gridCommandButtons.removeClick(opts.data);
	};

	_self.getIcon = function (e) {
		var ret = $.grep(_gridProperties.properties.dataColumns, function (c) {
			return c.type == 'icon';
		})[_iconCounter].icon(opts.data);
		_iconCounter++;
		return ret;
	};

	_self.getTooltip = function (e) {
		var ret = $.grep(_gridProperties.properties.dataColumns, function (c) {
			return typeof c.tooltip != 'undefined';
		})[_rowCounter].tooltip(opts.data);
		_rowCounter++;
		return ret;
	};

	_self.getLabel = function (e) {
		return $.grep(_gridProperties.properties.dataColumns, function (c) {
			return typeof c.label !== 'undefined';
		})[_iconCounter].label(opts.data);
	};

	// // método é chamado caso o usuário queira escrever uma função no itemTap do row renderizado (passado no momento de definição da grid)
	// _self.itemTap = function (e) {
	//
	//     // prepara para chamar o método, parando a propagação;
	//     e.preventDefault();
	//     e.preventUpdate = true;
	//     e.stopPropagation();
	//     // chama o método definido pelo usuário na definição da grid passando o elemento da dom e os dados como callback;
	//     _gridProperties.properties.item_tap(this.root, opts.data);
	//
	// }

	_self.columnOnClick = function (e) {
		e.preventDefault();
		e.preventUpdate = true;
		e.stopPropagation();

		if (typeof e.item.c.onClick == 'function' && e.item.c.type != 'checkbox') e.item.c.onClick(opts.data, _self);
	};
};
