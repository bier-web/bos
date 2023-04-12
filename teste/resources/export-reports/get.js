var helpers = requireModule('helpers');
var exportReportsBusiness = requireModule('export-reports-business');
var exportReport = {};
var fileName = helpers.guid();

try {
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	exportReportsBusiness.canGet(ctx, dpd, me, exportReport, query, function (canGet, error) {
		if (canGet) {
			$addCallback();
			dpd.systemsettings.get({ name: { $in: ['exportPath', 'timeZone'] }, $ignoreLimitRecursion: true }, function (systemSettings, error) {
				if (error || systemSettings.length < 2) {
					helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso exportReports :: Evento :: get :: Exceção :: Erro lendo configurações de sistema {0}', error));
				} else {
					let exportPath = systemSettings.filter((systemSetting) => {
						return systemSetting.name == 'exportPath';
					})[0].value;
					let timeZone = systemSettings.filter((systemSetting) => {
						return systemSetting.name == 'timeZone';
					})[0].value;

					var relatedCollections = typeof query.collection.include != 'undefined' ? [...query.collection.include] : [];
					relatedCollections.forEach((relatedCollection, index, virtualRelatedCollections) => {
						if (helpers.isCamelCase(relatedCollection)) virtualRelatedCollections.splice(index, 1);
					});

					dpd.boswrappergetdata.get(
						{
							collectionSettings: JSON.stringify(query.collection),
							queryOptions: JSON.stringify(query.collection.queryOptions)
						},
						function (dataResult, error) {
							if (error) {
								helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso exportReports :: Evento :: get :: Exceção :: {0}', error.message));
								return;
							} else {
								switch (dataResult.result.id) {
									case helpers.helperServer.both.dataResult.exportQueued.id:
										setResult(dataResult);
										$finishCallback();
										break;

									case helpers.helperServer.both.dataResult.success.id:
										helpers.helperServer.showLog('BierOnStack: Recurso exportReport :: Evento :: get :: Ação :: Dados da coleção ok!');
										dpd.exportdefinitions.get(
											{
												$or: [{ name: query.collection.queryOptions.customOptions.exportDefinition }, { name: '' }],
												collectionName: query.collection.viewName || query.collection.name
											},
											function (exportDefinitions, error) {
												if (error || exportDefinitions.length == 0) {
													helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso exportReport :: Evento :: get :: Exceção :: Não existe definição para exportação {0}', query.collection.viewName || query.collection.name));
												} else {
													helpers.helperServer.showLog('BierOnStack: Recurso exportReport :: Evento :: get :: Ação :: Definição de exportação ok!');
													if (relatedCollections.length == 0) {
														helpers.helperServer.showLog('BierOnStack: Recurso exportReport :: Evento :: get :: Ação :: Exportando para excel');
														helpers.helperServer.exportToExcel(exportDefinitions[0], dataResult.data, exportPath, fileName, timeZone, function (exportedFileName) {
															dataResult.exportedFileName = exportedFileName;
															setResult(dataResult);
															$finishCallback();
														});
													} else {
														// busca os campos utilizados para coleções relacionadas
														var settingsKeyRelationshipArray = relatedCollections.map((rc) => 'keyRelationshipId_' + rc);
														var settingsCollectionMappingArray = relatedCollections.map((rc) => 'collectionMappping_' + rc);
														dpd.systemsettings.get(
															{
																name: {
																	$in: settingsKeyRelationshipArray.concat(settingsCollectionMappingArray)
																}
															},
															function (settingKeys, error) {
																if (error || settingKeys.length == 0) {
																	helpers.notifyException('Erro buscando a definição de campos de ralacionamentos keyRelationshipId_ : ', error);
																} else {
																	var relatedCollectionsObjects = [];
																	var promissesData = [];
																	relatedCollections.forEach((rc) => {
																		var keyFieldName = settingKeys.find((mappingKeys) => mappingKeys.name === 'keyRelationshipId_' + rc).value;
																		var collectionItensRelated = Array.from(new Set(collectionData.map((cd) => cd[keyFieldName])));
																		// rc = Nome da coleção relacionada;
																		//buscando os dados de todos os itens de coleções relacionadas;
																		promissesData.push(
																			new Promise(function (resolve) {
																				var settingCollectionMappping = settingKeys.find((mappingCollection) => mappingCollection.name === 'collectionMappping_' + rc);
																				var collectionName = typeof settingCollectionMappping != 'undefined' ? settingCollectionMappping.value : undefined;
																				collectionName = typeof collectionName != 'undefined' ? collectionName : rc;
																				dpd[collectionName].get(
																					{
																						id: {
																							$in: collectionItensRelated
																						}
																					},
																					function (rcItens, error) {
																						relatedCollectionsObjects.push({
																							name: rc,
																							id: keyFieldName,
																							data: rcItens
																						});
																						resolve();
																					}
																				);
																			})
																		);
																	});
																	Promise.all(promissesData).then(function () {
																		collectionData.forEach((cd) => {
																			relatedCollectionsObjects.forEach((rc) => {
																				var exportDefinition = exportDefinitions[0];
																				if (cd[rc.id] != undefined) {
																					cd[rc.name] = rc.data.find((rcData) => rcData.id === cd[rc.id]);
																				}
																				for (var propertyName in exportDefinition.exportDefinitions) {
																					const objectProperty = exportDefinition.exportDefinitions[propertyName];
																					if (objectProperty.visible) {
																						if (propertyName.toLowerCase().indexOf(rc.name) > -1) {
																							cd[propertyName] = typeof cd[rc.name] != 'undefined' ? cd[rc.name][propertyName.substring(propertyName.toLowerCase().indexOf(rc.name) + rc.name.length, propertyName.length).toLowerCase()] : '';
																						}
																					}
																				}
																			});
																		});
																		helpers.helperServer.exportToExcel(exportDefinitions[0], dataResult.data, exportPath, fileName, timeZone, function (exportedFileName) {
																			console.log(dataResult);
																			dataResult.exportedFileName = exportedFileName;
																			setResult(dataResult);
																			$finishCallback();
																		});
																	});
																}
															}
														);
													}
												}
											}
										);
										break;
								}
							}
						}
					);
				}
			});
		} else {
			helpers.log('exports-manager -> onGet -> Chamando exportReportsBusiness -> permissão negada');
			cancel('Usuário não autorizado');
		}
	});
} catch (error) {
	helpers.notifyException('exports-manager -> onGet -> erro desconhecido ->');
	helpers.notifyException(error);
	cancel();
}
