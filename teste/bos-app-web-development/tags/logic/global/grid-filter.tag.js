/* BOS - BierOnStack */
gridFilterTag = function (opts) {
	var _self = this;
	this.rows = [];

	this.on('before-mount', function () {
		$.each(_self.opts.properties.filterColumns, function (index, value) {
			if (
				(value.visible != undefined && !value.visible) ||
				(value.permission != undefined && Object.values(_self.opts.collection.permissionOptions).indexOf(value.permission.index) < 0)
			)
				return true;

			if (_self.rows.length === 0 || _self.rows[_self.rows.length - 1].cols.length == 4) _self.rows.push({ cols: [] });

			switch (value.type) {
				case 'date':
				case 'datetime':
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 0,
						title: value.title + ' - Data Inicial'
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 0,
						isFieldCheckbox: true
					});
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 1,
						title: value.title + ' - Data Final'
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 1,
						isFieldCheckbox: true
					});
					break;
				case 'text':
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 0,
						title: value.title
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 0,
						isFieldCheckbox: true
					});
					break;
				case 'checkbox':
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 0,
						title: value.title
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 0,
						isFieldCheckbox: true
					});
					break;
				case 'number':
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 0,
						title: value.title
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 0,
						isFieldCheckbox: true
					});
					break;
				case 'icon':
					_self.rows[_self.rows.length - 1].cols.push({
						gridColumn: value,
						indexSearchInput: 0,
						title: value.title
					});
					_self.rows[_self.rows.length - 1].cols.push({
						name: value.name,
						indexSearchInput: 0,
						isFieldCheckbox: true
					});
					break;
			}
		});
	});

	this.on('mount', function () {
		let promissesWaiting = 0;
		let gridFilterOnLoad = function () {
			if (promissesWaiting == 0) {
				_self.opts.gridObject.gridFilterOnLoad();
			}
		};

		if (_self.opts.properties.filterColumns == undefined || (_self.opts.properties.filterColumns != undefined && _self.opts.properties.filterColumns.length == 0))
			_self.opts.gridObject.gridFilterOnLoad();

		var onChangeGeneric = function (column, newValue) {
			if (column.affectOnChange != undefined && column.affectOnChange.length > 0) {
				column.affectOnChange.forEach(function (elementNameAffected) {
					var _affectedElement = _self.opts.properties.filterColumns.find((x) => x.name === elementNameAffected);
					if (newValue == '') {
						delete _affectedElement.searchCollection.queryOptions[column.searchName];
					} else {
						$.extend(_affectedElement.searchCollection.queryOptions, {
							[column.searchName]: newValue
						});
					}

					riot.mount(
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 .lookup-combobox-tag',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								elementNameAffected
							)
						),
						'lookup-combobox',
						{
							placeholder: 'Pesquisar na ação',
							autoFocus: true,
							lookupName: _affectedElement.name,
							data: _affectedElement.searchData,
							collection: _affectedElement.searchCollection,
							isAllowMultiple: _affectedElement.searchIsAllowMultiple,
							fullTextSearch: _affectedElement.searchFullTextSearch,
							fieldId: _affectedElement.searchFieldId,
							defaultValue: _affectedElement.defaultValue,
							fieldDescription: _affectedElement.searchDescriptionField,
							onChange: function (newValue) {
								onChangeGeneric(_affectedElement, newValue);
							}
						}
					);
				});
			}
		};

		$.each(_self.opts.properties.filterColumns, function (index, value) {
			if (
				(value.visible != undefined && !value.visible) ||
				(value.permission != undefined && Object.values(_self.opts.collection.permissionOptions).indexOf(value.permission.index) < 0)
			)
				return true;

			switch (value.type) {
				case 'date':
					if (typeof value.filterOptions !== 'undefined') {
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).val(new Date(new Date(value.filterOptions.startDate).toDateString()).toJSON().slice(0, 10));
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1 ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).val(new Date(new Date(value.filterOptions.endDate).toDateString()).toJSON().slice(0, 10));
					}
					break;

				case 'datetime':
					if (typeof value.filterOptions !== 'undefined') {
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).val(moment(new Date(value.filterOptions.startDate)).format('YYYY-MM-DDTHH:mm'));
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1 ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).val(moment(new Date(value.filterOptions.endDate)).format('YYYY-MM-DDTHH:mm'));
					}
					break;

				case 'text':
				case 'number':
					if (typeof value.searchType !== 'undefined' && value.searchType == 'lookup') {
						promissesWaiting++;
						riot.mount(
							$(
								String.format(
									'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 .lookup-combobox',
									_self.opts.gridObject.gridIdClass,
									_self.opts.gridObject.gridId,
									value.name
								)
							),
							'lookup-combobox',
							{
								placeholder: 'Pesquisar na ação',
								autoFocus: true,
								lookupName: value.name,
								data: value.searchData,
								collection: value.searchCollection,
								isAllowMultiple: value.searchIsAllowMultiple,
								fullTextSearch: value.searchFullTextSearch,
								fieldId: value.searchFieldId,
								fieldDescription: value.searchDescriptionField,
								defaultValue: typeof value.filterOptions !== 'undefined' ? value.filterOptions.value : value.searchDefaultValue,
								onChange: function (newValue) {
									onChangeGeneric(value, newValue);
								},
								onLoad: function () {
									promissesWaiting--;
									gridFilterOnLoad();
								}
							}
						);
					}
					break;
				case 'icon':
					if (typeof value.searchType !== 'undefined' && value.searchType == 'lookup') {
						promissesWaiting++;
						riot.mount(
							$(
								String.format(
									'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 .lookup-combobox',
									_self.opts.gridObject.gridIdClass,
									_self.opts.gridObject.gridId,
									value.name
								)
							),
							'lookup-combobox',
							{
								placeholder: 'Pesquisar na ação',
								autoFocus: true,
								lookupName: value.name,
								data: value.searchData,
								collection: value.searchCollection,
								fieldId: value.searchFieldId,
								isAllowMultiple: value.searchIsAllowMultiple,
								defaultValue: typeof value.filterOptions !== 'undefined' ? value.filterOptions.value : value.searchDefaultValue,
								fieldDescription: value.searchDescriptionField,
								onLoad: function () {
									promissesWaiting--;
									gridFilterOnLoad();
								}
							}
						);
					}
					break;
				case 'checkbox':
					if (typeof value.searchType !== 'undefined' && value.searchType == 'lookup') {
						promissesWaiting++;
						riot.mount(
							$(
								String.format(
									'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0 .lookup-combobox',
									_self.opts.gridObject.gridIdClass,
									_self.opts.gridObject.gridId,
									value.name
								)
							),
							'lookup-combobox',
							{
								placeholder: 'Pesquisar na ação',
								autoFocus: true,
								lookupName: value.name,
								data: value.searchData,
								collection: value.searchCollection,
								fieldId: value.searchFieldId,
								isAllowMultiple: value.searchIsAllowMultiple,
								fieldDescription: value.searchDescriptionField,
								defaultValue: value.searchDefaultValue,
								onLoad: function () {
									promissesWaiting--;
									gridFilterOnLoad();
								}
							}
						);
					}
					break;
			}
		});

		$(String.format('{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] .ui.checkbox', _self.opts.gridObject.gridIdClass, _self.opts.gridObject.gridId)).checkbox();
		$(String.format('{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] .ui.checkbox', _self.opts.gridObject.gridIdClass, _self.opts.gridObject.gridId)).on(
			'click',
			function () {
				var checked = $(this).find('input')[0].checked;
				$(
					String.format(
						'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] .field #{2}',
						_self.opts.gridObject.gridIdClass,
						_self.opts.gridObject.gridId,
						$(this).find('input').data('field')
					)
				).attr('disabled', !checked);
				$(
					String.format(
						'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] .field #{2}',
						_self.opts.gridObject.gridIdClass,
						_self.opts.gridObject.gridId,
						$(this).find('input').data('field')
					)
				).focus();
			}
		);

		$.each(_self.opts.properties.filterColumns, function (index, value) {
			if (typeof value.filterOptions !== 'undefined' || typeof value.required != 'undefined') {
				switch (value.type) {
					case 'date':
					case 'datetime':
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						)
							.parent()
							.click();

						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).attr('disabled', typeof value.required != 'undefined' && value.required == true);
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						)
							.parent()
							.click();
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).attr('disabled', typeof value.required != 'undefined' && value.required == true);

						_self.opts.collection.filtered = true;
						break;

					case 'text':
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						)
							.parent()
							.click();
						$(
							String.format(
								'{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox ',
								_self.opts.gridObject.gridIdClass,
								_self.opts.gridObject.gridId,
								value.name
							)
						).attr('disabled', typeof value.required != 'undefined' && value.required == true);
						_self.opts.collection.filtered = true;
						break;

					default:
						break;
				}
			}
		});

		gridFilterOnLoad();
	});
};
