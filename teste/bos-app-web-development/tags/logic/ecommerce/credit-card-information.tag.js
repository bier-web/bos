/* BOS - BierOnStack - File Reserved */
creditCardInformationTag = function (opts) {
	var _self = this;

	// adiciona na tag os métodos dinâmicos que configuram automaticamente algumas ações / opções do form;
	this.mixin(mixForCrudScreens, opts);

	this.on('mount', function () {
		$(_self.root)
			.find('.modal')
			.modal({
				autofocus: true
			})
			.modal('show');

		riot.mount($('.credit-card-information-container .lookup-combobox-months'), 'lookup-combobox', {
			placeholder: 'Mês de Vencimento',
			lookupName: 'Lista de Meses',
			data: [
				{ id: 1, name: 'Janeiro' },
				{ id: 2, name: 'Fevereiro' },
				{ id: 3, name: 'Março' },
				{ id: 4, name: 'Abril' },
				{ id: 5, name: 'Maio' },
				{ id: 6, name: 'Junho' },
				{ id: 7, name: 'Julho' },
				{ id: 8, name: 'Agosto' },
				{ id: 9, name: 'Setembro' },
				{ id: 10, name: 'Outubro' },
				{ id: 11, name: 'Novembro' },
				{ id: 12, name: 'Dezembro' }
			],
			fieldId: 'id',
			fieldDescription: 'name'
		});

		riot.mount($('.credit-card-information-container .lookup-combobox-type'), 'lookup-combobox', {
			placeholder: 'Débito ou Crédito',
			lookupName: 'Tipo de Cartão',
			data: [
				{ id: 'credit', name: 'Crédito' },
				{ id: 'debit', name: 'Débito' }
			],
			fieldId: 'id',
			fieldDescription: 'name'
		});

		$('.credit-card-information-container .credit-card-information-form').form({
			on: 'submit',
			inline: true,
			fields: {
				creditCardInformationHolderName: {
					identifier: 'credit-card-information-holder-name',
					rules: [
						{
							type: 'empty',
							prompt: 'Digite o Nome Impresso no Cartão'
						}
					]
				},

				creditCardInformationNumber: {
					identifier: 'credit-card-information-number',
					rules: [
						{
							type: 'creditCard',
							prompt: 'Número de cartão inválido!'
						},
						{
							type: 'empty',
							prompt: 'Digite o Número do Cartão'
						}
					]
				},

				creditCardInformationSecurityCode: {
					identifier: 'credit-card-information-security-code',
					rules: [
						{
							type: 'empty',
							prompt: 'Digite o Código de Segurança do Cartão'
						}
					]
				},

				creditCardInformationExpirationYear: {
					identifier: 'credit-card-information-expiration-year',
					rules: [
						{
							type: 'empty',
							prompt: 'Digite o Ano de Vencimento do Cartão'
						}
					]
				}
			},

			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();
				app.loading(true);

				opts.onProcess({
					holderName: $('.credit-card-information-form #credit-card-information-holder-name').val(),
					number: $('.credit-card-information-form #credit-card-information-number').val(),
					cvc: $('.credit-card-information-form #credit-card-information-security-code').val(),
					expirationMonth: $('.credit-card-information-form #credit-card-information-expiration-month .dropdown').dropdown('get value')[0],
					cardType: $('.credit-card-information-form #credit-card-information-card-type .dropdown').dropdown('get value')[0],
					expirationYear: $('.credit-card-information-form #credit-card-information-expiration-year').val()
				});

				_self.closeWindow();
			}
		});
	});

	this.processClick = function (e) {
		$('.credit-card-information-form').submit();
	};

	this.cancelClick = function () {
		this.closeWindow();
	};

	this.closeWindow = function () {
		$('.credit-card-information-modal')
			.modal({
				onHidden: function () {
					$('.credit-card-information-modal').remove();
					_self.unmount(true);
					opts.onCancel();
				}
			})
			.modal('hide');
	};
};
