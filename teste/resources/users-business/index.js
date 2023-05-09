/* BOS - BierOnStack */
let helpers = requireModule("helpers");
let auditBusiness = requireModule("audit-business");
let securityBusiness = requireModule("security-business");
let request = require("request");

module.exports = {
    canLogin: function (ctx, bbc, user, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: canLogin :: Ação :: Begin");
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.tryLogin,
                ctx.body,
                "Usuários",
                ctx.body.username + " *** Agent: " + ctx.req.headers["user-agent"],
                ctx.req.headers["x-real-ip"]
            );
            var _error = 0;
            if (user != null && !user.isActive) {
                _error = 1;
            }

            switch (_error) {
                case 0:
                    helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: canLogin :: Ação :: End usuário validado com sucesso!");
                    break;
                case 1:
                    helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: canLogin :: Ação :: End usuário não está ativo");
                    break;
            }

            callback(_error == 0);
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso usersBusiness :: Evento :: canLogin :: Exceção :: {0}", error.message));
        }
    },
    onLogin: function (ctx, bbc, loggedUser, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Begin");
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.login,
                loggedUser,
                "Usuários",
                "(" + loggedUser.id + ") - " + loggedUser.username,
                ctx.req.headers["x-real-ip"]
            );
            helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Analisando permissões do usuário");
            loggedUser.userGroupMenus = [];
            loggedUser.userGroupPermissions = [];
            loggedUser.userGroupDimensions = [];

            bbc.usergroupusers.get({ userId: loggedUser.id }, function (userGroupUsers, error) {
                if (error) {
                    helpers.helperServer.showException(
                        helpers.helperServer.both.formatString("BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Exceção :: {0}", error.message)
                    );
                } else {
                    if (userGroupUsers.length == 0) {
                        helpers.helperServer.showLog("BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: End usuário sem nenhum grupo vinculado");
                        callback(loggedUser);
                    } else {
                        userGroupUsers.forEach((userGroupUser) => {
                            bbc.usergroups.get(
                                {
                                    id: userGroupUser.userGroupId,
                                    isActive: true
                                },
                                function (userGroup, error) {
                                    if (error) {
                                        helpers.helperServer.showException(
                                            helpers.helperServer.both.formatString(
                                                "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: !! Usuário vinculado a um grupo inexistente ou inativo!! Exceção :: {0}",
                                                error.message
                                            )
                                        );
                                    } else {
                                        bbc.usergroupmenus.get(
                                            {
                                                userGroupId: userGroup.id
                                            },
                                            function (userGroupMenus) {
                                                if (userGroupMenus.length == 0) {
                                                    helpers.helperServer.showLog(
                                                        "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Usuário vinculado a grupo sem menus!"
                                                    );
                                                } else {
                                                    helpers.helperServer.showLog(
                                                        "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Menus permitidos vinculado ao usuário!"
                                                    );
                                                }
                                                loggedUser.userGroupMenus = userGroupMenus;
                                                bbc.usergrouppermissions.get(
                                                    {
                                                        userGroupId: userGroup.id,
                                                        include: "permission"
                                                    },
                                                    function (userGroupPermissions, error) {
                                                        if (error) {
                                                            helpers.helperServer.showException(
                                                                helpers.helperServer.both.formatString(
                                                                    "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Exceção :: {0}",
                                                                    error.message
                                                                )
                                                            );
                                                        } else {
                                                            if (userGroupPermissions.length == 0) {
                                                                helpers.helperServer.showLog(
                                                                    "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Usuário vinculado a grupo sem permissões!"
                                                                );
                                                            } else {
                                                                helpers.helperServer.showLog(
                                                                    "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Permissões permitidas vinculadas ao usuário!"
                                                                );
                                                            }
                                                            loggedUser.userGroupPermissions = userGroupPermissions;
                                                            bbc.usergroupdimensions.get(
                                                                {
                                                                    userGroupId: userGroup.id,
                                                                    include: "dimension"
                                                                },
                                                                function (userGroupDimensions) {
                                                                    if (userGroupDimensions.length == 0) {
                                                                        helpers.helperServer.showLog(
                                                                            "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Usuário vinculado a grupo sem dimensões!"
                                                                        );
                                                                    } else {
                                                                        helpers.helperServer.showLog(
                                                                            "BierOnStack: Recurso UsersBusiness :: Evento :: onLogin :: Ação :: Dimensões permitidas vinculadas ao usuário!"
                                                                        );
                                                                    }

                                                                    loggedUser.userGroupDimensions = userGroupDimensions;
                                                                    callback(loggedUser);
                                                                }
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        );
                                    }
                                }
                            );
                        });
                    }
                }
            });
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: UsersBusiness Evento:onLogin {0}", error.message));
        }
    },
    canDelete: function (ctx, bbc, loggedUser, user, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack Debug: usersBusiness -> canDelete ");
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, user, "users", helpers.helperServer.both.actions.remove, function (canDelete) {
                if (canDelete) {
                    helpers.helperServer.showLog(
                        helpers.helperServer.both.formatString("BierOnStack Debug: usersBusiness -> canDelete -> Permission allowed, deleting {0}", user.username)
                    );
                }

                callback(canDelete);
            });
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: usersBusiness -> canDelete Exception {0}", error.message));
        }
    },
    onDelete: function (ctx, bbc, loggedUser, user) {
        try {
            helpers.helperServer.showLog("BierOnStack Debug: usersBusiness -> onDelete ");
            bbc.usergroupusers
                .getResource()
                .store.getCollection()
                .then(function (mongoCollection) {
                    mongoCollection.deleteMany({ userId: user.id }, function () {
                        helpers.helperServer.pinoLogger.info("BierOnStack All userGroupUsers were deleted.");
                    });
                });
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: usersBusiness -> onDelete Exception {0}", error.message));
        }

        auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, user, "Usuários", "(" + user.id + ") - " + user.username, ctx.req.headers["x-real-ip"]);
    },
    prepareObjectToPost: function (ctx, bbc, loggedUser, user, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, user, "users", function (userToPost) {
                userToPost.systemIsPost = true;
                userToPost.isActive = true;
                userToPost.isRoot = loggedUser.isRoot && typeof userToPost.isRoot != "undefined" ? userToPost.isRoot : false;
                userToPost.isAuditable = true;
                userToPost.isProfileCompleted = false;
                userToPost.photoUrl = "/assets/imgs/user-photo-default.png";
                userToPost.captcha = "";
                callback(userToPost);
            });
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: userBusinessPrepareObjectPost ->  Exception {0}", error.message));
        }
    },
    canGet: function (ctx, bbc, loggedUser, user, callback) {
        try {
            if (user.id === loggedUser.id) {
                callback(true);
            } else {
                securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, user, "users", helpers.helperServer.both.actions.read, function (canRead) {
                    callback(canRead);
                });
            }
        } catch (error) {
            helpers.notifyException("UsersBusiness -> OnGet -> Erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    canPost: function (ctx, bbc, loggedUser, user, callback) {
        try {
            helpers.log("UsersBusiness -> canPost -> begin");
            var _error = 0;

            helpers.log("UsersBusiness -> canPost -> Iniciando validações do usuário");
            if (typeof user.password === "undefined" || user.password === "") _error = 1;
            if (typeof user.fullName === "undefined" || user.fullName === "") _error = 2;

            // setTimeout(function () {
            //     helpers.log(
            //         "UsersBusiness -> canPost -> lendo configurações de reCaptcha"
            //     );
            //     bbc.systemsettings.get(
            //         { name: "reCaptchaSecret" },
            //         function (systemSetting, error) {
            //             if (error || systemSetting.length === 0) {
            //                 helpers.notifyException(
            //                     "usersBusiness -> canPost -> erro lendo configuração reCaptchaSecret ->"
            //                 );
            //                 helpers.notifyException(error);
            //             } else {
            //                 helpers.log(
            //                     "UsersBusiness -> canPost -> resolvendo captcha"
            //                 );
            //                 request(
            //                     {
            //                         url:
            //                             "https://www.google.com/recaptcha/api/siteverify?secret=" +
            //                             systemSetting[0].value +
            //                             "&response=" +
            //                             user.captcha,
            //                         method: "POST",
            //                         json: true
            //                     },
            //                     function (error, response, body) {
            //                         helpers.log(
            //                             "UsersBusiness -> canPost -> retorno de requisição de captcha " +
            //                                 response
            //                         );
            //                         if (!body.sucess) _error = 3;
            //                     }
            //                 );
            //             }
            //         }
            //     );
            // }, 1000);

            switch (_error) {
                case 0:
                    helpers.log("UsersBusiness -> canPost -> Verificando se o registro tem os grupos vinculados");
                    helpers.log("UsersBusiness -> canPost -> Registrando log de auditoria");
                    auditBusiness.logAction(bbc, helpers.helperServer.both.actions.add, user, "Usuários", "(" + user.id + ") - " + user.username, ctx.req.headers["x-real-ip"]);
                    callback(true);
                    break;

                case 1:
                    helpers.log("UsersBusiness -> canPost -> Senha é obrigatória");
                    callback(false, "Senha é obrigatória!");
                    break;

                case 2:
                    helpers.log("UsersBusiness -> canPost -> Nome Completo é obrigatório");
                    callback(false, "Nome completo é obrigatório!");
                    break;

                case 3:
                    helpers.log("UsersBusiness -> canPost -> Erro de captcha");
                    callback(false, "Erro de Captcha!");
                    break;
            }
        } catch (error) {
            helpers.notifyException("usersBusiness -> canPost -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    canPut: function (ctx, bbc, loggedUser, user, callback) {
        try {
            helpers.log("usersBusiness -> canPut -> begin");
            if (user.id === loggedUser.id) {
                helpers.log("UsersBusiness -> canPut -> Registrando log de auditoria");
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, user, "Usuários", "(" + user.id + ") - " + user.username, ctx.req.headers["x-real-ip"]);
                callback(true);
            } else {
                securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, user, "users", helpers.helperServer.both.actions.edit, function (canEdit) {
                    if (canEdit) {
                        helpers.log("UsersBusiness -> canPut -> Registrando log de auditoria");
                        auditBusiness.logAction(
                            bbc,
                            helpers.helperServer.both.actions.edit,
                            user,
                            "Usuários",
                            "(" + user.id + ") - " + user.username,
                            ctx.req.headers["x-real-ip"]
                        );
                    }

                    callback(canEdit);
                });
            }
        } catch (error) {
            helpers.notifyException("UsersBusiness -> canPut -> Erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    onPost: function (ctx, bbc, loggedUser, user, callback) {
        //NewFeature
        try {
            if (ctx.body.isFrontEnd) {
                bbc.students.post(
                    {
                        name: user.fullName,
                        document: user.username,
                        email: user.email,
                        isActive: true
                    },
                    function (student, error) {
                        if (error) {
                            helpers.notifyException("usersBusiness -> onPost -> Erro cadastrando estudante para usuário ->");
                            helpers.notifyException(error);
                            callback(user);
                        } else {
                            bbc.appsettings.get(function (appSettings, error) {
                                if (error) {
                                    helpers.notifyException("usersBusiness -> onPut -> erro buscando o parâmetro de grupo de usuário default ->");
                                    helpers.notifyException(error);
                                } else {
                                    if (typeof appSettings[0].defaultIdUserGroupStudent == "undefined") {
                                        helpers.notifyException("usersBusiness -> onPut -> Grupo de Usuário Padrão para Estudantes não Cadastrado");
                                    } else {
                                        bbc.usergroupusers.post(
                                            {
                                                idUser: user.id,
                                                idUserGroup: appSettings[0].defaultIdUserGroupStudent,
                                                isAllowed: true
                                            },
                                            function (userGroupUser, error) {
                                                if (error) {
                                                    helpers.notifyException("usersBusiness -> onPut -> erro buscando o parâmetro de grupo de usuário default ->");
                                                    helpers.notifyException(error);
                                                } else {
                                                    helpers.log("usersBusiness -> onPut -> grupo ativado com sucesso");
                                                    //user.idStudent = student.id;
                                                }
                                            }
                                        );
                                    }
                                }
                            });
                        }
                    }
                );
            } else {
                callback(user);
            }
        } catch (error) {
            helpers.notifyException("usersBusiness -> onPost -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    onPut: function (ctx, bbc, loggedUser, user, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, user, "users", function (_userToPost) {
                helpers.log("Users -> onPut -> setando dados padrão para usuário");
                _userToPost.systemIsPost = false;
                callback(_userToPost);
            });
        } catch (error) {
            helpers.notifyException("usersBusiness -> onPut -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    }
};
