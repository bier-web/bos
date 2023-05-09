/* BOS - BierOnStack */
__collectionnamesingularcammelcase__Tag = function (opts) {
    let _self = this;
    let _gridCommandOrigin = opts.gridCommandOrigin;

    this.mixin(mixForCrudScreens, opts);
    this.on("mount", function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.__collection__.post({}, function (__objectItem__, error) {
                if (error) {
                    iziToast.error({
                        title: "Erro ao adicionar o item",
                        message: error.message,
                        position: "center",
                        timeout: false
                    });
                } else {
                    _self.load(__objectItem__);
                }
            });
        }

        if (!opts.onlyBusiness) {
            _self.prepareForm();
        }
    });

    this.prepareForm = function () {
        $(".__collectionnamesingular__-tag .__collectionnamesingular__-form").form({
            on: "submit",
            inline: true,
            fields: {
                name: {
                    identifier: "__collectionnamesingular__-name",
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

                bbc.__collection__.post(
                    {
                        id: $(".__collectionnamesingular__-tag .__collectionnamesingular__-form #__collectionnamesingular__-id").val(),
                        name: $(".__collectionnamesingular__-tag .__collectionnamesingular__-form #__collectionnamesingular__-name").val()
                    },
                    function (__collectioncamelcase__, error) {
                        if (error) {
                            // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
                            app.loading(false);
                            helpersWebApp.showErrors($(".__collectionnamesingular__-tag .__collectionnamesingular__-form"), error);
                            $(".__collectionnamesingular__-tag .__collectionnamesingular__-form .firstFocus").focus();
                        } else {
                            app.loading(false);
                            // notifica a grid que o item foi salvado, para fechar a tela;
                            _gridCommandOrigin.itemSaved(__collectioncamelcase__, opts.action);
                        }
                    }
                );
            }
        });
    };

    this.saveClick = function () {
        $(".__collectionnamesingular__-tag .__collectionnamesingular__-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($("#__collectionnamesingular__-id").val());
        }
    };

    this.load = function (__collectionnamesingularcammelcase__, readOnly) {
        _self.__collectionnamesingularcammelcase__ = __collectionnamesingularcammelcase__;
        $(".__collectionnamesingular__-tag .__collectionnamesingular__-form #__collectionnamesingular__-id").val(__collectionnamesingularcammelcase__.id);
        $(".__collectionnamesingular__-tag .__collectionnamesingular__-form #__collectionnamesingular__-name").val(__collectionnamesingularcammelcase__.name);

        if (readOnly) {
            $(".__collectionnamesingular__-form :input").prop("readonly", true);
            $(".datetime-calendar").calendar({
                isDisabled: function (date, mode) {
                    return readOnly;
                }
            });
        }

        _self.prepareForm();
        app.loading(false);
    };

    this.removeItem = function (id) {
        bbc.__collection__.del(id, function (result, error) {
            if (error) {
                app.loading(false);
                iziToast.error({
                    title: "Erro ao remover o item",
                    message: error.message,
                    position: "center",
                    timeout: false
                });
            } else {
                app.loading(false);
                _gridCommandOrigin.itemSaved(undefined, helpersWebApp.both().actions.remove);
            }
        });
    };
};
