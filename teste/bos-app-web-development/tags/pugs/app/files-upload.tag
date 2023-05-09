files-upload.files-upload-tag
    div.ui.segment.files-upload-container
        form.files-upload-form.ui.mini.equal.width.form.error(autocomplete="off")
            div.ui.grid.wide.middle.aligned.stackable
                div.row
                    div.column
                        a.ui.blue.horizontal.label Planilha para Upload
                div.row.one.column
                    div.column
                        div.files-uploader
                         div.row.center.aligned
                div.row.one.column         
                    div.column
                        button-tag(button-type='{ helpersWebApp.both().actions.arrowUp }' button-fluid=true button-color='orange' icon-color='black' button-label='Enviar' button-size='large'  button-click='{ uploadClick }')
    script filesUploadTag.call(this, this.opts)
