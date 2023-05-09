let helpers = requireModule("helpers");
let moment = require("moment-timezone");
let viewData = {};

function prepareData(arrData) {
    let arrDataTreated = [];
    arrData.forEach((alertHome) => {
        let itemTreated = {};
        itemTreated.id = alertHome._id;
        itemTreated.typeId = alertHome.typeId;
        itemTreated.title = alertHome.title;
        itemTreated.alert = alertHome.alert;
        itemTreated.emittedAt = alertHome.emittedAt;
        arrDataTreated.push(itemTreated);
    });

    return arrDataTreated;
}

try {
    helpers.helperServer.showLog("BierOnStack: Recurso ViewAlertsHome :: Evento :: get :: Ação :: Begin");
    $addCallback();
    bbc.alerts
        .getResource()
        .store.getCollection()
        .then(function (alertsMongoCollection) {
            let queryAlertsOptions = {
                isActive: true,
                $and: [
                    {
                        startDate: { $lte: new Date(new Date().toISOString()) }
                    },
                    { endDate: { $gte: new Date(new Date().toISOString()) } }
                ],
                usersReadIds: { $nin: [me.id] },
                $or: [
                    {
                        usersIds: me.id
                    },
                    {
                        userId: me.id
                    }
                ]
            };
            alertsMongoCollection.count(queryAlertsOptions, function (error, dataCount) {
                if (typeof query.bosAction != "undefined" && query.bosAction == "count") {
                    viewData.count = dataCount;
                    setResult(viewData);
                    $finishCallback();
                } else {
                    alertsMongoCollection
                        .find(queryAlertsOptions)
                        .sort({ emittedAt: -1 })
                        .toArray(async (error, alertsHome) => {
                            if (error) {
                                helpers.helperServer.showException(
                                    helpers.helperServer.both.formatString("BierOnStack: Recurso ViewAlertsHome :: Evento :: get :: Exceção :: {0}", error)
                                );
                            } else {
                                viewData.count = dataCount;
                                viewData.data = prepareData(alertsHome);
                                setResult(viewData);
                                $finishCallback();
                            }
                        });
                }
            });
        });
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso ViewAlertsHome :: Evento :: get :: Exceção :: {0}", error.message));
}
