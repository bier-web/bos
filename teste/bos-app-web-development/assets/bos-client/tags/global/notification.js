

riot.tag2('notification', '<a class="profile-notifications ui label medium {&quot;red&quot; : notifications&gt;0}" onclick="{navigateToNotificationScreen}"><i class="icon mail"></i>{notifications>0 ? notifications : 0}</a>', '', 'class="notification-tag"', function(opts) {
notificationTag.call(this, this.opts)
});