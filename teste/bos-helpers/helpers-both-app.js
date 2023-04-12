/* BOS - BierOnStack - File Reserved ToChange */
(function (exports) {
		(exports.daysFPDAlerts = [
			{
				id: 0,
				startDaysInterval: 1,
				endDaysInterval: 31,
				name: 'Até 30 dias'
			},
			{
				id: 1,
				startDaysInterval: 31,
				endDaysInterval: 41,
				name: 'De 31 a 40 dias'
			},
			{
				id: 2,
				startDaysInterval: 41,
				endDaysInterval: 51,
				name: 'De 41 a 50 dias'
			},
			{
				id: 3,
				startDaysInterval: 51,
				endDaysInterval: 1000,
				name: 'Acima de 50 dias'
			}
		]);
	exports.invoicesStatus = [
		{
			status: 'Não Pago',
			name: 'Não Pago'
		},
		{
			status: 'Pago',
			name: 'Pago'
		},
		{
			status: 'Vencido',
			name: 'Vencido'
		},
		{
			status: 'A Vencer',
			name: 'A Vencer'
		},
		{
			status: 'A Vencer',
			name: 'A Vencer'
		}
	];
	exports.processingStatus = [
		{
			id: 0,
			status: 'Upload Ok',
			name: 'Upload Ok'
		},
		{
			id: 1,
			status: 'em Fila',
			name: 'em Fila'
		},
		{
			id: 2,
			status: 'Concluido',
			name: 'Concluido'
		}
	];
})(typeof exports === 'undefined' ? (this.helpersBothApp = {}) : exports);
