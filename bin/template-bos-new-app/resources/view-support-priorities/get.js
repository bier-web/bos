let helpers = requireModule('helpers');
let auditBusiness = requireModule('audit-business');
let viewData = {};
let querySupportPriorities_matchPipelineStage = { systemIsPost: false };

function prepareData(arrData) {
	let arrDataTreated = [];
	arrData.forEach((supportPriority) => {
		let itemTreated = {};
		itemTreated.id = supportPriority._id;
		itemTreated.name = supportPriority.name;
		itemTreated.cssClassIcon = supportPriority.cssClassIcon;

		arrDataTreated.push(itemTreated);
	});

	return arrDataTreated;
}

try {
	helpers.helperServer.showLog('BierOnStack: Recurso SupportPriorities :: Evento :: Get :: Ação :: Begin');
	if (typeof query != 'undefined' && !query.isQueryReady) {
		if (typeof query.id != 'undefined') {
			Object.assign(querySupportPriorities_matchPipelineStage, {
				_id: query.id
			});
		}
	} else if (query.isQueryReady) {
		delete query.isQueryReady;
		Object.assign(querySupportPriorities_matchPipelineStage, query);
	}

	$addCallback();
	dpd.supportpriorities
		.getResource()
		.store.getCollection()
		.then(function (supportPrioritiesMongoCollection) {
			supportPrioritiesMongoCollection.count(querySupportPriorities_matchPipelineStage, function (error, dataCount) {
				if (typeof query.bosAction != 'undefined' && query.bosAction == 'count') {
					viewData.count = dataCount;
					setResult(viewData);
					$finishCallback();
				} else {
					let querySupportPriorities_aggregate = [
						{
							$match: querySupportPriorities_matchPipelineStage
						},
						{
							$sort: {
								name: 1
							}
						},
						{
							$skip: typeof query.paginationSettings == 'undefined' ? 0 : query.paginationSettings.skip
						},
						{
							$limit: typeof query.paginationSettings == 'undefined' ? (dataCount > 0 ? dataCount : 1) : query.paginationSettings.limit
						}
					];
					supportPrioritiesMongoCollection
						.aggregate(querySupportPriorities_aggregate, {
							allowDiskUse: true
						})
						.toArray(async (error, supportPriorities) => {
							if (error) {
								helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportPriorities :: Evento :: get :: Exceção :: {0}', error));
							} else {
								viewData.count = dataCount;
								viewData.data = prepareData(supportPriorities);
								setResult(viewData);
								$finishCallback();
							}
						});
				}
			});
		});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportPriorities :: Evento :: get :: Exceção :: {0}', error.message));
}
