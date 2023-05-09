/* BOS - BierOnStack - File Reserved */
userGroupTag = function (opts) {
    var _self = this;
    var _gridCommandOrigin = opts.gridCommandOrigin;

    this.mixin(mixForCrudScreens, opts);
    this.on("mount", function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.usergroups.post({}, function (newUserGroup) {
                _self.load(newUserGroup);
            });
        }

        if (!opts.onlyBusiness) {
            $(".user-group-tag .user-group-form").form({
                on: "submit",
                inline: true,
                fields: {
                    userGroupName: {
                        identifier: "user-group-name",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Digite o nome do grupo de usuário"
                            }
                        ]
                    }
                },
                onSuccess: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    app.loading(true);
                    bbc.usergroups.post(
                        {
                            id: $(".user-group-tag .user-group-form #user-group-id").val(),
                            name: $(".user-group-tag .user-group-form #user-group-name").val(),
                            isActive: $(".user-group-tag .user-group-form #user-group-active").prop("checked")
                        },
                        function (userGroup, error) {
                            if (error) {
                                // caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
                                app.loading(false);
                                helpersWebApp.showErrors($(".user-group-tag .user-group-form"), error);
                                $(".user-group-tag .user-group-form .firstFocus").focus();
                            } else {
                                app.loading(false);
                                // notifica a grid que o item foi salvado, para fechar a tela;
                                _gridCommandOrigin.itemSaved(userGroup, opts.action);
                            }
                        }
                    );
                }
            });
        }
    });

    this.saveClick = function () {
        $(".user-group-tag .user-group-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($(".user-group-tag .user-group-form #user-group-id").val());
        }
    };

    this.load = function (userGroup) {
        _self.userGroup = userGroup;
        $(".user-group-tag .user-group-form #user-group-id").val(userGroup.id);
        $(".user-group-tag .user-group-form #user-group-name").val(userGroup.name);
        $(".user-group-tag .user-group-form #user-group-active").prop("checked", userGroup.isActive);

        let tagRenderingCount = 4;

        app.loading(true);
        riot.mount(".user-group-tag #user-group-users", "user-group-users", {
            userGroup: userGroup,
            showType: "users",
            postRender: function () {
                tagRenderingCount--;
                app.loading(false);
                if (tagRenderingCount == 0) $(".user-group-tag .user-group-container .item").tab();
            }
        });

        app.loading(true);
        riot.mount(".user-group-tag #user-group-menus", "user-group-menus", {
            userGroup: userGroup,
            postRender: function () {
                tagRenderingCount--;
                app.loading(false);
                if (tagRenderingCount == 0) $(".user-group-tag .user-group-container .item").tab();
            }
        });

        app.loading(true);
        riot.mount(".user-group-tag #user-group-permissions", "user-group-permissions", {
            userGroup: userGroup,
            postRender: function () {
                tagRenderingCount--;
                app.loading(false);

                if (tagRenderingCount == 0) $(".user-group-tag .user-group-container .item").tab();
            }
        });

        app.loading(true);
        riot.mount(".user-group-tag #user-group-dimensions", "user-group-dimensions", {
            userGroup: userGroup,
            postRender: function () {
                tagRenderingCount--;
                app.loading(false);

                if (tagRenderingCount == 0) $(".user-group-tag .user-group-container .item").tab();
            }
        });

        app.loading(false);
    };

    this.removeItem = function (id) {
        bbc.usergroups.del(id, function (result, error) {
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
