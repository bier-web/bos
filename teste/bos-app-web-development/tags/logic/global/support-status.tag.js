/* BOS - BierOnStack - File Reserved */
supportStatusTag = function (opts) {
    let _self = this;
    let _gridCommandOrigin = opts.gridCommandOrigin;

    this.mixin(mixForCrudScreens, opts);
    this.on("mount", function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.supportstatuses.post({}, function (supportStatus, error) {
                if (error) {
                    iziToast.error({
                        title: "Erro ao adicionar o item",
                        message: error.message,
                        position: "center"
                    });
                } else {
                    _self.load(supportStatus);
                }
            });
        }

        if (!opts.onlyBusiness) {
            _self.prepareForm();
        }
    });

    this.prepareForm = function () {
        $(".support-status-tag .support-status-form").form({
            on: "submit",
            inline: true,
            fields: {
                name: {
                    identifier: "support-status-name",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Digite o nome"
                        }
                    ]
                }
            },
            onSuccess: function (e) {
                e.preventDefault();
                e.stopPropagation();
                app.loading(true);

                bbc.supportstatuses.post(
                    {
                        id: $(".support-status-tag .support-status-form #support-status-id").val(),
                        name: $(".support-status-tag .support-status-form #support-status-name").val(),
                        cssClassIcon: $(".support-status-tag .support-status-form #support-status-css-class-icon").val(),
                        isActive: $(".support-status-tag .support-status-form #support-status-is-active").prop("checked"),
                        isFinalStatus: $(".support-status-tag .support-status-form #support-status-is-final-status").prop("checked")
                    },
                    function (supportStatus, error) {
                        if (error) {
                            app.loading(false);
                            helpersWebApp.showErrors($(".support-status-tag .support-status-form"), error);
                            $(".support-status-tag .support-status-form .firstFocus").focus();
                        } else {
                            app.loading(false);
                            // notifica a grid que o item foi salvado, para fechar a tela;
                            _gridCommandOrigin.itemSaved(supportStatus, opts.action);
                        }
                    }
                );
            }
        });
    };

    this.saveClick = function () {
        $(".support-status-tag .support-status-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($("#support-status-id").val());
        }
    };

    this.load = function (supportStatus) {
        _self.supportStatus = supportStatus;
        $(".support-status-tag .support-status-form #support-status-id").val(supportStatus.id);
        $(".support-status-tag .support-status-form #support-status-name").val(supportStatus.name);
        $(".support-status-tag .support-status-form #support-status-css-class-icon").val(supportStatus.cssClassIcon);
        $(".support-status-tag .support-status-form #support-status-is-active").prop("checked", supportStatus.isActive);
        $(".support-status-tag .support-status-form #support-status-is-final-status").prop("checked", supportStatus.isFinalStatus);

        _self.prepareForm();
        app.loading(false);
    };

    this.removeItem = function (id) {
        bbc.supportstatuses.del(id, function (result, error) {
            if (error) {
                app.loading(false);
                iziToast.error({
                    title: "Erro ao remover o item",
                    message: error.message,
                    position: "center"
                });
            } else {
                app.loading(false);
                // notifica a grid que o item foi salvado, para fechar a tela;
                _gridCommandOrigin.itemSaved(undefined, helpersWebApp.both().actions.remove);
            }
        });
    };
};
