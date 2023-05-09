/* BOS - BierOnStack */
let helpers = requireModule("helpers");
let auditBusiness = requireModule("audit-business");

module.exports = {
    canGet: function (ctx, user, menu, session, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso MenusBusiness :: Evento :: canGet :: Ação :: Begin");
            if (menu.isSeparator || menu.isSystem || user.isRoot) {
                helpers.helperServer.showLog("BierOnStack: Recurso MenusBusiness :: Evento :: canGet :: Ação :: End menu de sistema liberado");
                callback(true);
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso MenusBusiness :: Evento :: canGet :: Ação :: Analisando menus liberados para usuário");
                let _menuAllowed = false;
                session.data.userGroupMenus.forEach((userGroupMenu) => {
                    if (userGroupMenu.menuId === menu.id) {
                        helpers.helperServer.showLog(helpers.helperServer.both.formatString("BierOnStack Debug: Menu Liberado Menu {0} Usuário {1}", menu.name, user.username));
                        _menuAllowed = true;
                    }
                });

                callback((_menuAllowed && !menu.isReportMenu) || (_menuAllowed && menu.isReportMenu && process.env.ENVIRONMENT_IS_REPORT_ACTIVE));
            }
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: Menus -> canGet Exception {0}", error));
        }
    },
    onPost: function (ctx, bbc, loggedUser, menu, callback) {
        try {
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, menu, "menus", function (objectToPost) {
                objectToPost.isSystem = typeof menu.isSystem == "undefined" ? false : menu.isSystem;
                objectToPost.isRoot = typeof menu.isRoot == "undefined" ? false : menu.isRoot;
                objectToPost.isParent = typeof menu.isParent == "undefined" ? false : menu.isParent;
                objectToPost.isReportMenu = typeof menu.isReportMenu == "undefined" ? false : menu.isReportMenu;
                objectToPost.isReportMenu = typeof menu.isReportMenu == "undefined" ? false : menu.isReportMenu;
                callback(objectToPost);
            });
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: Menus -> onPost Exception {0}", error));
        }
    },
    onDelete: function (ctx, bbc, menu, oldMenu) {
        try {
            helpers.helperServer.showLog("BierOnStack Debug: Menus -> onDelete");
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.remove,
                loggedUser,
                "menus",
                "(" + menu.id + ") - " + menu.name,
                ctx.req.headers["x-real-ip"],
                oldMenu,
                menu
            );
        } catch (error) {
            helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: Menus -> onDelete Exception {0}", error));
        }
    }
};
