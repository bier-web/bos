/* BOS - BierOnStack - File Reserved */
supportPriorityTag = function (opts) {
    let _self = this;
    let _gridCommandOrigin = opts.gridCommandOrigin;

    this.mixin(mixForCrudScreens, opts);
    this.on("mount", function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.supportpriorities.post({}, function (supportPriority, error) {
                if (error) {
                    iziToast.error({
                        title: "Erro ao adicionar o item",
                        message: error.message,
                        position: "center"
                    });
                } else {
                    _self.load(supportPriority);
                }
            });
        }

        if (!opts.onlyBusiness) {
            _self.prepareForm();
        }
    });

    this.prepareForm = function () {
        $(".support-priority-tag .support-priority-form").form({
            on: "submit",
            inline: true,
            fields: {
                name: {
                    identifier: "support-priority-name",
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

                bbc.supportpriorities.post(
                    {
                        id: $(".support-priority-tag .support-priority-form #support-priority-id").val(),
                        name: $(".support-priority-tag .support-priority-form #support-priority-name").val(),
                        cssClassIcon: $(".support-priority-tag .support-priority-form #support-priority-css-class-icon").val(),
                        isActive: $(".support-priority-tag .support-priority-form #support-priority-is-active").prop("checked"),
                        isToNotification: $(".support-priority-tag .support-priority-form #support-priority-is-to-notification").prop("checked"),
                        priorityId: $(".support-priority-tag .support-priority-form #support-priority-priority-id").val()
                    },
                    function (supportPriorities, error) {
                        if (error) {
                            // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
                            app.loading(false);
                            helpersWebApp.showErrors($(".support-priority-tag .support-priority-form"), error);
                            $(".support-priority-tag .support-priority-form .firstFocus").focus();
                        } else {
                            app.loading(false);
                            // notifica a grid que o item foi salvado, para fechar a tela;
                            _gridCommandOrigin.itemSaved(supportPriorities, opts.action);
                        }
                    }
                );
            }
        });
    };

    this.saveClick = function () {
        $(".support-priority-tag .support-priority-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($("#support-priority-id").val());
        }
    };

    this.load = function (supportPriority) {
        _self.supportPriority = supportPriority;
        $(".support-priority-tag .support-priority-form #support-priority-id").val(supportPriority.id);
        $(".support-priority-tag .support-priority-form #support-priority-name").val(supportPriority.name);
        $(".support-priority-tag .support-priority-form #support-priority-css-class-icon").val(supportPriority.cssClassIcon);
        $(".support-priority-tag .support-priority-form #support-priority-is-active").prop("checked", supportPriority.isActive);
        $(".support-priority-tag .support-priority-form #support-priority-is-to-notification").prop("checked", supportPriority.isToNotification);
        $(".support-priority-tag .support-priority-form #support-priority-priority-id").val(supportPriority.priorityId);

        _self.prepareForm();
        app.loading(false);
    };

    this.removeItem = function (id) {
        bbc.supportpriorities.del(id, function (result, error) {
            if (error) {
                // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
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
