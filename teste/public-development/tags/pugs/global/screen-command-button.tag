// BOS - BierOnStack - File Reserved
screen-command-button.screen-command-button
    button-tag(if='{ opts.showButtons.indexOf("confirm")>-1 }' button-type='confirm' button-click='{ confirmClick }') 
    button-tag(if='{ opts.showButtons.indexOf("cancel")>-1 }' button-type='cancel' button-click='{ cancelClick }')
    script screenCommandButtonTag.call(this, this.opts)