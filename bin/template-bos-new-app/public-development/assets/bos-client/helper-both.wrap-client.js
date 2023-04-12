/* BOS - BierOnStack - File Reserved */
(function (exports) {
	exports.chunkArray = function (myArray, countBlocks) {
		var results = [];
		for (let idxBlock = 0; idxBlock < countBlocks; idxBlock++) {
			var countPerBlock = Math.ceil(myArray.length / (countBlocks - idxBlock));
			results.push(myArray.splice(0, countPerBlock));
		}

		return results;
	};
	exports.formatString = function () {
		var s = arguments[0];
		for (var i = 0; i < arguments.length - 1; i++) {
			var reg = new RegExp('\\{' + i + '\\}', 'gm');
			s = s.replace(reg, arguments[i + 1]);
		}

		return s;
	};
	exports.dataType = {
		singleView: {
			id: 'singleView'
		},
		singleCollection: {
			id: 'singleCollection'
		},
		paginatedViewCollection: {
			id: 'paginatedViewCollection'
		},
		paginatedCollection: {
			id: 'paginatedCollection'
		},
		exportData: {
			id: 'exportData'
		},
		exportFullData: {
			id: 'exportFullData'
		}
	};
	exports.dataResult = {
		success: {
			id: 'success'
		},
		exportQueued: {
			id: 'exportQueued'
		},
		error: {
			id: 'error'
		}
	};
	exports.rowType = {
		level_1: {
			id: 'level_1',
			cssClass: 'bos-report-level-1'
		},
		level_2: {
			id: 'level_2',
			cssClass: 'bos-report-level-2'
		},
		level_3: {
			id: 'level_3',
			cssClass: 'bos-report-level-3'
		}
	};
	exports.actions = {
		add: {
			index: 0,
			icon: 'circular add blue icon'
		},
		edit: {
			index: 1,
			icon: 'circular edit yellow icon'
		},
		remove: {
			index: 2,
			icon: 'circular trash red icon'
		},
		filter: {
			index: 3,
			icon: ''
		},
		confirm: {
			index: 4,
			icon: ''
		},
		cancel: {
			index: 5,
			icon: ''
		},
		close: {
			index: 6,
			icon: ''
		},
		clear: {
			index: 7,
			icon: ''
		},
		save: {
			index: 8,
			icon: ''
		},
		login: {
			index: 9,
			icon: 'circular thumbs up outline green icon'
		},
		read: {
			index: 10,
			icon: 'circular eye purple icon'
		},
		buy: {
			index: 11,
			icon: 'cart arrow orange icon'
		},
		pay: {
			index: 12,
			icon: 'money green icon'
		},
		subscribe: {
			index: 13,
			icon: 'user outline green icon'
		},
		writeoff: {
			index: 14,
			icon: 'calendar check outline icon'
		},
		export: {
			index: 15,
			icon: 'file excel outline green icon cursor'
		},
		get: {
			index: 16,
			icon: 'arrow alternate circle down outline'
		},
		tryLogin: {
			index: 17,
			icon: 'exclamation triangle red icon'
		},
		tryGet: {
			index: 18,
			icon: 'ban red icon'
		},
		download: {
			index: 19,
			icon: 'download icon'
		}
	};
	exports.operationStatus = {
		queued: {
			id: 1,
			icon: 'large hourglass outline orange icon',
			tooltip: 'Em fila para execução'
		},
		running: {
			id: 2,
			icon: 'large sync blue icon',
			tooltip: 'Em execução'
		},
		completed: {
			id: 3,
			icon: 'large thumbs up outline green icon',
			tooltip: 'Carga concluída'
		},
		never: {
			id: 4,
			icon: 'large thumbs down outline orange icon',
			tooltip: 'Carga nunca realizada'
		},
		fail: {
			id: 5,
			icon: 'large exclamation red icon',
			tooltip: 'Falha ao realizar a carga'
		}
	};
	exports.getSystemSettingFromArray = function (arrSystemSettings, name) {
		let systemSettingResult = undefined;
		try {
			arrSystemSettings.forEach((systemSetting) => {
				if (systemSetting.name == name) {
					systemSettingResult = systemSetting.name == name ? systemSetting.value : undefined;
					return;
				}
			});
			return systemSettingResult;
		} catch (error) {
			console.log(error);
		}
	};
	exports.sanitizeString = function (stringToSanitize) {
		stringToSanitize = stringToSanitize.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
		stringToSanitize = stringToSanitize.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
		stringToSanitize = stringToSanitize.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
		stringToSanitize = stringToSanitize.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
		stringToSanitize = stringToSanitize.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
		stringToSanitize = stringToSanitize.replace(new RegExp('[Ç]', 'gi'), 'c');
		return stringToSanitize;
	};
})(typeof exports === 'undefined' ? (this.helperBoth = {}) : exports);
