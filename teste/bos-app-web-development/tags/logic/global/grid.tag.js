/* BOS - BierOnStack - File Reserved */
gridTag = function (opts) {
    let _self = this;
    let _gridCommandButtons = undefined;
    let _myUpdateDataInterval;
    let _processExecuting = 0;

    _self.gridId = guid();
    _self.gridIdClass = String.format(".{0}", _self.gridId);

    this.on("mount", function () {
        // insere uma classe com o id da grid para identificar nos demais controles;
        $(".grid-tag").addClass(_self.gridId);

        // identifica todos os elementos que fazem parte da grid com o id principal, para evitar conflitos em grid aninhadas;
        $(String.format("{0} .grid-content:not([data-id])", _self.gridIdClass)).attr("data-id", _self.gridId);
        $(String.format("{0} .grid-content table tbody:not([data-id])", _self.gridIdClass)).attr("data-id", _self.gridId);
        $(String.format("{0} .grid-content table tfoot:not([data-id])", _self.gridIdClass)).attr("data-id", _self.gridId);
        $(String.format("{0} .grid-filter-content:not([data-id])", _self.gridIdClass)).attr("data-id", _self.gridId);
        $(String.format("{0} .grid-screen-content:not([data-id])", _self.gridIdClass)).attr("data-id", _self.gridId);

        // Caso o objeto venha vazio, então preenche com vazio para mandar ao bbc;
        opts.collection.queryOptions = $.extend({}, opts.collection.queryOptions);
        opts.collection.permissionOptions = {
            canAdd: false,
            canEdit: false,
            canRemove: false
        };

        // caso a opção actionRow (mostrar linha de ações) esteja habilitada, renderiza e guarda a referência do componente gridCommandButtons, que encapsula as regras de ações da grid;
        if (opts.properties.actionRow) {
            _gridCommandButtons = _self.tags["grid-command-button"];
            _gridCommandButtons.update();
        }

        if (opts.collection.updateDataTimeOut != undefined) {
            _myUpdateDataInterval = setInterval(function () {
                if (!_gridCommandButtons.filterOptionsOpened()) _gridCommandButtons.confirmClick();
            }, opts.collection.updateDataTimeOut);
        }

        if (!opts.data) {
            switch (opts.properties.gridType) {
                case helpersWebApp.gridType.crud:
                    _self.getDataThenLoadCrud();
                    break;
                case helpersWebApp.gridType.dashboard:
                    _self.getDataThenLoadDashboard();
                    break;
                default:
                    _self.getDataThenLoadCrud();
                    break;
            }
        }
    });

    this.on("unmount", function () {
        clearInterval(_myUpdateDataInterval);
    });

    _self.showLoading = function (isLoading) {
        isLoading ? _processExecuting++ : _processExecuting > 0 ? _processExecuting-- : _processExecuting;
        $(String.format(".grid-tag{0} .grid-content .grid-loading", _self.gridIdClass)).dimmer(_processExecuting > 0 ? "show" : "hide");
    };

    _self.getPermissions = function (callback) {
        bbc.permissions.get({ userPermissionCollection: opts.collection.name }, function (permissions, error) {
            if (permissions.length > 0) {
                permissions.forEach(function (permission) {
                    switch (permission.actionId) {
                        case helpersWebApp.both().actions.add.index:
                            opts.collection.permissionOptions.canAdd = true;
                            break;

                        case helpersWebApp.both().actions.edit.index:
                            opts.collection.permissionOptions.canEdit = true;
                            break;

                        case helpersWebApp.both().actions.remove.index:
                            opts.collection.permissionOptions.canRemove = true;
                            break;

                        default:
                            if (permission.actionId > 100) {
                                // Permissões maior que 100 são permissões de aplicação;
                                Object.values(appActions).forEach((appAction, index) => {
                                    if (permission.actionId == appAction.index) {
                                        opts.collection.permissionOptions[Object.getOwnPropertyNames(appActions)[index]] = permission.actionId;
                                    }
                                });
                            }
                    }
                });

                callback();
            } else {
                callback();
            }
        });
    };

    _self.getDataThenLoadCrud = function () {
        _self.getPermissions(function () {
            _self.opts.gridObject = _self;

            // Aguarda o sistema de filtros renderizar tudo que precisa;
            _self.gridFilterOnLoad = function () {
                if (opts.properties.actionRow) {
                    _gridCommandButtons.update();
                }

                opts.collection.originalQueryOptions = $.extend({}, opts.collection.queryOptions);
                _self.applyFilterColumnsBased();

                if (_self.opts.collection.filtered) $.extend(opts.collection.queryOptions, { search: true });
                var _queryOptions =
                    typeof opts.properties.showPagination == "object"
                        ? $.extend(
                              {
                                  $limit: opts.properties.showPagination.pageSize
                              },
                              opts.collection.queryOptions
                          )
                        : opts.collection.queryOptions;

                app.loading(true);
                bbc.boswrappergetdata.get(
                    {
                        collectionSettings: JSON.stringify(opts.collection),
                        queryOptions: JSON.stringify(_queryOptions)
                    },
                    function (dataResult, error) {
                        if (error || dataResult.result.id == helpersWebApp.both().dataResult.error.id) {
                            iziToast.error({
                                title: "Erro interno do sistema, informe o administrador",
                                message: dataResult.errorMessage,
                                position: "center"
                            });
                            app.loading(false);
                            return;
                        } else {
                            if (typeof opts.properties.showPagination == "object") {
                                _self.updatePaginationComponent(dataResult);
                            }

                            _self.opts.data = dataResult.data;
                            _self.opts.gridCommandButtons = _gridCommandButtons;
                            _self.opts.gridObject = _self;

                            riot.mount($(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}]", _self.gridIdClass, _self.gridId)), "grid-body", _self.opts);
                            if (opts.data) opts.properties.postRender(this.root, opts.data);
                            app.loading(false);
                        }
                    }
                );
            };

            riot.mount($(String.format("{0} .grid-content[data-id={1}] .grid-filter[data-id={1}]", _self.gridIdClass, _self.gridId)), "grid-filter", _self.opts);
        });
    };

    _self.getDataThenLoadDashboard = function () {
        _self.getPermissions(function () {
            _self.gridFilterOnLoad = function () {
                opts.collection.originalQueryOptions = $.extend({}, opts.collection.queryOptions);
                _self.applyFilterColumnsBased();
                if (_self.opts.collection.filtered) $.extend(opts.collection.queryOptions, { search: true });

                // carrega limitando a quantidade se estiver configurado a paginação
                var _queryOptions = opts.collection.queryOptions;
                window.loggedUser.dimensions.forEach((dimension) => {
                    if (window.loggedUser[dimension.userField] != undefined) {
                        let newDimensionField = {};
                        newDimensionField[dimension.userField] = window.loggedUser[dimension.userField];
                        _queryOptions = $.extend(newDimensionField, _queryOptions);
                    }
                });

                app.loading(true);
                bbc[optsCollection.viewName || optsCollection.name].get(_queryOptions, function (data, error) {
                    if (error) {
                        iziToast.error({
                            title: "Erro renderizando a grid:",
                            message: error
                        });

                        return;
                    }

                    _self.opts.data = data;
                    _self.opts.gridCommandButtons = _gridCommandButtons;
                    _self.opts.gridObject = _self;

                    riot.mount($(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}]", _self.gridIdClass, _self.gridId)), "grid-body", _self.opts);
                    if (opts.properties.actionRow) {
                        _gridCommandButtons.update();
                    }

                    if (opts.data) opts.properties.postRender(this.root, opts.data);
                    app.loading(false);
                });
            };

            _self.opts.gridObject = _self;
            riot.mount($(String.format("{0} .grid-content[data-id={1}] .grid-filter[data-id={1}]", _self.gridIdClass, _self.gridId)), "grid-filter", _self.opts);
        });
    };

    _self.updatePaginationComponent = function (objectData) {
        if (objectData.count > _self.opts.properties.showPagination.pageSize) {
            riot.mount($(String.format("{0} .grid-content[data-id={1}] table tfoot[data-id={1}]", _self.gridIdClass, _self.gridId)), "grid-footer", {
                objectData: objectData,
                gridOptions: _self.opts,
                gridCommand: _gridCommandButtons
            });
        } else {
            if ($(String.format("{0} .grid-content[data-id={1}] table tfoot[data-id={1}]", _self.gridIdClass, _self.gridId)).children()[0] != undefined) {
                $(String.format("{0} .grid-content[data-id={1}] table tfoot[data-id={1}]", _self.gridIdClass, _self.gridId)).children()[0].remove();
            }
        }
    };

    _self.applyFilterColumnsBased = function () {
        if (opts.properties.filterColumns != undefined) {
            opts.properties.filterColumns.forEach(function (column) {
                if (
                    (column.visible != undefined && !column.visible) ||
                    (column.permission != undefined && Object.values(opts.collection.permissionOptions).indexOf(column.permission.index) < 0)
                )
                    return true;

                switch (column.type) {
                    case "date":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked &&
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (
                                $(
                                    String.format(
                                        "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                        _self.gridIdClass,
                                        _self.gridId,
                                        column.name
                                    )
                                )[0].checked
                            ) {
                                var valueToFindStartDate = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)
                                ).val();
                                valueToFindStartDate =
                                    valueToFindStartDate == ""
                                        ? moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1]
                                        : moment(valueToFindStartDate).format("YYYY-MM-DDT00:00:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                            } else {
                                var valueToFindStartDate = moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                            }

                            if (
                                $(
                                    String.format(
                                        "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox",
                                        _self.gridIdClass,
                                        _self.gridId,
                                        column.name
                                    )
                                )[0].checked
                            ) {
                                var valueToFindEndDate = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}1", _self.gridId, column.name)
                                ).val();
                                valueToFindEndDate =
                                    valueToFindEndDate == ""
                                        ? moment(
                                              $(String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)).val()
                                          ).format("YYYY-MM-DDT23:59:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1]
                                        : moment(valueToFindEndDate).format("YYYY-MM-DDT23:59:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                            } else {
                                valueToFindEndDate =
                                    moment(
                                        $(String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)).val()
                                    ).format("YYYY-MM-DDT23:59:00.000") + new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                            }
                        }
                        break;

                    case "datetime":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked &&
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (
                                $(
                                    String.format(
                                        "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                        _self.gridIdClass,
                                        _self.gridId,
                                        column.name
                                    )
                                )[0].checked
                            ) {
                                var valueToFindStartDate = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)
                                ).val();
                                valueToFindStartDate =
                                    valueToFindStartDate == ""
                                        ? moment(new Date()).format("YYYY-MM-DDT00:00:00.000")
                                        : moment(valueToFindStartDate).format("YYYY-MM-DDTHH:mm:00.000");
                            } else {
                                var valueToFindStartDate = moment(new Date()).format("YYYY-MM-DDT00:00:00.000");
                            }

                            if (
                                $(
                                    String.format(
                                        "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}1-checkbox",
                                        _self.gridIdClass,
                                        _self.gridId,
                                        column.name
                                    )
                                )[0].checked
                            ) {
                                var valueToFindEndDate = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}1", _self.gridId, column.name)
                                ).val();
                                valueToFindEndDate =
                                    valueToFindEndDate == "" ? moment(new Date()).format("YYYY-MM-DDT23:59:00.000") : moment(valueToFindEndDate).format("YYYY-MM-DDTHH:mm:00.000");
                            } else {
                                valueToFindEndDate = moment(valueToFindStartDate).format("YYYY-MM-DDT23:59:00.000");
                            }
                        }
                        break;

                    case "text":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (typeof column.searchType === "undefined") {
                                var valueToFind = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)
                                ).val();
                            } else if (column.searchType === "lookup") {
                                if (typeof column.searchKeyType != "undefined") {
                                    switch (column.searchKeyType) {
                                        case searchKeyType.int:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                                return tryParseInt(i, i);
                                            });
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;

                                        case searchKeyType.string:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;
                                    }
                                } else {
                                    var arrayValuesToFind = $(
                                        String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                    )
                                        .dropdown("get value")[0]
                                        .split(",");
                                    arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                        return tryParseInt(i, i);
                                    });
                                    var valueToFind = $.extend({}, arrayValuesToFind);
                                }
                            }
                        }
                        break;

                    case "number":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (typeof column.searchType === "undefined") {
                                var valueToFind = $(
                                    String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0", _self.gridId, column.name)
                                ).val();
                            } else if (column.searchType === "lookup") {
                                if (typeof column.searchKeyType != "undefined") {
                                    switch (column.searchKeyType) {
                                        case searchKeyType.int:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                                return tryParseInt(i, i);
                                            });
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;

                                        case searchKeyType.string:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;
                                    }
                                } else {
                                    var arrayValuesToFind = $(
                                        String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                    )
                                        .dropdown("get value")[0]
                                        .split(",");
                                    arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                        return tryParseInt(i, i);
                                    });
                                    var valueToFind = $.extend({}, arrayValuesToFind);
                                }
                            }
                        }
                        break;

                    case "icon":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (typeof column.searchType === "undefined") {
                                console.log("Erro: coluna do tipo Icon precisa ter um SearchType");
                            } else if (column.searchType === "lookup") {
                                if (typeof column.searchKeyType != "undefined") {
                                    switch (column.searchKeyType) {
                                        case searchKeyType.int:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                                return tryParseInt(i, i);
                                            });
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;

                                        case searchKeyType.string:
                                            var arrayValuesToFind = $(
                                                String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                            )
                                                .dropdown("get value")[0]
                                                .split(",");
                                            var valueToFind = $.extend({}, arrayValuesToFind);
                                            break;
                                    }
                                } else {
                                    var arrayValuesToFind = $(
                                        String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)
                                    )
                                        .dropdown("get value")[0]
                                        .split(",");
                                    arrayValuesToFind = arrayValuesToFind.map(function (i) {
                                        return tryParseInt(i, i);
                                    });
                                    var valueToFind = $.extend({}, arrayValuesToFind);
                                }
                            }
                        }
                        break;
                    case "checkbox":
                        if (
                            !$(
                                String.format(
                                    "{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] #filter-{2}0-checkbox",
                                    _self.gridIdClass,
                                    _self.gridId,
                                    column.name
                                )
                            )[0].checked
                        ) {
                            return true;
                        } else {
                            if (typeof column.searchType === "undefined") {
                                console.log("Erro: coluna do tipo Icon precisa ter um SearchType");
                            } else if (column.searchType === "lookup") {
                                var valueToFind =
                                    $(String.format(".grid-filter-content[data-id={0}] .grid-filter-form[data-id={0}] #filter-{1}0 .dropdown", _self.gridId, column.name)).dropdown(
                                        "get value"
                                    )[0] == "true";
                            }
                        }
                        break;
                }

                if (valueToFind !== "" || valueToFindStartDate !== "" || valueToFindEndDate !== "") {
                    _self.opts.collection.filtered = true;
                    switch (column.type) {
                        case "date":
                        case "datetime":
                            var extendedObject = {};
                            if ((valueToFindStartDate && !valueToFindEndDate) || (valueToFindEndDate && !valueToFindStartDate)) {
                                extendedObject[typeof column.searchName !== "undefined" ? column.searchName : column.name] = {
                                    columnType: column.type,
                                    $gte: typeof valueToFindStartDate != "undefined" ? valueToFindStartDate : typeof valueToFindEndDate != "undefined" ? valueToFindEndDate : "",
                                    $lte: typeof valueToFindStartDate != "undefined" ? valueToFindStartDate : typeof valueToFindEndDate != "undefined" ? valueToFindEndDate : ""
                                };
                            } else {
                                extendedObject[typeof column.searchName !== "undefined" ? column.searchName : column.name] = {
                                    columnType: column.type,
                                    $gte: valueToFindStartDate,
                                    $lte: valueToFindEndDate
                                };
                            }

                            $.extend(_self.opts.collection.queryOptions, extendedObject);
                            break;

                        case "text":
                            if (typeof column.searchType === "undefined") {
                                let extendedObject = {};
                                let searchExact = {};
                                extendedObject[typeof column.searchName !== "undefined" ? column.searchName : column.name] = column.searchContains
                                    ? { $regex: valueToFind, $options: "si" }
                                    : (searchExact[column.name] = valueToFind);
                                $.extend(_self.opts.collection.queryOptions, extendedObject);
                            } else if (column.searchType === "lookup") {
                                let extendedObject = {};
                                let objectToSearchValue = {};
                                let objectToSearch = {};
                                let objectExisting = {};
                                let searchOperatorValue = typeof column.searchOperatorValue != "undefined" ? column.searchOperatorValue : "$in";
                                let searchOperator = typeof column.searchOperator != "undefined" ? column.searchOperator : "$and";
                                objectToSearchValue[searchOperatorValue] = Object.values(valueToFind);
                                extendedObject[typeof column.searchName !== "undefined" ? column.searchName : column.name] = objectToSearchValue;

                                //Caso já exista um filtro aplicado na mesma coluna, então verifica o operador passado para criar uma condição dupla para a mesma coluna
                                if (_self.opts.collection.queryOptions[typeof column.searchName !== "undefined" ? column.searchName : column.name] != undefined) {
                                    objectExisting[typeof column.searchName !== "undefined" ? column.searchName : column.name] =
                                        _self.opts.collection.queryOptions[typeof column.searchName !== "undefined" ? column.searchName : column.name];
                                    objectToSearch[searchOperator] = [objectExisting, extendedObject];
                                    $.extend(_self.opts.collection.queryOptions, objectToSearch);
                                } else {
                                    $.extend(_self.opts.collection.queryOptions, extendedObject);
                                }
                            }
                            break;

                        case "number":
                            var extendedObject = {};
                            extendedObject[typeof column.searchName != "undefined" ? column.searchName : column.name] = valueToFind;
                            $.extend(_self.opts.collection.queryOptions, extendedObject);
                            break;

                        case "icon":
                            if (typeof column.searchType === "undefined") {
                                console.log("Erro: coluna do tipo Icon precisa ter um SearchType");
                            } else if (column.searchType === "lookup") {
                                var extendedObject = {};
                                extendedObject[typeof column.searchName != "undefined" ? column.searchName : column.name] = { $in: Object.values(valueToFind) };
                                $.extend(_self.opts.collection.queryOptions, extendedObject);
                            }
                            break;

                        case "checkbox":
                            if (typeof column.searchType === "undefined") {
                                console.log("Erro: coluna do tipo Icon precisa ter um SearchType");
                            } else if (column.searchType === "lookup") {
                                var extendedObject = {};
                                extendedObject[typeof column.searchName != "undefined" ? column.searchName : column.name] = valueToFind;
                                $.extend(_self.opts.collection.queryOptions, extendedObject);
                            }
                            break;
                    }
                }
            });
        }
    };
};
