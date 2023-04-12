// BOS - BierOnStack - File Reserved
lookup-combobox.lookup-combobox-tag
	div.ui.fluid.search.selection.dropdown(class='{ "multiple": opts.isAllowMultiple } { "disabled": opts.isDisabled } }' data-position='bottom center' data-variation='mini' data-content='{ opts.tooltip }')
		input(type='hidden' id='{ opts.formFieldId }' name='{ opts.formFieldId }' autocomplete="nope")
		i.dropdown.icon
		i.remove.icon(if='{ !opts.isAllowMultiple }')
		i.refresh.icon(if='{ opts.isLargeDropDown }')
		div.default.text { opts.placeholder }
		div.menu
			div.item(each='{items}' data-value='{ fieldId!=undefined ? this[fieldId] : id }') { this.parent.getLookupDescription(this, fieldDescription, fieldType, fieldFormat)  }
	script lookupComboBoxTag.call(this, this.opts)
