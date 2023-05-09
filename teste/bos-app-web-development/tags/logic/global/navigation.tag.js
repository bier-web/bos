/* BOS - BierOnStack - File Reserved */
navigationTag = function (opts) {
    var self = this;
    if (opts.isCreating) {
        // regras de negócios particulares a aplicação devem ser inseridas no app.js (assets/helpers/js)
        appOnStartValidations();
        bbc.menus.get({ isParent: true, $sort: { order: 1 } }, function (menusParent, error) {
            var _countMenusParent = menusParent.length;
            menusParent.forEach(function (menuParent) {
                bbc.menus.get({ menuParentId: menuParent.id, $sort: { name: 1 } }, function (menusChildren, error) {
                    if (error) {
                    } else {
                        _countMenusParent--;
                        // prevenindo listar dois separadores um ao lado do outro (quando menus filtrados por permissões)
                        menusChildren.forEach(function (menu) {
                            if (
                                menu.isSeparator &&
                                typeof menusChildren[menusChildren.indexOf(menu) - 1] != "undefined" &&
                                menusChildren[menusChildren.indexOf(menu) - 1].isSeparator
                            ) {
                                delete menusChildren[menusChildren.indexOf(menu)];
                            }
                        });

                        menuParent.menusChildren = menusChildren;
                        if (_countMenusParent == 0)
                            self.update({
                                menusParent: menusParent,
                                isCreating: true
                            });
                    }
                });
            });
        });
    }

    this.on("updated", function () {
        $(".ui.accordion").accordion();
    });

    // fired when route to another page and set selected menu on navigation bar
    this.routed = function (url) {
        this.selectedUrl = url;
        this.update();
    };

    this.menuClick = function () {
        $(".navigation-tag").sidebar("hide");
    };
};
