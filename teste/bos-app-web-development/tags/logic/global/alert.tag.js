/* BOS - BierOnStack - File Reserved */
alertTag = function (opts) {
    var _self = this;
    var _gridCommandOrigin = opts.gridCommandOrigin;

    // adiciona na tag os métodos dinâmicos que configuram automaticamente algumas ações / opções do form;
    this.mixin(mixForCrudScreens, opts);

    this.on("mount", function () {
        // caso seja uma adição, insere um novo registro no banco (se for cancelado, o registro é apagado);
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.alerts.post({}, function (newItem) {
                _self.load(newItem);
                app.loading(false);
            });
        }
    });

    this.prepareForm = function () {
        $(".alert-tag .alert-form").form({
            on: "submit",
            inline: true,
            fields: {
                alertTitle: {
                    identifier: "alert-title",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Digite o título do aviso que deseja emitir"
                        }
                    ]
                },
                alertAlert: {
                    identifier: "alert-alert",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Digite o aviso que deseja emitir"
                        }
                    ]
                },
                alertType: {
                    identifier: "typeId",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Informe o tipo do aviso"
                        }
                    ]
                },
                alertActor: {
                    identifier: "actorId",
                    rules: [
                        {
                            type: "isTargetPublicEmpty[userGroupId,userId]",
                            prompt: "Informe o público alvo"
                        }
                    ]
                },
                alertUserGroup: {
                    identifier: "userGroupId",
                    rules: [
                        {
                            type: "isTargetPublicEmpty[actorId,userId]",
                            prompt: "Informe o público alvo"
                        }
                    ]
                },
                alertUser: {
                    identifier: "userId",
                    rules: [
                        {
                            type: "isTargetPublicEmpty[actorId,userGroupId]",
                            prompt: "Informe o público alvo"
                        }
                    ]
                },
                alertStartDate: {
                    identifier: "alert-start-date",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Você precisa informar a data inicial"
                        }
                    ]
                },
                alertEndDate: {
                    identifier: "alert-end-date",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Você precisa informar a data final"
                        }
                    ]
                }
            },

            onSuccess: function (e) {
                e.preventDefault();
                e.stopPropagation();
                app.loading(true);

                bbc.alerts.post(
                    {
                        id: $(".alert-tag .alert-form #alert-id").val(),
                        title: $(".alert-tag .alert-form #alert-title").val(),
                        alert: $(".alert-tag .alert-form #alert-alert").val(),
                        startDate: moment($(".alert-tag .alert-form #alert-start-date").val()).toISOString(),
                        endDate: moment($(".alert-tag .alert-form #alert-end-date").val()).toISOString(),
                        typeId: $(".alert-tag .alert-form #alert-type-id .dropdown").dropdown("get value")[0],
                        actorId: $(".alert-tag .alert-form #alert-actor-id .dropdown").dropdown("get value")[0],
                        userGroupId: $(".alert-tag .alert-form #alert-user-group-id .dropdown").dropdown("get value")[0],
                        userId: $(".alert-tag .alert-form #alert-user-id .dropdown").dropdown("get value")[0],
                        isActive: $(".alert-tag .alert-form #alert-is-active").prop("checked")
                    },
                    function (alert, error) {
                        if (error) {
                            // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
                            app.loading(false);
                            helpersWebApp.showErrors($(".alert-tag .alert-form"), error);
                            $(".alert-tag .alert-form .firstFocus").focus();
                        } else {
                            app.loading(false);
                            // notifica a grid que o item foi salvado, para fechar a tela;
                            _gridCommandOrigin.itemSaved(alert, opts.action);
                        }
                    }
                );
            }
        });
    };

    this.saveClick = function () {
        $(".alert-tag .alert-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($(".alert-tag .alert-form #alert-id").val());
        }
    };

    this.load = function (alert) {
        _self.alert = alert;
        // carrega as informações do cliente na tela;
        $(".alert-tag .alert-form #alert-id").val(alert.id);
        $(".alert-tag .alert-form #alert-title").val(alert.title);
        $(".alert-tag .alert-form #alert-alert").val(alert.alert);

        if (typeof alert.startDate !== "undefined" && alert.startDate !== "")
            $(".alert-tag .alert-form #alert-start-date").val(new Date(alert.startDate).toISOString().slice(0, 10));

        if (typeof alert.endDate !== "undefined" && alert.endDate !== "") $(".alert-tag .alert-form #alert-end-date").val(new Date(alert.endDate).toISOString().slice(0, 10));

        $(".alert-tag .alert-form #alert-is-active").prop("checked", alert.isActive);

        app.loading(true);
        riot.mount($(".alert-tag .lookup-combobox-types"), "lookup-combobox", {
            placeholder: "Informe o tipo de aviso",
            lookupName: "Tipos de Aviso",
            data: [alertTypes.warning, alertTypes.news, alertTypes.urgent],
            fieldId: "id",
            fieldDescription: "name",
            onLoad: function (lookupItem) {
                lookupItem.dropdown("set selected", alert.typeId);
                _self.prepareForm();
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".alert-tag .lookup-combobox-actors"), "lookup-combobox", {
            placeholder: "Informe o público alvo",
            lookupName: "Lista de Público Alvo",
            collection: {
                name: "actors",
                queryOptions: "{ $sort: { name: 1 } }"
            },
            fieldId: "id",
            formFieldId: "actorId",
            fieldDescription: "name",
            onChange: function (newValue) {
                if (newValue != "") {
                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").addClass("disabled");
                    $(".alert-tag .alert-form #alert-user-id .dropdown").addClass("disabled");

                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").dropdown("clear");
                    $(".alert-tag .alert-form #alert-user-id .dropdown").dropdown("clear");
                } else {
                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").removeClass("disabled");
                    $(".alert-tag .alert-form #alert-user-id .dropdown").removeClass("disabled");
                }
            },
            onLoad: function (lookupItem) {
                lookupItem.dropdown("set selected", alert.actorId);
                _self.prepareForm();
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".alert-tag .lookup-combobox-user-groups"), "lookup-combobox", {
            placeholder: "Informe o grupo de usários",
            lookupName: "Lista de Grupos de Usuários",
            collection: {
                name: "usergroups",
                queryOptions: "{ $sort: { name: 1 } }"
            },
            formFieldId: "userGroupId",
            fieldId: "id",
            fieldDescription: "name",
            onChange: function (newValue) {
                if (newValue != "") {
                    $(".alert-tag .alert-form #alert-user-id .dropdown").addClass("disabled");
                    $(".alert-tag .alert-form #alert-actor-id .dropdown").addClass("disabled");

                    $(".alert-tag .alert-form #alert-actor-id .dropdown").dropdown("clear");
                    $(".alert-tag .alert-form #alert-user-id .dropdown").dropdown("clear");
                } else {
                    $(".alert-tag .alert-form #alert-user-id .dropdown").removeClass("disabled");
                    $(".alert-tag .alert-form #alert-actor-id .dropdown").removeClass("disabled");
                }
            },
            onLoad: function (lookupItem) {
                lookupItem.dropdown("set selected", alert.userGroupId);
                _self.prepareForm();
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".alert-tag .lookup-combobox-users"), "lookup-combobox", {
            placeholder: "Informe o usuário",
            lookupName: "Lista de Usuários",
            collection: {
                name: "users",
                queryOptions: "{ $sort: { username: 1 } }"
            },
            formFieldId: "userId",
            fieldId: "id",
            fieldDescription: "username",
            onChange: function (newValue) {
                if (newValue != "") {
                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").addClass("disabled");
                    $(".alert-tag .alert-form #alert-actor-id .dropdown").addClass("disabled");

                    $(".alert-tag .alert-form #alert-actor-id .dropdown").dropdown("clear");
                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").dropdown("clear");
                } else {
                    $(".alert-tag .alert-form #alert-user-group-id .dropdown").removeClass("disabled");
                    $(".alert-tag .alert-form #alert-actor-id .dropdown").removeClass("disabled");
                }
            },
            onLoad: function (lookupItem) {
                lookupItem.dropdown("set selected", alert.userId);
                _self.prepareForm();
                app.loading(false);
            }
        });
    };

    this.removeItem = function (id) {
        bbc.alerts.del(id, function (result, error) {
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
