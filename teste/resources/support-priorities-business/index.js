let auditBusiness = requireModule("audit-business");
let securityBusiness = requireModule("security-business");
let helpers = requireModule("helpers");

var supportPrioritiesBusiness = {
    canPost: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportPriority, "supportpriorities", helpers.helperServer.both.actions.add, function (canAdd) {
                if (canAdd) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> canPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canPost";
        }
    },
    onPost: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> onPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onPost";
        }
    },
    canPut: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportPriority, "supportpriorities", helpers.helperServer.both.actions.edit, function (canEdit) {
                if (canEdit) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("support-priorities -> canPut -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canPut";
        }
    },
    onPut: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            supportPriority.systemIsPost = false;
            throw "Implemente o log onPut da coleção";
            // auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, loggedUser, 'supportpriorities', '(' + supportPriority.id + ') - ' + supportPriority.name, ctx.req.headers['x-real-ip']);
            callback(supportPriority);
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> onPut -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onPut";
        }
    },
    canDelete: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, supportPriority, "supportpriorities", helpers.helperServer.both.actions.remove, function (canRemove) {
                if (canRemove) {
                    throw "Implemente as validações de remoção da coleção";
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
            });
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> canDelete -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar canDelete";
        }
    },
    onDelete: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            // helpers.log('supportPrioritiesBusiness -> canPut -> Registrando log de auditoria');
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.remove,
                loggedUser,
                "supportpriorities",
                "(" + supportPriority.id + ") - " + supportPriority.name,
                ctx.req.headers["x-real-ip"]
            );
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> onDelete -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar onDelete";
        }
    },
    prepareObjectToPost: function (ctx, bbc, loggedUser, supportPriority, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, supportPriority, "supportpriorities", function (objectToPost) {
                supportPriority.systemIsPost = true;
                supportPriority.isActive = true;
                supportPriority.isToNotification = false;
                callback(objectToPost);
            });
        } catch (error) {
            helpers.notifyException("supportPrioritiesBusiness -> prepareObjectToPost -> erro desconhecido ->");
            helpers.notifyException(error);
            throw "Erro ao chamar prepareToPost";
        }
    }
};

module.exports = supportPrioritiesBusiness;
