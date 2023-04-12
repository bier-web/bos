/* BOS - BierOnStack - File Reserved */
let pino = require('pino');
let helpersBoth = require('./helpers-both');
let helpersBothApp = require('./helpers-both-app');
let XlsxPopulate = require('xlsx-populate');
let hash = require('object-hash');
let cpfHelper = require('cpf');
require('moment/locale/pt-br');
let momentTz = require('moment-timezone');

// Flag indicate BOS to show auhtorization errors on console log
let showUnauthorizedErrors = false;

const pinoCustomLevels = {
	http: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60
};

module.exports = {
	HelpersBoth: helpersBoth,
	both: helpersBoth,
	bothApp: helpersBothApp,
	bosMoment: momentTz,
	MomentTz: (momentTimeZone, momentOpts) => {
		momentTz.locale('pt-br');
		return momentTz(momentOpts).tz(momentTimeZone);
	},
	formatCpf: function (cpfNumber) {
		if (typeof cpfNumber != 'undefined') {
			let internalCPF = cpfNumber.toString();
			while (internalCPF.length < 11) {
				internalCPF = '0' + internalCPF;
			}
			return cpfHelper.format(internalCPF);
		}
	},
	validateCpf: function (cpfNumber) {
		return cpfHelper.validate(cpfNumber);
	},
	prepareParamsToExecute: function (optionsToExecute) {
		let propertiesToExecute = Object.getOwnPropertyNames(optionsToExecute);
		propertiesToExecute.forEach((property) => {
			if (typeof optionsToExecute[property].columnType != 'undefined') {
				let optionsToExecuteDateConverted = {};
				let valuesToConvert = Object.getOwnPropertyNames(optionsToExecute[property]);
				valuesToConvert.forEach((valueToConvert) => {
					if (valueToConvert != 'columnType') {
						optionsToExecuteDateConverted[valueToConvert] = new Date(optionsToExecute[property][valueToConvert]);
					}
				});
				optionsToExecute[property] = optionsToExecuteDateConverted;
			}
		});
		return optionsToExecute;
	},
	sanitizePaginnatedOptions: function (queryOptions) {
		let sanitizedPaginnatedOptions = {};
		sanitizedPaginnatedOptions.queryOptions = Object.assign({}, queryOptions);
		sanitizedPaginnatedOptions.queryOptions.paginationSettings = {};
		sanitizedPaginnatedOptions.queryOptions.paginationSettings.limit = typeof queryOptions.$limit != 'undefined' ? queryOptions.$limit : 100;
		sanitizedPaginnatedOptions.queryOptions.paginationSettings.skip = queryOptions.$skip || 0;
		delete sanitizedPaginnatedOptions.queryOptions['$limit'];
		delete sanitizedPaginnatedOptions.queryOptions['$skip'];
		return sanitizedPaginnatedOptions;
	},
	hashObject: function (object) {
		return hash(object);
	},
	pinoLogger: pino({
		prettyPrint: {
			colorize: true, // colorizes the log
			levelFirst: true,
			translateTime: 'SYS:standard'
		},
		customLevels: pinoCustomLevels, // our defined levels
		useOnlyCustomLevels: true,
		level: 'http'
	}),
	isDebugMode: function () {
		return process.env.DEBUG_MODE == 'true';
	},
	showLog: function (message, exception) {
		if (this.isDebugMode()) {
			if (exception) {
				this.pinoLogger.error(message);
			} else {
				this.pinoLogger.info(message);
			}
		} else if (exception) {
			this.pinoLogger.error(message);
		}
	},
	showException: function (exception) {
		if (exception) {
			switch (exception.statusCode) {
				case undefined:
					this.showLog(exception, true);
					break;

				case 401:
					if (showUnauthorizedErrors) this.showLog(exception, true);
					break;
			}
		} else {
			log(exception, true);
		}
	},
	sanitizeBosObject: function (object, fieldsToKeep) {
		let clonedObject = { ...object };
		Object.getOwnPropertyNames(clonedObject).forEach((propertyName) => {
			if (fieldsToKeep.indexOf(propertyName) < 0) {
				delete clonedObject[propertyName];
			}
		});
		return clonedObject;
	},
	exportToExcel: function (exportDefinitions, collectionData, exportPath, fileName, timeZone, callback) {
		let _this = this;
		try {
			_this.showLog('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: Begin');
			if (collectionData.length > 0) {
				XlsxPopulate.fromBlankAsync()
					.then(function (workbook) {
						_this.showLog('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: Exportando...');
						var sheet = workbook.sheet('Sheet1');
						for (var propertyName in exportDefinitions.exportDefinitions) {
							const objectProperty = exportDefinitions.exportDefinitions[propertyName];
							if (objectProperty.visible) {
								sheet.row(1).cell(objectProperty.columnPosition).style('bold', true);
								sheet.row(1).cell(objectProperty.columnPosition).value(objectProperty.title);
							}
						}
						_this.showLog('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: Preenchendo o arquivo');
						var rowNumber = 2;
						collectionData.forEach(function (exportData) {
							for (var propertyName in exportDefinitions.exportDefinitions) {
								const objectProperty = exportDefinitions.exportDefinitions[propertyName];
								switch (exportData.rowType) {
									case helpersBoth.rowType.level_1.id:
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('bold', helpersBoth.rowType.level_1.bold);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fontColor', helpersBoth.rowType.level_1.foregroundColor);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fill', helpersBoth.rowType.level_1.backgroundColor);
										break;
									case helpersBoth.rowType.level_2.id:
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('bold', helpersBoth.rowType.level_2.bold);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fontColor', helpersBoth.rowType.level_2.foregroundColor);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fill', helpersBoth.rowType.level_2.backgroundColor);
										break;
									case helpersBoth.rowType.level_3.id:
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('bold', helpersBoth.rowType.level_3.bold);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fontColor', helpersBoth.rowType.level_3.foregroundColor);
										sheet.row(rowNumber).cell(objectProperty.columnPosition).style('fill', helpersBoth.rowType.level_3.backgroundColor);
										break;
								}

								if (objectProperty.visible) {
									switch (objectProperty.type) {
										case 'date':
											exportData[propertyName] != null && typeof exportData[propertyName] != 'undefined'
												? sheet.row(rowNumber).cell(objectProperty.columnPosition).value(momentTz(exportData[propertyName]).tz(timeZone).format('DD/MM/YYYY'))
												: '';
											break;
										case 'dateTime':
											exportData[propertyName] != null && typeof exportData[propertyName] != 'undefined'
												? sheet.row(rowNumber).cell(objectProperty.columnPosition).value(momentTz(exportData[propertyName]).tz(timeZone).format('DD/MM/YYYY HH:mm'))
												: '';
											break;
										case 'dateCustom':
											exportData[propertyName] != null && typeof exportData[propertyName] != 'undefined'
												? sheet
														.row(rowNumber)
														.cell(objectProperty.columnPosition)
														.value(momentTz(exportData[propertyName]).tz(timeZone).format(objectProperty.format))
												: '';
											break;

										default:
											sheet.row(rowNumber).cell(objectProperty.columnPosition).value(exportData[propertyName]);
											break;
									}
								}
							}

							rowNumber++;
						});

						_this.showLog('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: Dados preenchidos em memória, salvando a planilha.');
						workbook
							.toFileAsync(exportPath + fileName + '.xlsx')
							.then(function () {
								_this.showLog(helpersBoth.formatString('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: End Arquivo exportado {0}.xlsx', fileName));
								callback(fileName + '.xlsx');
							})
							.catch(function (error) {
								_this.showException(helpersBoth.formatString('BierOnStack: Recurso exportToExcel :: Evento :: exportToExcel :: Exceção :: {0}', error));
							});
					})
					.catch(function (error) {
						_this.showException(helpersBoth.formatString('BierOnStack: Recurso exportToExcel :: Evento :: exportToExcel :: Exceção :: {0}', error));
					});
			} else {
				_this.showLog('BierOnStack: Recurso helperServer :: Evento :: exportToExcel :: Ação :: End sem dados para exportar');
				callback(null);
			}
		} catch (error) {
			_this.showException(helpersBoth.formatString('BierOnStack: Recurso exportToExcel :: Evento :: exportToExcel :: Exceção :: {0}', error));
		}
	}
};
