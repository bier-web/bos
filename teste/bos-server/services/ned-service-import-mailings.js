/* BOS - BierOnStack - File ToChange */
require("dotenv-extended").load();
let XlsxPopulate = require("xlsx-populate");
var helpersServer = require("../../bos-helpers/helpers-server");
let bosBackend = require("../db/bos-backend-connection");
let isImportingMailing = false;

nedServiceImportMailing = function (mailingToImport, bbc) {
    postLead = function (leadToPost, callback) {
        bbc.leads.post(leadToPost, function (newLead, error) {
            if (error) {
                helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Lead Post Exception {0}", error.message));
            } else {
                helpersServer.showLog(
                    helpersServer.both.formatString(
                        "BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Lead importado com sucesso {0}",
                        leadToPost.document
                    )
                );
            }
            callback();
        });
    };

    isImportFinished = function (countLeadsImported) {
        if (countLeadsImported == 0) {
            isImportingMailing = false;
            mailingToImport.processingStatusId = 2;
            bbc.mailings.post(mailingToImport, function (mailingUpdate, error) {
                if (error) {
                    helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Mailing Update Exception {0}", error.message));
                } else {
                    helpersServer.showLog(
                        helpersServer.both.formatString(
                            "BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Mailing {0} importado com sucesso!",
                            mailingToImport.name
                        )
                    );
                }
            });
        }
    };

    try {
        isImportingMailing = true;
        mailingToImport.processingStatusId = 1;
        bbc.mailings.post(mailingToImport, function (mailingUpdate, error) {
            if (error) {
                helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Mailing Update Exception {0}", error.message));
            } else {
                helpersServer.showLog(
                    helpersServer.both.formatString(
                        "BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Iniciando importação mailing {0}",
                        mailingToImport.name
                    )
                );

                XlsxPopulate.fromFileAsync(mailingToImport.pathURL).then((workbook) => {
                    const sheetRows = workbook.sheet(0).usedRange().value();
                    sheetRows.shift();
                    let _countLeadsToImport = sheetRows.length;
                    sheetRows.map((row) => {
                        let formatedCpf = helpersServer.formatCpf(row[2]);
                        let lead = {
                            name: row[3],
                            document: formatedCpf,
                            contactPhone1: row[0],
                            address: row[7],
                            addressNumber: row[8],
                            addressCEP: row[4],
                            addressNeighborhood: row[10],
                            addressCity: row[5],
                            addressState: row[6],
                            systemIsPost: false,
                            isReadyToBot: helpersServer.validateCpf(formatedCpf)
                        };

                        if (lead.isReadyToBot) {
                            bbc.leads.get({ document: lead.document, $ignoreLimitRecursion: true }, function (duplicatedLead, error) {
                                if (error) {
                                    helpersServer.showException(
                                        helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Get Leads By Document Exception {0}", error.message)
                                    );
                                } else {
                                    if (duplicatedLead.length == 0) {
                                        postLead(lead, () => {
                                            _countLeadsToImport = _countLeadsToImport - 1;
                                            isImportFinished(_countLeadsToImport);
                                        });
                                    } else {
                                        helpersServer.showException(
                                            helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Lead duplicado {0}", lead.document)
                                        );
                                        _countLeadsToImport = _countLeadsToImport - 1;
                                        isImportFinished(_countLeadsToImport);
                                    }
                                }
                            });
                        } else {
                            postLead(lead, () => {
                                _countLeadsToImport = _countLeadsToImport - 1;
                                isImportFinished(_countLeadsToImport);
                            });
                        }
                    });
                });
            }
        });
    } catch (error) {
        helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> Mailing Update Exception {0}", error.message));
    }
};

module.exports = {
    nedServiceImportMailingStart() {
        try {
            bosBackend.connect(function (bbc) {
                let _userName = process.env.BOS_SERVICE_USER_NAME;
                let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
                bbc.users.login({ username: _userName, password: _userPassword }, function (user, error) {
                    helpersServer.showLog("BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Begin");
                    if (error) {
                        helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: nedServiceImportMailings -> login Exception {0}", error.message));
                    } else {
                        setInterval(function () {
                            if (!isImportingMailing) {
                                helpersServer.showLog(
                                    "BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Buscando mailings para importação"
                                );

                                bbc.mailings.get({ processingStatusId: { $in: [0, 1] } }, function (mailings, error) {
                                    helpersServer.showLog(
                                        helpersServer.both.formatString(
                                            "BierOnStack: Recurso nedServiceImportMailings :: Evento :: Start Service Import Mailings :: Ação :: Mailings {0}",
                                            mailings.length
                                        )
                                    );

                                    if (mailings.length > 0) {
                                        let mailingsInProgress = mailings.filter((mailing) => mailing.processingStatusId == 1);
                                        if (mailingsInProgress.length > 0) {
                                            nedServiceImportMailing(mailingsInProgress[0], bbc);
                                        } else if (mailingsInProgress.length == 0) {
                                            nedServiceImportMailing(mailings[0], bbc);
                                        }
                                    }
                                });
                            }
                        }, process.env.NED_SERVICE_IMPORT_MAILINGS_INTERVAL);
                    }
                });
            });
        } catch (error) {
            _this.showException(helpersBoth.formatString("BierOnStack: Recurso exportToExcel :: Evento :: exportToExcel :: Exceção :: {0}", error));
        }
    }
};
