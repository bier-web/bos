// BOS - BierOnStack - File Reserved
message.message-tag.ui.tiny.modal
    i.close.icon(if='{opts.canClose}')
    div.ui.header(if='{opts.type==messageType.custom}' class='{opts.headerClass}')
        i.icon(class='{opts.headerIcon}')
        | { opts.title }
    div.ui.header.red(if='{opts.type==messageType.error}')
        i.icon.remove
        | { opts.title }
    div.ui.header.orange(if='{opts.type==messageType.warning}')
        i.icon.warning
        | { opts.title }
    div.ui.header.green(if='{opts.type==messageType.positive}')
        i.icon.warning
        | { opts.title }
    div.content
        p { opts.message }
    div.actions(if='{opts.actions.length>0}')
        div.ui.button(each='{opts.actions}' click='{  parent.processClick }' class='{classes}') {name}
    div.actions(if='{opts.actions.length==0}')
        div.ui.button(click='{closeMessage}') OK
    script messageTag.call(this, this.opts)