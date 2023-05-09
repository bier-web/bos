let helpers = requireModule("helpers");
let auditBusiness = requireModule("audit-business");
let viewData = {};
let queryExternalSystems_matchPipelineStage = {};

function prepareData(arrData) {
    let arrDataTreated = [];
    arrData.forEach((externalSystem) => {
        let itemTreated = {};
        itemTreated.id = externalSystem._id;
        itemTreated.name = externalSystem.name;
        itemTreated.isActive = externalSystem.isActive;
        itemTreated.providerName = externalSystem.provider.length > 0 ? externalSystem.provider[0].name : "";
        arrDataTreated.push(itemTreated);
    });

    return arrDataTreated;
}

try {
    helpers.helperServer.showLog("BierOnStack: Recurso ViewExternalSystems :: Evento :: Get :: Ação :: Begin");
    if (typeof query != "undefined") {
        if (typeof query.id != "undefined") {
            Object.assign(queryExternalSystems_matchPipelineStage, {
                _id: query.id
            });
        }
    }

    $addCallback();
    bbc.externalsystems
        .getResource()
        .store.getCollection()
        .then(function (externalSystemsMongoCollection) {
            externalSystemsMongoCollection.count(queryExternalSystems_matchPipelineStage, function (error, dataCount) {
                if (typeof query.bosAction != "undefined" && query.bosAction == "count") {
                    viewData.count = dataCount;
                    setResult(viewData);
                    $finishCallback();
                } else {
                    let queryExternalSystems_aggregate = [
                        {
                            $match: queryExternalSystems_matchPipelineStage
                        },
                        {
                            $lookup: {
                                from: "providers",
                                localField: "providerId",
                                foreignField: "_id",
                                as: "provider"
                            }
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

                    externalSystemsMongoCollection
                        .aggregate(queryExternalSystems_aggregate, {
                            allowDiskUse: true
                        })
                        .toArray(async (error, externalSystems) => {
                            if (error) {
                                helpers.helperServer.showException(
                                    helpers.helperServer.both.formatString("BierOnStack: Recurso ViewExternalSystems :: Evento :: get :: Exceção :: {0}", error)
                                );
                            } else {
                                viewData.count = dataCount;
                                viewData.data = prepareData(externalSystems);
                                setResult(viewData);
                                $finishCallback();
                            }
                        });
                }
            });
        });
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso ViewExternalSystems :: Evento :: get :: Exceção :: {0}", error.message));
}
