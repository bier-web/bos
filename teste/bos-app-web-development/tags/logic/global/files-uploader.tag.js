filesUploaderTag = function (opts) {
    // lista de variáveis utilizadas no componente;
    let _self = this;
    let _myDropzone;
    let _filesPath;
    let _callbackOnUploadFinished;
    let _filesUploaded = [];

    // antes de montar o componente;
    _self.on("before-mount", function () {});

    // ao montar o componente;
    _self.on("mount", function () {
        bbc.systemsettings.get({ name: "ned_FilesPath" }, function (systemSetting, error) {
            if (error) {
                iziToast.error({
                    title: "E001 - lendo filesPath",
                    message: "Informe essa mensagem ao suporte",
                    position: "center"
                });
            } else {
                _filesPath = systemSetting[0].value;
                // criar e configura o componente dropzone, para mostrar as Mídias e possibilitar novos uploads;
                _myDropzone = new Dropzone(".dropzone", {
                    // evento disparado ao iniciar o componente dropzone;
                    init: function () {},
                    // evento para renomear os arquivos carregados, antes de enviar;
                    renameFile: function (filename) {
                        return opts.prefixFile + "_" + new Date().getTime() + "_" + filename.name;
                    },
                    succes: function (file) {
                        console.log(JSON.stringify(file));
                    },
                    // evento chamado ao final do upload de cada arquivo;
                    complete: function (file, responseText) {
                        // declaração de variáveis necessárias para o evento complete, chamado quando cada arquivo tem o upload feito com sucesso;
                        let _fileInformation = {};
                        let _allFilesUploaded = true;

                        // acrescenta na lista cada arquivo enviado com sucesso;
                        if (file.status == "success") {
                            _fileInformation.size = file.upload.bytesSent;
                            _fileInformation.fileName = file.upload.filename;
                            _fileInformation.url = String.format("{0}{1}", _filesPath, file.upload.filename);
                            _filesUploaded.push(_fileInformation);
                        }

                        // verifica se ainda existe algum arquivo pendente de processamento;
                        _myDropzone.files.forEach((file) => {
                            if (!_allFilesUploaded) return;
                            _allFilesUploaded = file.status == "stored" || file.status == "success";
                        });
                        // se todos os arquivos foram enviados, então adiciona os arquivos que já estão armazenados e chama o callback;
                        if (_allFilesUploaded) {
                            // verifica se foi passado o callback e chama, passando a lista de arquivos enviados bem como os que já estavam gravados
                            if (typeof _callbackOnUploadFinished != "undefined" && _allFilesUploaded) _callbackOnUploadFinished(_filesUploaded);
                            this.removeAllFiles();
                            _filesUploaded = [];
                        } else {
                            _myDropzone.processQueue();
                        }
                    },
                    addRemoveLinks: true,
                    maxFilesize: opts.maxFilesize,
                    maxFiles: opts.maxFiles,
                    parallelUploads: 10,
                    acceptedFiles: ".xlsx, .xls",
                    autoProcessQueue: false,
                    dictDefaultMessage: "Selecione a Planilha para enviar",
                    dictCancelUpload: "Cancelar",
                    dictRemoveFile: "Remover",
                    dictMaxFilesExceeded: "Quantidade máxima de arquivos excedida!",
                    url: "/files-upload/post"
                });
            }
        });
    }),
        (_self.myDropzone = function () {
            return _myDropzone;
        }),
        (_self.filesPath = function () {
            return _filesPath;
        }),
        (_self.processUploads = function (callback) {
            let _filesToProcess = false;
            _callbackOnUploadFinished = callback;
            _myDropzone.files.forEach((file) => {
                switch (file.status) {
                    case "queued":
                        _filesToProcess = true;
                        break;
                    case "stored":
                        _filesUploaded.push(file.original);
                        break;
                }
            });

            if (_filesToProcess) _myDropzone.processQueue();
            else _callbackOnUploadFinished(_filesUploaded);
        });
};
