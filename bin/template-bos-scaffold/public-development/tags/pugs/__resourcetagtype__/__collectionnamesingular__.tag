__collectionnamesingular__.__collectionnamesingular__-tag
    div.ui.segment.__collectionnamesingular__-container
        form.__collectionnamesingular__-form.ui.tiny.equal.width.form.error(autocomplete="off")
            input(type='hidden' id='__collectionnamesingular__-id')
            div.ui.grid.wide.middle.aligned
                div.row
                    div.ui.error.message
                div.row.two.columns
                    div.column
                        div.field
                            label Nome
                            input.firstFocus(type='text' id='__collectionnamesingular__-name' placeholder='Nome' )
    script __collectionnamesingularcammelcase__Tag.call(this, this.opts)
