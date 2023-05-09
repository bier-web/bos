// BOS - BierOnStack - File Reserved
header-alert.header-alert-tag
    div.header-alert-grid.ui.wide.grid.middle.aligned.center.aligned
        div.row
            div.ui.segment.red
                div.ui.grid.center.aligned.middle.aligned
                    div.row
                        div.ui.small.centered.logo.image
                    div.row
                        h5 Origem
                    div.row
                        div.details { getConnectionDetails() }
    script headerAlertTag.call(this, this.opts)                    
