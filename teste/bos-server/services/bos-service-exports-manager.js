/* BOS - BierOnStack - File Reserved */
require("dotenv-extended").load();
var helpersServer = require("../../bos-helpers/helpers-server");
let bosBackend = require("../db/bos-backend-connection");

module.exports = {
    bosServiceExportsManagerStart() {
        helpersServer.showLog("BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Ação :: Begin");
        bosBackend.connect(function (bbc) {
            let _userName = process.env.BOS_SERVICE_USER_NAME;
            let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
            bbc.users.login({ username: _userName, password: _userPassword }, function (user, error) {
                if (error) {
                    helpersServer.showException(
                        helpersServer.both.formatString("BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Exceção :: {0}", error.message)
                    );
                } else {
                    setInterval(function () {
                        helpersServer.showLog(
                            "BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Ação :: Buscando relatórios para exportar"
                        );
                        bbc.exportsmanager.get({ operationStatusId: helpersServer.both.operationStatus.queued.id }, function (exportsManager) {
                            if (exportsManager.length > 0) {
                                helpersServer.showLog(
                                    "BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Ação :: Existem relatórios para exportar"
                                );
                                exportsManager.forEach((exportManager) => {
                                    exportManager.operationStatusId = helpersServer.both.operationStatus.running.id;
                                    bbc.exportsmanager.post(exportManager, function () {
                                        helpersServer.showLog(
                                            helpersServer.both.formatString(
                                                "BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Ação :: Exportando {0}",
                                                exportManager.name
                                            )
                                        );
                                        let _optsCollection = JSON.parse(exportManager.optsCollection);
                                        let _queryOptions = JSON.parse(exportManager.queryOptions);
                                        _optsCollection.queryOptions = _queryOptions;
                                        _optsCollection.dataType = helpersServer.both.dataType.exportFullData;
                                        bbc.exportreports.get({ collection: _optsCollection }, function (exportResult, error) {
                                            if (error || exportResult.result == helpersServer.both.dataResult.error) {
                                                helpersServer.showException(
                                                    helpersServer.both.formatString(
                                                        "BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Exceção :: {0}",
                                                        error
                                                    )
                                                );
                                            } else {
                                                switch (exportResult.result.id) {
                                                    case helpersServer.both.dataResult.success.id:
                                                        if (exportResult.exportedFileName) {
                                                            bbc.systemsettings.get({ name: "downloadPath" }, function (downloadPath, error) {
                                                                if (error) {
                                                                    exportManager.operationStatusId = helpersServer.both.operationStatus.error.id;
                                                                    bbc.exportsmanager.post(exportManager, function () {});
                                                                    helpersServer.showException(
                                                                        helpersServer.both.formatString(
                                                                            "BierOnStack: Recurso bosServiceExporstManager :: Evento :: bosServiceExportsManagerStart :: Exceção :: End erro exportando relatório {0}",
                                                                            error
                                                                        )
                                                                    );
                                                                } else {
                                                                    exportManager.operationStatusId = helpersServer.both.operationStatus.completed.id;
                                                                    exportManager.exportedReportPath = helpersServer.both.formatString(
                                                                        "{0}{1}",
                                                                        downloadPath[0].value,
                                                                        exportResult.exportedFileName
                                                                    );
                                                                    bbc.exportsmanager.post(exportManager, function (exportManager) {
                                                                        helpersServer.showLog(
                                                                            helpersServer.both.formatString(
                                                                                "BierOnStack: Recurso bosServiceExporstManager :: Evento :: bosServiceExportsManagerStart :: Ação :: End relatório exportado com sucesso {0}",
                                                                                exportManager.name
                                                                            )
                                                                        );
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        break;
                                                }
                                            }
                                        });
                                    });
                                });
                            } else {
                                helpersServer.showLog(
                                    "BierOnStack: Recurso bosServiceExportsManager :: Evento :: bosServiceExportsManagerStart :: Ação :: Não existem relatórios para exportar"
                                );
                            }
                        });
                    }, process.env.BOS_SERVICE_EXPORTS_MANAGER_INTERVAL);
                }
            });
        });
    }
};
