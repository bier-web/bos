filesUploadTag = function (opts) {
    let _formFilesUpload;
    let _self = this;

    this.on("mount", function () {
        _self.load();
    });

    this.load = function () {
        _formFilesUpload = riot.mount($(".files-uploader"), "files-uploader", {
            formName: "form-files",
            prefixFile: "Upload",
            maxFilesize: 10,
            maxFiles: 1,
            autoProcessQueue: false
        })[0];
        app.loading(false);
    };

    this.uploadClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        _formFilesUpload.processUploads(function (uploadedFile) {
            uploadedFile.forEach((mailingFile) => {
                bbc.mailings.post(
                    {
                        name: mailingFile.fileName,
                        pathURL: mailingFile.url,
                        systemIsPost: false,
                        processingStatusId: helpersWebApp.bothApp().processingStatus[0].id
                    },
                    function (mailing, error) {
                        if (error) {
                            app.loading(false);
                            iziToast.error({
                                title: "E002 - erro desconhecido inserindo mídia",
                                message: error.message,
                                position: "center"
                            });
                        } else {
                            iziToast.info({
                                title: "Planilha subida ao servidor com sucesso,",
                                message: "em breve os Leads serão procesados...",
                                position: "center"
                            });
                        }
                    }
                );
            });
            console.log(uploadedFile);
        });
    };
};
