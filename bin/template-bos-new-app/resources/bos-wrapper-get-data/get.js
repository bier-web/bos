/* 
  BOS - BierOnStack
  13/12/2021 - TAG: Interface responsável pelo processamento das requisições de acesso a dados, suportando paginação, exportação e retorno de dados simples.
  O que são views: São coleções complexas, criadas utilizando o objecto event get do dpd, encapsulando aggregates ou qualquer outro tipo de dados e informações mais detalhadas;
  O que são collections: São coleções padrão dpd, coleções muitas vezes CRUD`s que tem volume pequeno de dados e pouca complexidade nas informações retornadas;
*/

let helpers = requireModule('helpers');
let bosWrapperGetDataBusiness = requireModule('bos-wrapper-get-data-business');

try {
	cancelUnless(me || internal, 'Você não está logado', 401);
	helpers.helperServer.showLog(helpers.helperServer.both.formatString('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: Begin {0}', query.collectionSettings));
	const optsCollection = JSON.parse(query.collectionSettings);
	let queryOptions = JSON.parse(query.queryOptions);
	let queryOptionsOriginal;
	let sanitizedQueryOptions;
	let dataType = optsCollection.dataType || helpers.helperServer.both.dataType.paginatedCollection;
	let dataResult = {};
	bosWrapperGetDataBusiness.canGetData(ctx, dpd, me, optsCollection, function (canGetData) {
		if (canGetData) {
			bosWrapperGetDataBusiness.applySecurityRoles(ctx, dpd, me, optsCollection, queryOptions, function (securityQueryOptions) {
				queryOptionsOriginal = Object.assign({}, securityQueryOptions);
				helpers.helperServer.prepareParamsToExecute(securityQueryOptions);

				switch (dataType.id) {
					case helpers.helperServer.both.dataType.singleCollection.id:
						dpd[optsCollection.name].get(securityQueryOptions, function (resourceResult, error) {
							if (error) {
								dataResult.result = helpers.helperServer.both.dataResult.error;
								dataResult.errorMessage = error;
							} else {
								dataResult.count = resourceResult.length;
								dataResult.data = resourceResult;
								dataResult.result = helpers.helperServer.both.dataResult.success;
								helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com singleCollection');
							}
							setResult(dataResult);
						});
						break;

					case helpers.helperServer.both.dataType.singleView.id:
						dpd[optsCollection.viewName].get(securityQueryOptions, function (resourceResult, error) {
							if (error) {
								dataResult.result = helpers.helperServer.both.dataResult.error;
								dataResult.errorMessage = error;
							} else {
								dataResult.count = resourceResult.count;
								dataResult.data = resourceResult.data;
								dataResult.result = helpers.helperServer.both.dataResult.success;
								helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com singleView');
							}
							setResult(dataResult);
						});
						break;

					case helpers.helperServer.both.dataType.paginatedCollection.id:
						// 13/12/2021 - TAG: remove da configurção principal, os parâmetros de $limit e $skip para buscar o count completo dos dados de acordo com as pesquisas em tela e possibilitar a paginação
						sanitizedQueryOptions = helpers.helperServer.sanitizePaginnatedOptions(securityQueryOptions);
						// primeiro busca o count sem filtro, para que o frontend possa renderizar o sistema de paginação.
						dpd[optsCollection.viewName || optsCollection.name].get(Object.assign(sanitizedQueryOptions.queryOptions, { bosAction: 'count' }), function (dataCount, error) {
							queryOptions =
								typeof sanitizedQueryOptions.queryOptions.paginationSettings.limit == 'undefined'
									? queryOptions
									: Object.assign(sanitizedQueryOptions.queryOptions, {
											$limit: sanitizedQueryOptions.queryOptions.paginationSettings.limit,
											$skip: sanitizedQueryOptions.queryOptions.paginationSettings.skip
									  });
							dpd[optsCollection.viewName || optsCollection.name].get(securityQueryOptions, function (data, error) {
								if (error) {
									dataResult.result = helpers.helperServer.both.dataResult.error;
									dataResult.errorMessage = error;
								} else {
									dataResult.data = Array.isArray(data) ? data : [data];
									dataResult.count = dataCount.count || 0;
									dataResult.result = helpers.helperServer.both.dataResult.success;
									helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com paginatedCollection');
								}
								setResult(dataResult);
							});
						});
						break;

					case helpers.helperServer.both.dataType.paginatedViewCollection.id:
						console.log(optsCollection);
						sanitizedQueryOptions = helpers.helperServer.sanitizePaginnatedOptions(securityQueryOptions);
						dpd[optsCollection.viewName || optsCollection.name].get(sanitizedQueryOptions.queryOptions, function (resourceResult, error) {
							if (error) {
								dataResult.result = helpers.helperServer.both.dataResult.error;
								dataResult.errorMessage = error;
							} else {
								dataResult.data = resourceResult.data;
								dataResult.count = resourceResult.count;
								dataResult.result = helpers.helperServer.both.dataResult.success;
								helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com viewCollection');
							}
							setResult(dataResult, error);
						});
						break;

					case helpers.helperServer.both.dataType.exportData.id:
						$addCallback();
						dpd.systemsettings.get({ name: 'maxExportsItemsOnGrid', $ignoreLimitRecursion: true }, function (systemSettings, error) {
							if (error || systemSettings.length == 0) {
								dataResult.result = helpers.helperServer.both.dataResult.error;
								dataResult.errorMessage = 'Erro lendo a configuração de quantidade de itens permitidos em tela';
								setResult(dataResult);
								$finishCallback();
							} else {
								delete securityQueryOptions['$limit'];
								delete securityQueryOptions['$skip'];
								securityQueryOptions.isToExport = true;
								dpd[optsCollection.viewName || optsCollection.name].get(Object.assign(securityQueryOptions, { bosAction: 'count' }), function (dataCount, error) {
									delete securityQueryOptions['bosAction'];
									if (dataCount.count > parseInt(systemSettings[0].value)) {
										dataResult.result = helpers.helperServer.both.dataResult.exportQueued;
										dataResult.count = dataCount.count;
										dpd.exportsmanager.post(
											{
												name: helpers.helperServer.both.formatString(
													'Relatório {0} solicitado por {1} em {2}',
													typeof optsCollection.reportLabel != 'undefined' ? optsCollection.reportLabel : optsCollection.viewName || optsCollection.name,
													me.username,
													helpers.helperServer.bosMoment(new Date()).format('lll')
												),
												exportedReportAt: new Date().toISOString(),
												userId: me.id,
												optsCollection: JSON.stringify(optsCollection),
												queryOptions: JSON.stringify(queryOptionsOriginal)
											},
											function () {
												helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End exportando relatório em background');
												setResult(dataResult);
												$finishCallback();
											}
										);
									} else {
										dpd[optsCollection.viewName || optsCollection.name].get(securityQueryOptions, function (resourceResult, error) {
											dataResult.data = Array.isArray(resourceResult) ? resourceResult : Array.isArray(resourceResult.data) ? resourceResult.data : [resourceResult];
											dataResult.count = dataCount.count;
											dataResult.result = helpers.helperServer.both.dataResult.success;
											setResult(dataResult);
											$finishCallback();
											helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com exportData');
										});
									}
								});
							}
						});
						break;

					case helpers.helperServer.both.dataType.exportFullData.id:
						$addCallback();
						delete securityQueryOptions['$limit'];
						delete securityQueryOptions['$skip'];
						queryOptions.isToExport = true;
						helpers.helperServer.prepareParamsToExecute(securityQueryOptions);
						dpd[optsCollection.viewName || optsCollection.name].get(securityQueryOptions, function (resourceResult, error) {
							dataResult.data = resourceResult.data || resourceResult;
							dataResult.count = resourceResult.count || resourceResult.length;
							dataResult.result = helpers.helperServer.both.dataResult.success;
							helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End finalizando com exportFullData');
							setResult(dataResult);
							$finishCallback();
						});
						break;
				}
			});
		} else {
			dataResult.result = helpers.helperServer.both.dataResult.error;
			dataResult.errorMessage = 'Acesso negado!';
			setResult(dataResult);
		}
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Exceção :: {0}', error.message));
} finally {
	helpers.helperServer.showLog('BierOnStack: Recurso bosWrapperGetData :: Evento :: get :: Ação :: End Wrapper Get Finalizado');
}
