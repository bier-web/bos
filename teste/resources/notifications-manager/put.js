let helpers = requireModule("helpers");
let notificationObject = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso NotificationsManager :: Evento :: put :: Ação :: Begin");
    if (!previous.isNotified) {
        helpers.helperServer.showLog(
            helpers.helperServer.both.formatString("BierOnStack: Recurso NotificationsManaget :: Evento :: put :: Ação :: Notificando {0}", JSON.stringify(notificationObject))
        );
        emit(notificationObject.collectionToNotification + ":" + notificationObject.messageToNotification, notificationObject.objectToNotification);
        bbc.notificationsmanager.del(notificationObject.id);
    }
    helpers.helperServer.showLog("BierOnStack: Recurso NotificationsManager :: Evento :: put :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso notificationsmanager :: Evento :: put :: Exceção :: {0}", error.message));
}
