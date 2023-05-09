

riot.tag2('navigation', '<div class="ui accordion" each=" {menusParent} "> <div class="title {active: isActive}"><i class="dropdown icon"></i>{name}</div> <div class="content {active: isActive}"><a class="item {&quot;ui horizontal divider separator&quot;: isSeparator} {&quot;selected&quot;: (!isSeparator &amp;&amp; parent.selectedUrl === url)}" each="{menusChildren} " href="{url}" onclick="{menuClick}"><i class="menu-icon {iconClass}" if="{!isSeparator}"></i>{isSeparator ? \'\' : name}</a></div> </div>', '', 'class="navigation-tag ui left vertical menu sidebar"', function(opts) {
navigationTag.call(this, this.opts)
});