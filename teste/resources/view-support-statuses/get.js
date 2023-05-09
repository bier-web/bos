let helpers = requireModule("helpers");
let auditBusiness = requireModule("audit-business");
let viewData = {};
let querySupportStatuses_matchPipelineStage = { systemIsPost: false };

function prepareData(arrData) {
    let arrDataTreated = [];
    arrData.forEach((supportStatus) => {
        let itemTreated = {};
        itemTreated.id = supportStatus._id;
        itemTreated.name = supportStatus.name;
        itemTreated.cssClassIcon = supportStatus.cssClassIcon;

        arrDataTreated.push(itemTreated);
    });

    return arrDataTreated;
}

try {
    helpers.helperServer.showLog("BierOnStack: Recurso SupportStatuses :: Evento :: Get :: Ação :: Begin");
    if (typeof query != "undefined" && !query.isQueryReady) {
        if (typeof query.id != "undefined") {
            Object.assign(querySupportStatuses_matchPipelineStage, {
                _id: query.id
            });
        }
    } else if (query.isQueryReady) {
        delete query.isQueryReady;
        Object.assign(querySupportStatuses_matchPipelineStage, query);
    }

    $addCallback();
    bbc.supportstatuses
        .getResource()
        .store.getCollection()
        .then(function (supportStatusesMongoCollection) {
            supportStatusesMongoCollection.count(querySupportStatuses_matchPipelineStage, function (error, dataCount) {
                if (typeof query.bosAction != "undefined" && query.bosAction == "count") {
                    viewData.count = dataCount;
                    setResult(viewData);
                    $finishCallback();
                } else {
                    let querySupportStatuses_aggregate = [
                        {
                            $match: querySupportStatuses_matchPipelineStage
                        },
                        {
                            $sort: {
                                name: 1
                            }
                        },
                        {
                            $skip: typeof query.paginationSettings == "undefined" ? 0 : query.paginationSettings.skip
                        },
                        {
                            $limit: typeof query.paginationSettings == "undefined" ? (dataCount > 0 ? dataCount : 1) : query.paginationSettings.limit
                        }
                    ];
                    supportStatusesMongoCollection
                        .aggregate(querySupportStatuses_aggregate, {
                            allowDiskUse: true
                        })
                        .toArray(async (error, supportStatuses) => {
                            if (error) {
                                helpers.helperServer.showException(
                                    helpers.helperServer.both.formatString("BierOnStack: Recurso SupportStatuses :: Evento :: get :: Exceção :: {0}", error)
                                );
                            } else {
                                viewData.count = dataCount;
                                viewData.data = prepareData(supportStatuses);
                                setResult(viewData);
                                $finishCallback();
                            }
                        });
                }
            });
        });
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso SupportStatuses :: Evento :: get :: Exceção :: {0}", error.message));
}
