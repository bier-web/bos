// BOS - BierOnStack - File Reserved
notification.notification-tag
    a.profile-notifications.ui.label.medium(class='{"red" : notifications>0 }' onclick = '{ navigateToNotificationScreen }' )
        i.icon.mail
        | { notifications>0 ? notifications : 0}
    script notificationTag.call(this, this.opts)  