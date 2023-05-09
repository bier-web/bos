let helpers = requireModule("helpers");
let auditBusiness = requireModule("audit-business");
let viewData = {};
let queryBotsProcess_matchPipelineStage = { systemIsPost: false };

if (!internal) {
    auditBusiness.logAction(
        bbc,
        helpers.helperServer.both.actions.tryGet,
        ctx.body,
        "ViewBotsProcess",
        " *** Agent: " + ctx.req.headers["user-agent"],
        ctx.req.headers["x-real-ip"]
    );
    setResult("Acesso negado, registrando tentativa de acesso indevido");
} else {
    function prepareData(arrData) {
        let arrDataTreated = [];
        arrData.forEach((botProcess) => {
            let itemTreated = {};
            itemTreated.id = botProcess._id;
            itemTreated.name = botProcess.name;
            itemTreated.description = botProcess.description;
            itemTreated.postResults = botProcess.postResults;
            itemTreated.externalSystemName = typeof botProcess.externalSystemId != "undefined" && botProcess.externalSystemId != "" ? botProcess.externalSystem[0].name : "";
            itemTreated.createdAt = botProcess.createdAt;
            itemTreated.getConditions = botProcess.getConditions;
            arrDataTreated.push(itemTreated);
        });

        return arrDataTreated;
    }

    try {
        helpers.helperServer.showLog("BierOnStack: Recurso ViewBotsProcess:: Evento :: get :: Ação :: Begin");
        if (typeof query != "undefined" && !query.isQueryReady) {
            if (typeof query.id != "undefined") {
                Object.assign(queryBotsProcess_matchPipelineStage, {
                    _id: query.id
                });
            }

            if (typeof query.name != "undefined") {
                Object.assign(queryBotsProcess_matchPipelineStage, {
                    name: query.name
                });
            }
            if (typeof query.createdAt != "undefined") {
                Object.assign(queryBotsProcess_matchPipelineStage, {
                    createdAt: query.createdAt
                });
            }
        } else if (query.isQueryReady) {
            delete query.isQueryReady;
            Object.assign(queryBotsProcess_matchPipelineStage, query);
        }

        $addCallback();
        bbc.botsprocess
            .getResource()
            .store.getCollection()
            .then(function (botsProcessMongoCollection) {
                botsProcessMongoCollection.count(queryBotsProcess_matchPipelineStage, function (error, dataCount) {
                    if (typeof query.bosAction != "undefined" && query.bosAction == "count") {
                        viewData.count = dataCount;
                        setResult(viewData);
                        $finishCallback();
                    } else {
                        let queryBotsProcess_aggregate = [
                            {
                                $match: queryBotsProcess_matchPipelineStage
                            },
                            {
                                $lookup: {
                                    from: "external-systems",
                                    localField: "externalSystemId",
                                    foreignField: "_id",
                                    as: "externalSystem"
                                }
                            },
                            {
                                $sort: {
                                    createdAt: 1
                                }
                            },
                            {
                                $skip: typeof query.paginationSettings == "undefined" ? 0 : query.paginationSettings.skip
                            },
                            {
                                $limit: typeof query.paginationSettings == "undefined" ? (dataCount > 0 ? dataCount : 1) : query.paginationSettings.limit
                            }
                        ];

                        botsProcessMongoCollection
                            .aggregate(queryBotsProcess_aggregate, {
                                allowDiskUse: true
                            })
                            .toArray(async (error, botsProcess) => {
                                if (error) {
                                    helpers.helperServer.showException(
                                        helpers.helperServer.both.formatString("BierOnStack: Recurso ViewBotsProcess :: Evento :: get :: Exceção :: {0}", error)
                                    );
                                } else {
                                    viewData.count = dataCount;
                                    viewData.data = prepareData(botsProcess);
                                    setResult(viewData);
                                    $finishCallback();
                                }
                            });
                    }
                });
            });
    } catch (error) {
        helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso ViewBotsProcess :: Evento :: get :: Exceção :: {0}", error.message));
    }
}
