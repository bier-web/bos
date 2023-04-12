/* BOS - BierOnStack - File Reserved */
var mixForCrudScreens = {
	init: function (opts) {
		var _self = this;
		var _action = opts.action;

		this.on('mount', function () {
			// configura os campos do form com máscaras, accordions, checkbox.. de acordo com o tipo;
			$(String.format('{0} .{1}-container .ui.accordion:not(.ignore)', opts.mainContainer, opts.addEditTag)).accordion();
			$(String.format('{0} .{1}-container form .ui.checkbox:not(.ignore)', opts.mainContainer, opts.addEditTag)).checkbox();
			$(String.format('{0} .{1}-container form .ui.dropdown:not(.ignore)', opts.mainContainer, opts.addEditTag)).dropdown();
			$(String.format('{0} .{1}-container .menu .item:not(.ignore)', opts.mainContainer, opts.addEditTag)).tab();
			$(String.format('{0} .{1}-container form .date-calendar:not(.ignore)', opts.mainContainer, opts.addEditTag)).calendar({
				type: 'date',
				today: true,
				monthFirst: false,
				touchReadonly: true,
				ampm: false,
				formatter: {
					date: function (date, settings) {
						if (!date) return '';
						var day = date.getDate();
						var month = date.getMonth() + 1;
						var year = date.getFullYear();
						return day + '/' + month + '/' + year;
					}
				},
				text: {
					days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
					months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
					monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
					today: 'Hoje',
					now: 'Agora',
					am: 'AM',
					pm: 'PM'
				}
			});
			$(String.format('{0} .{1}-container form .datetime-calendar:not(.ignore)', opts.mainContainer, opts.addEditTag)).calendar({
				type: 'datetime',
				today: true,
				monthFirst: false,
				touchReadonly: true,
				ampm: false,
				formatter: {
					date: function (date, settings) {
						if (!date) return '';
						var day = date.getDate();
						var month = date.getMonth() + 1;
						var year = date.getFullYear();
						return day + '/' + month + '/' + year;
					}
				},
				text: {
					days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
					months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
					monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
					today: 'Hoje',
					now: 'Agora',
					am: 'AM',
					pm: 'PM'
				}
			});

			$(String.format('{0} .{1}-container form input,textarea,div', opts.mainContainer, opts.addEditTag)).each(function () {
				var dataType = $(this).data('type');
				appApplyCustomMasks(this, dataType);

				switch (dataType) {
					case 'codemirror':
						const editor = CodeMirror.fromTextArea(this, {
							mode: 'javascript',
							theme: 'dracula',
							keymap: 'sublime',
							lineNumbers: true
						});
						editor.refresh();
						break;
					case 'money':
						$(this).mask('#.##0,00', { reverse: true });
						break;
					case 'number':
						$(this).mask('999999999999999999999999999999');
						break;
					case 'cnpj':
						$(this).mask('99.999.999/9999-99');
						break;
					case 'cep':
						$(this).mask('99999-999');
						break;
					case 'cpf':
						$(this).mask('999.999.999-99');
						break;
					case 'rg':
						$(this).mask('00.000.000-A');
						break;
					case 'pis':
						$(this).mask('00.00000.00-0');
						break;
					case 'phone':
						$(this).mask('(99) 9999-9999');
						break;
					case 'phone-mobile':
						$(this).mask('(99) 99999-9999');
						break;
					case 'phone-mobile-multi':
						$(this).mask(
							'(99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999 / (99) 99999-9999'
						);
						break;
					case 'time':
						$(this).mask('00:00');
						break;
					case 'htmleditor':
						tinymce.remove();
						tinymce.init({
							selector: String.format('{0}{1}', '#', $(this).attr('id')),
							language: 'pt_BR'
						});
						break;
					case 'address':
						var autocomplete = new google.maps.places.Autocomplete(this);
						break;
				}
			});
		});
	}
};
