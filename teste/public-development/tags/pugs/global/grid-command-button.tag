// BOS - BierOnStack - File Reserved
grid-command-button.grid-command-button
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.add)>-1 }' button-type='{ helpersWebApp.both().actions.add }' button-click='{ addClick }' button-enabled='{ typeof(parent.opts.collection.permissionOptions)!=="undefined" && parent.opts.collection.permissionOptions.canAdd }' ) 
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.filter)>-1 }' button-type='{ helpersWebApp.both().actions.filter }' button-click='{ filterClick }' button-active= '{ parent.opts.collection.filtered }') 
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.confirm)>-1 }' button-type='{ helpersWebApp.both().actions.confirm }' button-click='{ confirmClick }')
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.clear)>-1 }' button-type='{ helpersWebApp.both().actions.clear }' button-click='{ clearClick }')
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.close)>-1 }' button-type='{ helpersWebApp.both().actions.close }' button-click='{ closeClick }')
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.save)>-1 }' button-type='{ helpersWebApp.both().actions.save }' button-click='{ saveClick }')
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.cancel)>-1 }' button-type='{ helpersWebApp.both().actions.cancel }' button-click='{ cancelClick }')
    button-tag(if='{ showButtons.indexOf(helpersWebApp.both().actions.export)>-1 }' button-type='{ helpersWebApp.both().actions.export }' button-click='{ exportClick }')
    script gridCommandButtonTag.call(this, this.opts)