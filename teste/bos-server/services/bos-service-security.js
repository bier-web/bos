/* BOS - BierOnStack - File Reserved */
var helpersServer = require("../../bos-helpers/helpers-server");
require("dotenv-extended").load();
let bosBackend = require("../db/bos-backend-connection");

module.exports = {
    bosServiceSecurityStart() {
        bosBackend.connect(function (bbc) {
            let _userName = process.env.BOS_SERVICE_USER_NAME;
            let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
            bbc.users.login({ username: _userName, password: _userPassword }, function (user, error) {
                if (error) {
                    helpersServer.showException(helpersServer.both.formatString("BierOnStack Debug: bosServiceSecurity -> get Exception {0}", error.message));
                } else {
                    console.log(moment(new Date()).tz("America/Sao_Paulo").format("lll"), "bosServiceSecurityStart - Logado");
                    server.users.get({ isActive: true }, function (users) {
                        users.forEach((user) => {
                            bbc.connect(function (bbcLogin) {
                                bbcLogin.users.login(
                                    {
                                        username: user.username,
                                        password: user.username
                                    },
                                    function (user, error) {
                                        if (error) {
                                            console.log(
                                                moment(new Date()).tz("America/Sao_Paulo").format("lll"),
                                                "bosServiceSecurityStart - Usuário OK, senha não é padrão",
                                                error
                                            );
                                        } else {
                                            bbcLogin.users.me(function (loggedUser) {
                                                console.log(
                                                    moment(new Date()).tz("America/Sao_Paulo").format("lll"),
                                                    "bosServiceSecurityStart - !!! Alerta de Segurança (usuário com senha padrão)",
                                                    loggedUser.username
                                                );
                                                loggedUser.isActive = false;
                                                bbcLogin.users.post(loggedUser, function () {
                                                    console.log(
                                                        moment(new Date()).tz("America/Sao_Paulo").format("lll"),
                                                        "bosServiceSecurityStart - Usuário desativado: ",
                                                        loggedUser.username
                                                    );
                                                });
                                            });
                                        }
                                    }
                                );
                            });
                        });
                    });
                }
            });
        });
    }
};
