/* BOS - BierOnStack - File Reserved */
userGroupMenusTag = function (opts) {
    let _self = this;
    let _grid = undefined;
    _self.userGroup = opts.userGroup;

    _self.on("mount", function () {
        let gridUserGroupMenus = {
            properties: {
                gridType: helpersWebApp.gridType.crud,
                mainParent: _self,
                showHeader: false,
                name: "menus do grupo",
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
                mainContainer: ".user-group-menus-container",
                actionRow: true,
                showPagination: {
                    pageSize: 15
                },
                dataColumns: [
                    {
                        name: "name",
                        weight: "three",
                        type: "text",
                        class: "center aligned",
                        title: {
                            type: "text",
                            content: "Menu",
                            class: "bold"
                        }
                    },
                    {
                        weight: "eight",
                        type: "text",
                        name: "description",
                        title: {
                            type: "text",
                            content: "Descrição do Menu",
                            class: "bold"
                        }
                    },
                    {
                        weight: "two",
                        type: "checkbox",
                        name: "userGroupMenuIsAllowed",
                        class: "center aligned",
                        onClick: function (isChecked, data) {
                            _grid.showLoading(true);

                            if (isChecked) {
                                bbc.usergroupmenus.post(
                                    {
                                        userGroupId: _self.userGroup.id,
                                        menuId: data.id
                                    },
                                    function (userGroupMenu, error) {
                                        _grid.showLoading(false);

                                        if (error) {
                                            iziToast.error({
                                                title: "Erro ao salvar menu no grupo",
                                                message: String.Format("Erro ao salvar menu para o grupo: {0}", error.message),
                                                position: "center"
                                            });
                                        }
                                    }
                                );
                            } else {
                                bbc.usergroupmenus.del(data.userGroupMenuId, function (userGroupMenu, error) {
                                    _grid.showLoading(false);

                                    if (error) {
                                        iziToast.error({
                                            title: "Erro ao salvar menu no grupo",
                                            message: String.Format("Erro ao salvar menu para o grupo: {0}", error.message),
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
                name: "menus",
                queryOptions: {
                    userGroupId: opts.userGroup.id,
                    isSeparator: { $ne: true },
                    include: "usergroupmenus",
                    $sort: { name: 1 }
                }
            }
        };

        _grid = riot.mount("#grid-user-group-menus", "grid", gridUserGroupMenus)[0];
    });
};
