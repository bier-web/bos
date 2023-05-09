/* BOS - BierOnStack - File Reserved */
userGroupPermissionsTag = function (opts) {
    var _self = this;
    var _grid = undefined;
    _self.userGroup = opts.userGroup;

    _self.on("mount", function () {
        var gridUserGroupPermissions = {
            properties: {
                gridType: helpersWebApp.gridType.crud,
                mainParent: _self,
                showHeader: false,
                name: "permissões do grupo",
                class: "striped",
                size: "wide",
                item_tap: function (element, data) {},
                item_postRender: function (element, data) {},
                postRender: function (element, data) {
                    if (opts.postRender != undefined) opts.postRender(element, data);
                },
                onDelete: function (item) {},
                showFilter: false,
                commandButtons: [helpersWebApp.both().actions.filter],
                mainContainer: ".user-group-permissions-container",
                actionRow: true,
                showPagination: {
                    pageSize: helpersWebApp.gridPageSize.normal
                },
                dataColumns: [
                    {
                        name: "actionId",
                        weight: "two",
                        type: "icon",
                        class: "center aligned",
                        icon: function (data) {
                            switch (data.actionId) {
                                case helpersWebApp.both().actions.add.index:
                                    return helpersWebApp.both().actions.add.icon;
                                    break;

                                case helpersWebApp.both().actions.edit.index:
                                    return helpersWebApp.both().actions.edit.icon;
                                    break;

                                case helpersWebApp.both().actions.remove.index:
                                    return helpersWebApp.both().actions.remove.icon;
                                    break;

                                case helpersWebApp.both().actions.read.index:
                                    return helpersWebApp.both().actions.read.icon;
                                    break;
                            }
                        },
                        title: {
                            type: "text",
                            content: "Ação",
                            class: "bold"
                        }
                    },
                    {
                        weight: "ten",
                        type: "text",
                        name: "description",
                        title: {
                            type: "text",
                            content: "Permissão",
                            class: "bold"
                        }
                    },
                    {
                        weight: "two",
                        type: "checkbox",
                        name: "userGroupPermissionIsAllowed",
                        class: "center aligned",
                        onClick: function (isChecked, data) {
                            _grid.showLoading(true);
                            if (isChecked) {
                                bbc.usergrouppermissions.post(
                                    {
                                        userGroupId: _self.userGroup.id,
                                        permissionId: data.id
                                    },
                                    function (userGroupPermission, error) {
                                        _grid.showLoading(false);
                                        if (error) {
                                            iziToast.error({
                                                title: "Erro ao salvar permissão no grupo",
                                                message: String.Format("Erro ao salvar permissão para o grupo: {0}", error.message),
                                                position: "center"
                                            });
                                        }
                                    }
                                );
                            } else {
                                bbc.usergrouppermissions.del(data.userGroupPermissionId, function (userGroupPermission, error) {
                                    _grid.showLoading(false);
                                    if (error) {
                                        iziToast.error({
                                            title: "Erro ao salvar permissão no grupo",
                                            message: String.Format("Erro ao salvar permissão para o grupo: {0}", error.message),
                                            position: "center"
                                        });
                                    }
                                });
                            }
                        },
                        title: {
                            type: "icon",
                            content: "",
                            class: "setting big center aligned"
                        }
                    }
                ]
            },
            collection: {
                name: "permissions",
                queryOptions: {
                    userGroupId: opts.userGroup.id,
                    include: "usergrouppermissions",
                    $sort: { collection: 1, actionId: 1 }
                }
            }
        };

        _grid = riot.mount("#grid-user-group-permissions", "grid", gridUserGroupPermissions)[0];
    });
};
