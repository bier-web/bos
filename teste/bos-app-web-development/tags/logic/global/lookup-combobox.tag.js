/* BOS - BierOnStack - File Reserved */
lookupComboBoxTag = function (opts) {
    var _self = this;
    this.items = [];
    this.on("before-mount", function () {
        app.loading(true);
        // caso seja passado um lookup de coleção do banco...
        if (typeof opts.collection != "undefined") {
            let currentCollectionOptions = typeof opts.collection.queryOptions == "object" ? opts.collection.queryOptions : {};
            currentCollectionOptions = $.extend({}, currentCollectionOptions);
            if (opts.isLargeDropDown && typeof opts.collection.queryOptions == "object") {
                opts.selectedItemId = typeof opts.selectedItemId != "undefined" ? opts.selectedItemId : "null";
                currentCollectionOptions = $.extend(currentCollectionOptions, {
                    id: { $in: [opts.selectedItemId] }
                });
            }

            bbc.boswrappergetdata.get(
                {
                    collectionSettings: JSON.stringify(opts.collection),
                    queryOptions: JSON.stringify(currentCollectionOptions)
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
                        _self.items = dataResult.data;
                        _self.update(opts);
                        $(_self.root)
                            .find(".ui.fluid.search.dropdown")
                            .dropdown({
                                clearable: true,
                                onChange: opts.onChange,
                                fullTextSearch: opts.fullTextSearch ? opts.fullTextSearch : false
                            });

                        if (opts.defaultValue != undefined) {
                            $(_self.root).find(".ui.fluid.search.dropdown").dropdown("set selected", opts.defaultValue);
                        }

                        if (typeof opts.onLoad != "undefined") {
                            opts.onLoad($(_self.root).find(".ui.fluid.search.dropdown"), dataResult.data);
                        }

                        app.loading(false);
                    }
                }
            );
            // senão renderiza com um array já passado como parâmetro
        } else if (typeof (opts.data !== "undefined")) {
            _self.items = opts.data;
            _self.update(opts);
            setTimeout(function () {
                $(_self.root)
                    .find(".ui.fluid.search.dropdown")
                    .dropdown({
                        clearable: true,
                        onChange: opts.onChange,
                        fullTextSearch: opts.fullTextSearch ? opts.fullTextSearch : false
                    });

                if (opts.defaultValue != undefined) {
                    $(_self.root).find(".ui.fluid.search.dropdown").dropdown("set selected", opts.defaultValue);
                }

                if (typeof opts.onLoad != "undefined") {
                    opts.onLoad($(_self.root).find(".ui.fluid.search.dropdown"));
                }

                app.loading(false);
            }, 100);
        }
    });

    this.on("mount", function () {
        if (opts.autoFocus) {
            $(_self.root).find("input").focus();
        }

        $(_self.root)
            .find(".remove.icon")
            .on("click", function (e) {
                $(this).parent(".dropdown").dropdown("clear");
                e.stopPropagation();
            });

        $(_self.root)
            .find(".refresh.icon")
            .on("click", function (e) {
                app.loading(true);
                if (typeof opts.collection != "undefined") {
                    let currentCollectionOptions = typeof opts.collection.queryOptions == "object" ? opts.collection.queryOptions : {};
                    let objectFilter = {};
                    let textToFind = $(_self.root).find("input.search").val();
                    objectFilter[typeof opts.searchFieldId != "undefined" ? opts.searchFieldId : "name"] = {
                        $regex: textToFind != "" ? textToFind : "null",
                        $options: "si"
                    };
                    currentCollectionOptions = $.extend({}, currentCollectionOptions);
                    currentCollectionOptions = $.extend(currentCollectionOptions, objectFilter);
                    bbc.boswrappergetdata.get(
                        {
                            collectionSettings: JSON.stringify(opts.collection),
                            queryOptions: JSON.stringify(currentCollectionOptions)
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
                                _self.items = dataResult.data;
                                _self.update(opts);
                                $(_self.root)
                                    .find(".ui.fluid.search.dropdown")
                                    .dropdown({
                                        clearable: true,
                                        onChange: opts.onChange,
                                        fullTextSearch: opts.fullTextSearch ? opts.fullTextSearch : false
                                    });

                                if (typeof opts.onLoad != "undefined") {
                                    opts.onLoad($(_self.root).find(".ui.fluid.search.dropdown"), dataResult.data);
                                }
                                app.loading(false);
                            }
                        }
                    );
                    // senão renderiza com um array já passado como parâmetro
                } else if (typeof (opts.data !== "undefined")) {
                    _self.items = opts.data;
                    _self.update(opts);
                    setTimeout(function () {
                        $(_self.root)
                            .find(".ui.fluid.search.dropdown")
                            .dropdown({
                                clearable: true,
                                onChange: opts.onChange,
                                fullTextSearch: opts.fullTextSearch ? opts.fullTextSearch : false
                            });

                        if (typeof opts.onLoad != "undefined") {
                            opts.onLoad($(_self.root).find(".ui.fluid.search.dropdown"));
                        }

                        app.loading(false);
                    }, 100);
                }

                e.stopPropagation();
            });

        $(_self.root).find(".ui.fluid.search.dropdown").popup();
    });

    this.getLookupDescription = function (item, fieldDescription, fieldType, fieldFormat) {
        let fieldValue = fieldDescription != undefined ? item[fieldDescription] : item["name"];
        switch (fieldType) {
            case "date":
                let momentDate = moment(fieldValue != undefined ? fieldValue : "");
                return momentDate.isValid() ? momentDate.format(fieldFormat) : "Sem data definida";
                break;
            default:
                return fieldDescription != undefined ? item[fieldDescription] : item["name"];
        }
    };
};
