let helpers = requireModule('helpers');
let auditBusiness = requireModule('audit-business');
let viewData = {};
let querySupportRequests_matchPipelineStage = { systemIsPost: false };

function prepareData(arrData) {
	let arrDataTreated = [];
	arrData.forEach((supportRequest) => {
		let itemTreated = {};
		itemTreated.id = supportRequest._id;
		itemTreated.uniqueId = supportRequest.uniqueId;
		itemTreated.supportStatusName = supportRequest.supportRequestStatus.length > 0 ? supportRequest.supportRequestStatus[0].name : 'Erro de status';
		itemTreated.supportStatusCssClassIcon = supportRequest.supportRequestStatus.length > 0 ? supportRequest.supportRequestStatus[0].cssClassIcon : 'Erro de status';
		itemTreated.supportPriorityName = supportRequest.supportRequestPriority.length > 0 ? supportRequest.supportRequestPriority[0].name : 'Erro de prioridade';
		itemTreated.supportPriorityCssClassIcon = supportRequest.supportRequestPriority.length > 0 ? supportRequest.supportRequestPriority[0].cssClassIcon : 'Erro de prioridade';
		itemTreated.createdAt = supportRequest.createdAt;
		itemTreated.title = supportRequest.title;
		itemTreated.userNameCreated = supportRequest.userNameCreated;
		itemTreated.isConcluded = supportRequest.isConcluded;
		arrDataTreated.push(itemTreated);
	});

	return arrDataTreated;
}

try {
	helpers.helperServer.showLog('BierOnStack: Recurso ViewSupportRequests :: Evento :: get :: Ação :: Begin');

	if (typeof query != 'undefined') {
		if (typeof query.uniqueId != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				uniqueId: query.uniqueId
			});
		}
		if (typeof query.title != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				title: query.title
			});
		}
		if (typeof query.description != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				description: query.description
			});
		}
		if (typeof query.supportStatusId != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				supportStatusId: query.supportStatusId
			});
		}
		if (typeof query.supportPriorityId != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				supportPriorityId: query.supportPriorityId
			});
		}
		if (typeof query.customerId != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				customerId: query.customerId
			});
		}
		if (typeof query.placeId != 'undefined') {
			Object.assign(querySupportRequests_matchPipelineStage, {
				placeId: query.placeId
			});
		}
	}

	$addCallback();

	dpd.supportrequests
		.getResource()
		.store.getCollection()
		.then(function (supportRequestsMongoCollection) {
			supportRequestsMongoCollection.count(querySupportRequests_matchPipelineStage, function (error, dataCount) {
				if (typeof query.bosAction != 'undefined' && query.bosAction == 'count') {
					reportData.count = dataCount;
					setResult(viewData);
					$finishCallback();
				} else {
					let querySupportRequests_aggregate = [
						{
							$match: querySupportRequests_matchPipelineStage
						},
						{
							$lookup: {
								from: 'support-statuses',
								localField: 'supportStatusId',
								foreignField: '_id',
								as: 'supportRequestStatus'
							}
						},
						{
							$lookup: {
								from: 'support-priorities',
								localField: 'supportPriorityId',
								foreignField: '_id',
								as: 'supportRequestPriority'
							}
						},
						{
							$sort: {
								isConcluded: 1,
								lastMoveAt: -1,
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

					supportRequestsMongoCollection
						.aggregate(querySupportRequests_aggregate, {
							allowDiskUse: true
						})
						.toArray(async (error, supportRequests) => {
							if (error) {
								helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ViewSupportRequests :: Evento :: get :: Exceção :: {0}', error));
							} else {
								viewData.count = dataCount;
								viewData.data = prepareData(supportRequests);
								setResult(viewData);
								$finishCallback();
							}
						});
				}
			});
		});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ViewSupportRequests :: Evento :: get :: Exceção :: {0}', error.message));
}
