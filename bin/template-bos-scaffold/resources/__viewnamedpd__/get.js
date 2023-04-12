let helpers = requireModule('helpers');
let auditBusiness = requireModule('audit-business');
let viewData = {};
let query__normalcasecollectionname___matchPipelineStage = { systemIsPost: false };

if (!internal) {
	auditBusiness.logAction(
		dpd,
		helpers.helperServer.both.actions.tryGet,
		ctx.body,
		'View__normalcasecollectionname__',
		' *** Agent: ' + ctx.req.headers['user-agent'],
		ctx.req.headers['x-real-ip']
	);
	setResult('Acesso negado, registrando tentativa de acesso indevido');
} else {
	function prepareData(arrData) {
		let arrDataTreated = [];
		arrData.forEach((__objectItem__) => {
			let itemTreated = {};
			itemTreated.id = __objectItem__._id;
			itemTreated.name = __objectItem__.name;
			itemTreated.createdAt = __objectItem__.createdAt;
			arrDataTreated.push(itemTreated);
		});

		return arrDataTreated;
	}

	try {
		helpers.helperServer.showLog('BierOnStack: Recurso View__normalcasecollectionname__:: Evento :: get :: Ação :: Begin');
		if (typeof query != 'undefined') {
			if (typeof query.id != 'undefined') {
				Object.assign(query__normalcasecollectionname___matchPipelineStage, {
					_id: query.id
				});
			}

			if (typeof query.name != 'undefined') {
				Object.assign(query__normalcasecollectionname___matchPipelineStage, {
					name: query.name
				});
			}
			if (typeof query.createdAt != 'undefined') {
				Object.assign(query__normalcasecollectionname___matchPipelineStage, {
					createdAt: query.createdAt
				});
			}
		}

		$addCallback();
		dpd.__collection__
			.getResource()
			.store.getCollection()
			.then(function (__collectioncamelcase__MongoCollection) {
				__collectioncamelcase__MongoCollection.count(query__normalcasecollectionname___matchPipelineStage, function (error, dataCount) {
					if (typeof query.bosAction != 'undefined' && query.bosAction == 'count') {
						viewData.count = dataCount;
						setResult(viewData);
						$finishCallback();
					} else {
						let query__normalcasecollectionname___aggregate = [
							{
								$match: query__normalcasecollectionname___matchPipelineStage
							},
							{
								$sort: {
									createdAt: 1
								}
							},
							{
								$skip: typeof query.paginationSettings == 'undefined' ? 0 : query.paginationSettings.skip
							},
							{
								$limit: typeof query.paginationSettings == 'undefined' ? (dataCount > 0 ? dataCount : 1) : query.paginationSettings.limit
							}
						];

						__collectioncamelcase__MongoCollection
							.aggregate(query__normalcasecollectionname___aggregate, {
								allowDiskUse: true
							})
							.toArray(async (error, __collectioncamelcase__) => {
								if (error) {
									helpers.helperServer.showException(
										helpers.helperServer.both.formatString('BierOnStack: Recurso View__normalcasecollectionname__ :: Evento :: get :: Exceção :: {0}', error)
									);
								} else {
									viewData.count = dataCount;
									viewData.data = prepareData(__collectioncamelcase__);
									setResult(viewData);
									$finishCallback();
								}
							});
					}
				});
			});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso View__normalcasecollectionname__ :: Evento :: get :: Exceção :: {0}', error.message));
	}
}
