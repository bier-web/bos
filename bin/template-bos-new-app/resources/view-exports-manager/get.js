// BOS - BierOnStack - File Reserved
let helpers = requireModule('helpers');
let auditBusiness = requireModule('audit-business');
let viewData = {};
let queryExportsManager_matchPipelineStage = {};

function prepareData(arrData) {
	let arrDataTreated = [];
	arrData.forEach((exportManager) => {
		let itemTreated = {};
		itemTreated.id = exportManager._id;
		itemTreated.name = exportManager.name;
		itemTreated.userId = exportManager.userId;
		itemTreated.optsCollection = exportManager.optsCollection;
		itemTreated.queryOptions = exportManager.queryOptions;
		itemTreated.exportedReportPath = exportManager.exportedReportPath;
		itemTreated.operationStatusId = exportManager.operationStatusId;
		itemTreated.exportedReportAt = exportManager.exportedReportAt;
		arrDataTreated.push(itemTreated);
	});

	return arrDataTreated;
}

try {
	helpers.helperServer.showLog('BierOnStack: Recurso ViewExportsManager :: Evento :: Get :: Ação :: Begin');
	if (typeof query != 'undefined' && !query.isQueryReady) {
		if (typeof query.id != 'undefined') {
			Object.assign(queryExportsManager_matchPipelineStage, {
				_id: query.id
			});
		}
	} else if (query.isQueryReady) {
		delete query.isQueryReady;
		Object.assign(queryExportsManager_matchPipelineStage, query);
	}

	$addCallback();
	dpd.exportsmanager
		.getResource()
		.store.getCollection()
		.then(function (exportsManagerMongoCollection) {
			exportsManagerMongoCollection.count(queryExportsManager_matchPipelineStage, function (error, dataCount) {
				if (typeof query.bosAction != 'undefined' && query.bosAction == 'count') {
					viewData.count = dataCount;
					setResult(viewData);
					$finishCallback();
				} else {
					let queryExportsManager_aggregate = [
						{
							$match: queryExportsManager_matchPipelineStage
						},
						{
							$sort: {
								exportedReportAt: -1
							}
						},
						{
							$skip: typeof query.paginationSettings == 'undefined' ? 0 : query.paginationSettings.skip
						},
						{
							$limit: typeof query.paginationSettings == 'undefined' ? (dataCount > 0 ? dataCount : 1) : query.paginationSettings.limit
						}
					];
					console.log(queryExportsManager_aggregate);
					exportsManagerMongoCollection
						.aggregate(queryExportsManager_aggregate, {
							allowDiskUse: true
						})
						.toArray(async (error, exportManagers) => {
							if (error) {
								helpers.helperServer.showException(
									helpers.helperServer.both.formatString('BierOnStack: Recurso ViewExportsManager :: Evento :: get :: Exceção :: {0}', error)
								);
							} else {
								viewData.count = dataCount;
								viewData.data = prepareData(exportManagers);
								setResult(viewData);
								$finishCallback();
							}
						});
				}
			});
		});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ViewExportsManager :: Evento :: get :: Exceção :: {0}', error.message));
}
