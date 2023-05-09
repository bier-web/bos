var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");
var helpers = requireModule("helpers");

var exportsManagerBusiness = {
    canGet: function (ctx, bbc, loggedUser, exportManager, callback) {
        try {
            try {
                helpers.helperServer.showLog("BierOnStack Debug: mediasBusiness_canGet !! Put your custom code to canGet here !!");
                securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, exportManager, "exportsmanager", helpers.helperServer.both.actions.read, function (canRead) {
                    callback(canRead);
                });
            } catch (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: mediasBusiness_canGet ->  Exception {0}", error.message));
            }
        } catch (error) {
            helpers.notifyException("exportsManagerBusiness -> canGet -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    onPost: function (ctx, bbc, loggedUser, exportManager, callback) {
        try {
        } catch (error) {
            helpers.notifyException("exportsManagerBusiness -> onPost -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    onDelete: function (ctx, bbc, loggedUser, exportManager, callback) {
        try {
        } catch (error) {
            helpers.notifyException("exportsManagerBusiness -> onDelete -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    },
    prepareObjectToPost: function (ctx, bbc, loggedUser, exportManager, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, exportManager, "exportsmanager", function (objectToPost) {
                exportManager.operationStatusId = helpers.helperServer.both.operationStatus.queued.id;
                callback(objectToPost);
            });
        } catch (error) {
            helpers.notifyException("exportsManagerBusiness -> prepareObjectToPost -> erro desconhecido ->");
            helpers.notifyException(error);
        }
    }
};

module.exports = exportsManagerBusiness;
