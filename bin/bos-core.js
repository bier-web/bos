const bosBackend = require("bos-backend");
const bosHelpers = require("../helpers/bos-helpers.js");
const bosKeys = require("../helpers/bos-keys.js");
const fs = require("fs");
const moment = require("moment-timezone");
const { cat } = require("shelljs");

require("shelljs/global");

let getBosBackendServer = function (options) {
    return (bosBackEnd = bosBackend(options));
};

module.exports = {
    prepareBosApp() {
        return new Promise((resolve, reject) => {
            let exec = require("child_process").exec;
            exec(`npm install`, function (error, stdout, stderr) {
                if (error !== null) {
                    reject(error);
                } else {
                    bosHelpers.log.success(stdout);
                    exec(`npm i riot@3.10.1 -g && npm i pug -g && npm i less@2.7.2 -g && npm i bos-watcherless -g && npm i yarn -g`, function (error, stdout, stderr) {
                        if (error !== null) {
                            reject(error);
                        } else {
                            bosHelpers.log.success(stdout);
                            bosHelpers.log.info("*** Dependências backend instaladas, compilando projeto, aguarde...");

                            module.exports
                                .buildTags()
                                .then(() => {
                                    bosHelpers.log.info("*** Componentes riot compilados com sucesso, compilando less, aguarde...");
                                    module.exports
                                        .buildLess()
                                        .then(() => {
                                            bosHelpers.log.info("*** Classes css compiladas com sucesso, instalando dependências de frontend, aguarde...");
                                            module.exports
                                                .prepareFrontend()
                                                .then(() => {
                                                    bosHelpers.log.info("*** Dependências instaladas com sucesso!");
                                                    resolve();
                                                })
                                                .catch((error) => {
                                                    bosHelpers.log.error(`*** Erro instalando dependências frontend! ${error}`);
                                                    reject(error);
                                                });
                                        })
                                        .catch((error) => {
                                            bosHelpers.log.error(`*** Erro classes css ${error}`);
                                            reject(error);
                                        });
                                })
                                .catch((error) => {
                                    bosHelpers.log.error(`*** Erro compilando componentes riot ${error}`);
                                    reject(error);
                                });
                        }
                    });
                }
            });
        });
    },
    buildTags(watch) {
        return new Promise((resolve, reject) => {
            try {
                const { exec } = require("child_process");
                const riotExec = exec(`riot --template pug ${watch ? `-w` : ``} bos-app-web-development/tags/pugs/ bos-app-web-development/assets/bos-client/tags`);
                bosHelpers.log.info(`*** Building Tags`);
                riotExec.stdout.on("data", (data) => {
                    bosHelpers.log.success(data);
                    resolve();
                });

                riotExec.stdout.on("close", () => {});

                riotExec.stdout.on("error", (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    buildLess(watch) {
        return new Promise((resolve, reject) => {
            try {
                const { exec } = require("child_process");
                const lessExec = exec(`boswatcherless bos-app-web-development/tags/styles bos-app-web-development/assets/css ${watch ? `` : `-j`} -c`);
                bosHelpers.log.info(`*** Building Less`);
                lessExec.stdout.on("data", (data) => {
                    bosHelpers.log.success(data);
                    resolve();
                });

                lessExec.stdout.on("close", () => {});

                lessExec.stdout.on("error", (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    prepareFrontend() {
        return new Promise((resolve, reject) => {
            let exec = require("child_process").exec;
            exec(`yarn --cwd ./bos-app-web-development/`, function (error, stdout, stderr) {
                if (error !== null) {
                    reject(error);
                } else {
                    bosHelpers.log.info(stdout);
                    resolve();
                }
            });
        });
    },
    startBosBackend(mongoConnectionString, mongoDatabaseName, dirServer) {
        return new Promise((resolve, reject) => {
            try {
                const bosBackEnd = bosBackend({
                    server_dir: dirServer,
                    port: 9090,
                    env: "development",
                    db: {
                        mongoDatabaseName: mongoDatabaseName,
                        mongoConnectionString: mongoConnectionString
                    }
                });

                bosBackEnd.listen();
                bosBackEnd.on("listening", function () {
                    resolve(bosBackEnd);
                });

                bosBackEnd.on("error", function (error) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    createBosAppFile(bosAppName, mongoConnectionString, mongoDatabaseName) {
        return new Promise((resolve, reject) => {
            try {
                let envFile =
                    `bosAppName=${bosAppName}` +
                    `\nbosEnvironment=development` +
                    `\nbosMongoCs=${mongoConnectionString}` +
                    `\nbosMongoDatabaseName=${mongoDatabaseName}` +
                    `\nbosBackendPort=9090` +
                    `\nbosBackendRequestTimeOut=1000` +
                    `\nbosMoment_Locale=pt-br`;
                fs.writeFile(`${bosAppName}.env`, envFile, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    startApp(options) {
        let applySettings = (callback) => {
            moment.locale(process.env.bosMoment_Locale);
            callback();
        };

        return new Promise((resolve, reject) => {
            applySettings(() => {
                let bosBackendServer = getBosBackendServer(options);
                bosBackendServer.listen();
                bosBackendServer.on("listening", function () {
                    resolve(`*** BosApp ${process.env.bosAppName} rodando na porta ${process.env.bosBackendPort}`);
                    // helpersServer.showLog(helpersServer.both.formatString('BierOnStack: Deployd {0} is running on port {1}', process.env.APP, process.env.DEPLOYD_APP_PORT || 5000));
                    // startDataBos.verifySystemData(false, function () {
                    //  helpersServer.showLog('BierOnStack: Recurso ServiceBierOnStackStart :: Evento :: startTheMagic :: Ação :: End serviço de dados executado com sucesso');
                    //  startBos.startBosServices();
                    //  startApp.startAppServices();
                    // });
                });

                bosBackendServer.on("error", function (error) {
                    reject(error);
                    // helpersServer.showException(helpersServer.both.formatString('Arghhh, error starting deployd: {0}', error.message));
                    // process.nextTick(function () {
                    //  process.exit();
                    // });
                });
            });
        });
    },
    showkey() {
        return new Promise((resolve, reject) => {
            try {
                let _bosKeys = new bosKeys();
                if (_bosKeys.path.indexOf(".bos-backend") === 0 && !fs.existsSync(".bos-backend")) fs.mkdirSync(".bos-backend");

                _bosKeys.getLocal(function (error, key) {
                    if (error) {
                        reject(error);
                    } else {
                        if (!key) {
                            reject("Não existe chave criada, use bos keygen");
                        } else {
                            resolve(key);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    keygen() {
        return new Promise((resolve, reject) => {
            try {
                let _bosKeys = new bosKeys();
                if (_bosKeys.path.indexOf(".bos-backend") === 0 && !fs.existsSync(".bos-backend")) fs.mkdirSync(".bos-backend");

                _bosKeys.create(function (error, key) {
                    if (error) reject(error);
                    else resolve(key);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    createAdminUser(options, userName, userPassword, userEmail) {
        return new Promise((resolve, reject) => {
            let _options = {
                port: process.env.bosBackendPort || 9090,
                env: process.env.bosEnvironment || "development",
                requestTimeout: process.env.bosBackendRequestTimeOut ? parseInt(process.env.bosBackendRequestTimeOut) : 10000 || 10000,
                db: {
                    mongoDatabaseName: process.env.bosMongoDatabaseName,
                    mongoConnectionString: process.env.bosMongoConnectionString
                }
            };
            let bosBackendServer = getBosBackendServer(_options);
            bosBackendServer.listen();
            bosBackendServer.on("listening", function () {
                bosHelpers
                    .connectBosBackendClient()
                    .then((bbc) => {
                        bosHelpers.log.success(`Conectado com BosBackendClient!`);
                        const userAdmin = {
                            fullName: "BierOnStack Admin User",
                            username: userName,
                            password: userPassword,
                            isProfileCompleted: true,
                            email: userEmail,
                            isActive: true,
                            isRoot: true,
                            isAuditable: false,
                            systemIsPost: false
                        };
                        bbc.users.post(userAdmin, (rUserAdmin, error) => {
                            console.log(error);
                            if (error) {
                                reject(`Erro criando usuário admin ${error.message || error}`);
                            } else {
                                resolve(`Usuário admin ${rUserAdmin.username} criado com sucesso!`);
                            }
                        });
                    })
                    .catch((error) => {
                        reject(`Erro criando bosBackendClient ${error}`);
                    });
            });
        });
    }
};
