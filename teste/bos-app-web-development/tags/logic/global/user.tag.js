/* BOS - BierOnStack - File Reserved: ToChange */
userTag = function (opts) {
    var _self = this;
    var _gridCommandOrigin = opts.gridCommandOrigin;

    this.mixin(mixForCrudScreens, opts);
    this.on("mount", function () {
        app.loading(true);
        if (opts.action == helpersWebApp.both().actions.add) {
            bbc.users.post(
                {
                    username: "Novo Usuário",
                    fullName: "Nome completo novo usuário",
                    password: "senha",
                    isProfileCompleted: false,
                    systemIsPost: true
                },
                function (newUser, error) {
                    if (error) {
                        console.log("users.tag -> mount -> Erro criando um usuário ->");
                        console.log(error);
                    } else {
                        newUser.username = "";
                        newUser.fullName = "";
                        _self.load(newUser);
                    }
                }
            );
        }

        this.configForm(false);
        $(".user-form #user-password").on("change", this.passwordChange);
    });

    this.passwordChange = function () {
        _self.configForm($(".user-form #user-password").val() !== "");
    };

    this.configForm = function (validatePassword) {
        if (!opts.onlyBusiness) {
            $(".user-tag .user-form").form({
                on: "submit",
                inline: true,
                fields: {
                    userUserName: {
                        identifier: "user-username",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Digite o nome do usuário"
                            }
                        ]
                    },
                    userPassword: {
                        identifier: "user-password",
                        optional: !validatePassword,
                        rules: [
                            {
                                type: "minLength[6]",
                                prompt: "Digite uma senha com no mínimo {ruleValue} caracteres."
                            }
                        ]
                    },
                    userPasswordConfirm: {
                        identifier: "user-password-confirm",
                        optional: !validatePassword,
                        rules: [
                            {
                                type: "empty",
                                prompt: "Digite sua senha novamente."
                            },
                            {
                                type: "match[user-password]",
                                prompt: "Digite a mesma senha informada."
                            }
                        ]
                    },
                    userFullName: {
                        identifier: "user-full-name",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Digite o nome completo da pessoa."
                            }
                        ]
                    }
                },
                onSuccess: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    app.loading(true);

                    var _userModel;

                    if ($(".user-form #user-password").val() !== "") {
                        _userModel = {
                            id: $(".user-tag .user-form #user-id").val(),
                            username: $(".user-tag .user-form #user-username").val(),
                            password: $(".user-tag .user-form #user-password").val(),
                            fullName: $(".user-tag .user-form #user-full-name").val(),
                            email: $(".user-tag .user-form #user-email").val(),
                            isActive: $(".user-tag .user-form #user-active").prop("checked"),
                            backofficeId: $(".user-tag .user-form #user-backoffice-id .dropdown").dropdown("get value")[0],
                            supervisorId: $(".user-tag .user-form #user-supervisor-id .dropdown").dropdown("get value")[0],
                            coordinatorId: $(".user-tag .user-form #user-coordinator-id .dropdown").dropdown("get value")[0],
                            sellerId: $(".user-tag .user-form #user-seller-id .dropdown").dropdown("get value")[0]
                        };
                    } else {
                        _userModel = {
                            id: $(".user-tag .user-form #user-id").val(),
                            username: $(".user-tag .user-form #user-username").val(),
                            fullName: $(".user-tag .user-form #user-full-name").val(),
                            email: $(".user-tag .user-form #user-email").val(),
                            isActive: $(".user-tag .user-form #user-active").prop("checked"),
                            backofficeId: $(".user-tag .user-form #user-backoffice-id .dropdown").dropdown("get value")[0],
                            supervisorId: $(".user-tag .user-form #user-supervisor-id .dropdown").dropdown("get value")[0],
                            coordinatorId: $(".user-tag .user-form #user-coordinator-id .dropdown").dropdown("get value")[0],
                            sellerId: $(".user-tag .user-form #user-seller-id .dropdown").dropdown("get value")[0]
                        };
                    }

                    bbc.users.post(_userModel, function (user, error) {
                        if (error) {
                            app.loading(false);
                            helpersWebApp.showErrors($(".user-tag .user-form"), error);
                            $(".user-tag .user-form .firstFocus").focus();
                        } else {
                            app.loading(false);
                            _gridCommandOrigin.itemSaved(user, opts.action);
                        }
                    });
                }
            });
        }
    };

    this.saveClick = function () {
        $(".user-tag .user-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($(".user-tag .user-form #user-id").val());
        }
    };

    this.load = function (user) {
        bbc.appsettings.get(function (appSettings) {
            let appSetting = appSettings[0];
            _self.user = user;

            $(".user-tag .user-form #user-id").val(user.id);
            $(".user-tag .user-form #user-username").val(user.username);
            $(".user-tag .user-form #user-full-name").val(user.fullName);
            $(".user-tag .user-form #user-email").val(user.email);
            $(".user-tag .user-form #user-active").prop("checked", user.isActive);

            app.loading(true);
            riot.mount($(".user-tag #user-backoffice-id .lookup-combobox-tag"), "lookup-combobox", {
                placeholder: "Colaborador vinculado Backoffice",
                lookupName: "Lista de Backoffices",
                collection: {
                    name: "employees",
                    options: {
                        $or: [{ employeePositionId: { $in: appSetting.backofficeEmployeePositionIds } }, { id: user.backofficeId }],
                        $sort: { name: 1 }
                    }
                },
                onChange: function (newValue) {},
                fieldId: "id",
                formFieldId: "backofficeId",
                fieldDescription: "name",
                onLoad: function (lookupItem) {
                    lookupItem.dropdown("set selected", user.backofficeId);
                    app.loading(false);
                }
            });

            app.loading(true);
            riot.mount($(".user-tag #user-supervisor-id .lookup-combobox-tag"), "lookup-combobox", {
                placeholder: "Colaborador vinculado Supervisor",
                lookupName: "Lista de Supervisores",
                collection: {
                    name: "employees",
                    options: {
                        $or: [{ employeePositionId: { $in: appSetting.supervisorEmployeePositionIds } }, { id: user.supervisorId }],
                        $sort: { name: 1 }
                    }
                },
                onChange: function (newValue) {},
                fieldId: "id",
                formFieldId: "supervisorId",
                fieldDescription: "name",
                onLoad: function (lookupItem) {
                    lookupItem.dropdown("set selected", user.supervisorId);
                    app.loading(false);
                }
            });

            app.loading(true);
            riot.mount($(".user-tag #user-coordinator-id .lookup-combobox-tag"), "lookup-combobox", {
                placeholder: "Colaborador vinculado Coordenador",
                lookupName: "Lista de Coordenador",
                collection: {
                    name: "employees",
                    options: {
                        $or: [{ employeePositionId: { $in: appSetting.coordinatorEmployeePositionIds } }, { id: user.coordinatorId }],
                        $sort: { name: 1 }
                    }
                },
                onChange: function (newValue) {},
                fieldId: "id",
                formFieldId: "coordinatorId",
                fieldDescription: "name",
                onLoad: function (lookupItem) {
                    app.loading(false);
                    lookupItem.dropdown("set selected", user.coordinatorId);
                }
            });

            app.loading(true);
            riot.mount($(".user-tag #user-seller-id .lookup-combobox-tag"), "lookup-combobox", {
                placeholder: "Colaborador vinculado Vendedor",
                lookupName: "Lista de Vendedor",
                collection: {
                    name: "employees",
                    options: {
                        $or: [{ employeePositionId: { $in: appSetting.sellerEmployeePositionIds } }, { id: user.sellerId }],
                        $sort: { name: 1 }
                    }
                },
                onChange: function (newValue) {},
                fieldId: "id",
                formFieldId: "sellerId",
                fieldDescription: "name",
                onLoad: function (lookupItem) {
                    app.loading(false);
                    lookupItem.dropdown("set selected", user.sellerId);
                }
            });

            riot.mount(".user-tag #user-group-users", "user-group-users", {
                user: user,
                showType: "groups"
            });
            app.loading(false);
        });
    };

    this.removeItem = function (id) {
        bbc.users.del(id, function (result, error) {
            if (error) {
                // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
                iziToast.error({
                    title: "Erro ao remover o item",
                    message: error.message,
                    position: "center"
                });
            } else {
                // notifica a grid que o item foi salvado, para fechar a tela;
                _gridCommandOrigin.itemSaved(undefined, helpersWebApp.both().actions.remove);
            }
            app.loading(false);
        });
    };
};
