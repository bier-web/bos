let auditBusiness = requireModule("audit-business");
let securityBusiness = requireModule("security-business");
let helpers = requireModule("helpers");

var supportStatusesBusiness = {
    canPost: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportStatus, "supportstatuses", helpers.helperServer.both.actions.add, function (canAdd) {
                if (canAdd) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> canPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canPost";
        }
    },
    onPost: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> onPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onPost";
        }
    },
    canPut: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportStatus, "supportstatuses", helpers.helperServer.both.actions.edit, function (canEdit) {
                if (canEdit) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("supportstatuses -> canPut -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canPut";
        }
    },
    onPut: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            supportStatus.systemIsPost = false;
            // auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, loggedUser, 'supportstatuses', '(' + supportStatus.id + ') - ' + supportStatus.name, ctx.req.headers['x-real-ip']);
            callback(supportStatus);
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> onPut -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onPut";
        }
    },
    canDelete: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportStatus, "supportstatuses", helpers.helperServer.both.actions.remove, function (canRemove) {
                if (canRemove) {
                    throw "Implemente as validações de remoção da coleção";
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> canDelete -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canDelete";
        }
    },
    onDelete: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            // helpers.log('supportStatusesBusiness -> canPut -> Registrando log de auditoria');
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.remove,
                loggedUser,
                "supportstatuses",
                "(" + supportStatus.id + ") - " + supportStatus.name,
                ctx.req.headers["x-real-ip"]
            );
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> onDelete -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onDelete";
        }
    },
    prepareObjectToPost: function (ctx, bbc, loggedUser, supportStatus, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, supportStatus, "supportstatuses", function (objectToPost) {
                supportStatus.systemIsPost = true;
                supportStatus.isFinalStatus = false;
                supportStatus.isActive = true;
                callback(objectToPost);
            });
        } catch (error) {
            helpers.notifyException("supportStatusesBusiness -> prepareObjectToPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar prepareToPost";
        }
    }
};

module.exports = supportStatusesBusiness;
