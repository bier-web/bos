files-uploader.files-uploader-tag
    form.dropzone(action="/files-upload" id='{ opts.formName }')
        div.fallback
            input(name="file" type="file" multiple)
    script filesUploaderTag.call(this, this.opts)


