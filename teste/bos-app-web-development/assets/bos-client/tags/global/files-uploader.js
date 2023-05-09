
riot.tag2('files-uploader', '<form class="dropzone" action="/files-upload" id="{opts.formName}"> <div class="fallback"> <input name="file" type="file" multiple> </div> </form>', '', 'class="files-uploader-tag"', function(opts) {
filesUploaderTag.call(this, this.opts)
});