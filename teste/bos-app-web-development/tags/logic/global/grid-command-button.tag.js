/* BOS - BierOnStack - File Reserved */
// Esta tag encapsula todos os botões de commando das grids, que são vinculados a telas de cadastros, edição, deleção, etc
gridCommandButtonTag = function (opts) {
    // definição de variáveis privadas;
    var _self = this;
    let _filterOptionsOpened = false;
    _self.showButtons = _self.parent.opts.properties.commandButtons;
    _self.addEditTag = undefined;

    // definição de métodos internos privados;
    // mostra a tela de adição e edição de registro;
    _self.showAddEditScreen = function (action) {
        // muda a cor da primeira TR para action;
        $(String.format("{0} .grid-content[data-id={1}] table thead tr:first-child th", _self.parent.gridIdClass, _self.parent.gridId)).addClass("grid-action");
        $(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}] tr", _self.parent.gridIdClass, _self.parent.gridId)).addClass("disabled");

        // monta a tag de addEdit que vem acompanhada das configurações passadas da grid;
        _self.addEditTag = riot.mount(
            $(
                String.format(
                    "{0} {1} .grid-screen-content[data-id={2}] .screen-crud[data-id={2}]",
                    _self.parent.opts.properties.mainContainer,
                    _self.parent.gridIdClass,
                    _self.parent.gridId
                )
            ),
            _self.parent.opts.properties.addEditTag,
            {
                action: action,
                mainContainer: _self.parent.opts.properties.mainContainer,
                addEditTag: _self.parent.opts.properties.addEditTag,
                gridCommandOrigin: _self,
                options: _self.parent.opts.properties.addEditOptions
            }
        );
        // mostra a tela de addEdit com efeito de transição;
        $(String.format("{0} {1} .grid-screen-content[data-id={2}]", _self.parent.opts.properties.mainContainer, _self.parent.gridIdClass, _self.parent.gridId)).transition({
            animation: "fade",
            onComplete: function () {
                // após mostrar a tela, foca o campo marcado como firstFocus;
                $(
                    String.format(
                        "{0} {1} .grid-screen-content[data-id={2}] .firstFocus",
                        _self.parent.opts.properties.mainContainer,
                        _self.parent.gridIdClass,
                        _self.parent.gridId
                    )
                ).focus();
            }
        });
    };

    // esconde a tela de adição e edição de registro;
    _self.hideAddEditScreen = function () {
        $(String.format("{0} {1} .grid-screen-content[data-id={2}]", _self.parent.opts.properties.mainContainer, _self.parent.gridIdClass, _self.parent.gridId)).transition({
            animation: "fade",
            onComplete: function () {
                _self.addEditTag[0].unmount();
                $(String.format("{0} {1} .grid-screen-content[data-id={2}]", _self.parent.opts.properties.mainContainer, _self.parent.gridIdClass, _self.parent.gridId)).append(
                    String.format('<div class="screen-crud" data-id={0}/>', _self.parent.gridId)
                );
                $(String.format("{0} .grid-content[data-id={1}] table thead tr:first-child th", _self.parent.gridIdClass, _self.parent.gridId)).removeClass("grid-action");
                $(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}] tr", _self.parent.gridIdClass, _self.parent.gridId)).removeClass("disabled");
            }
        });
    };

    _self.showFilterOptions = function () {
        // adiciona a classe que deixa a row cinza (ativa)
        $(String.format("{0} .grid-content[data-id={1}] table thead tr:first-child th", _self.parent.gridIdClass, _self.parent.gridId)).addClass("grid-action");

        // mostra a tag grid-filter, que apresenta para filtro os campos setados como filtraveis na renderização da grid;
        $(String.format("{0} .grid-filter-content[data-id={1}]", _self.parent.gridIdClass, _self.parent.gridId)).transition({
            animation: "fade",
            onComplete: function () {
                // ativa o primeiro item dos filtros da grid, caso ester ainda não esteve ativado;
                _filterOptionsOpened = true;
                $(".button").popup();
            }
        });
    };

    _self.hideFilterOptions = function (nextAction) {
        if (_filterOptionsOpened) {
            $(String.format("{0} .grid-filter-content[data-id={1}]", _self.parent.gridIdClass, _self.parent.gridId)).transition({
                animation: "fade",
                onComplete: function () {
                    $(String.format("{0} .grid-content[data-id={1}] table thead tr:first-child th", _self.parent.gridIdClass, _self.parent.gridId)).removeClass("grid-action");
                    _filterOptionsOpened = false;
                    nextAction();
                    $(".button").popup();
                }
            });
        } else {
            nextAction();
        }
    };

    _self.refreshGridData = function (applyFilter, updatePaginationComponent, skipValue, showLoading) {
        var _showLoading = showLoading != undefined ? showLoading : true;
        if (_self.parent.opts.collection.filtered || applyFilter) {
            // mostra o loading;
            // restaura os filtros para o filtro padrão passado no momento da montagem da grid;
            _self.parent.opts.collection.queryOptions = $.extend({}, _self.parent.opts.collection.originalQueryOptions);
            _self.parent.opts.collection.filtered = false;
            _self.parent.applyFilterColumnsBased();
            $.extend(_self.parent.opts.collection.queryOptions, { search: true });
            if (_showLoading) _self.parent.opts.gridObject.showLoading(true);

            var queryOptionsWithSkip = skipValue ? $.extend({ $skip: skipValue }, _self.parent.opts.collection.queryOptions) : _self.parent.opts.collection.queryOptions;
            var queryOptions = _self.parent.opts.properties.showPagination
                ? $.extend(
                      {
                          $limit: _self.parent.opts.properties.showPagination.pageSize
                      },
                      queryOptionsWithSkip
                  )
                : queryOptionsWithSkip;

            bbc.boswrappergetdata.get(
                {
                    collectionSettings: JSON.stringify(_self.parent.opts.collection),
                    queryOptions: JSON.stringify(queryOptions)
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
                        if (updatePaginationComponent && _self.parent.opts.properties.showPagination) _self.parent.updatePaginationComponent(dataResult);
                        if (_showLoading) _self.parent.opts.gridObject.showLoading(false);
                        _self.parent.opts.data = dataResult.data;
                        _self.parent.opts.refreshData = true;
                        riot.mount(
                            $(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}]", _self.parent.gridIdClass, _self.parent.gridId)),
                            "grid-body",
                            _self.parent.opts
                        );
                    }
                }
            );
        } else {
            _self.parent.opts.gridObject.showLoading(true);
            _self.parent.opts.collection.queryOptions = $.extend({}, _self.parent.opts.collection.originalQueryOptions);
            var queryOptionsWithSkip = skipValue
                ? $.extend({ $skip: skipValue }, _self.parent.opts.collection.originalQueryOptions)
                : _self.parent.opts.collection.originalQueryOptions;
            var queryOptions = _self.parent.opts.properties.showPagination
                ? $.extend(
                      {
                          $limit: _self.parent.opts.properties.showPagination.pageSize
                      },
                      queryOptionsWithSkip
                  )
                : queryOptionsWithSkip;

            bbc.boswrappergetdata.get(
                {
                    collectionSettings: JSON.stringify(_self.parent.opts.collection),
                    queryOptions: JSON.stringify(queryOptions)
                },
                function (dataResult, error) {
                    if (error || dataResult.result == helpersWebApp.both().dataResult.error) {
                        iziToast.error({
                            title: "Erro interno do sistema, informe o administrador",
                            message: dataResult.errorMessage,
                            position: "center"
                        });
                        return;
                    } else {
                        if (updatePaginationComponent) _self.parent.updatePaginationComponent(dataResult);
                        _self.parent.opts.data = dataResult.data;
                        _self.parent.opts.refreshData = true;
                        riot.mount(
                            $(String.format("{0} .grid-content[data-id={1}] table tbody[data-id={1}]", _self.parent.gridIdClass, _self.parent.gridId)),
                            "grid-body",
                            _self.parent.opts
                        );
                        if (_showLoading) _self.parent.opts.gridObject.showLoading(false);
                    }
                }
            );
        }
    };

    // botão adicionar encapsulando código para funcionar em todas as telas;
    _self.addClick = function () {
        // mostra a tela de addEdit com a opção de adicionar;
        _self.showAddEditScreen(helpersWebApp.both().actions.add);
        // atualiza essa mesma tag mostrando apenas os botões save e cancel;
        _self.showButtons = [helpersWebApp.both().actions.save, helpersWebApp.both().actions.cancel];
        // atualiza o estado da aplicação para em processo de inserção
        app.state = bosAppState.inserting;
        _self.update();
    };

    // botão salvar que chama o método saveClick da tag addEdit renderizada;
    _self.saveClick = function () {
        if (typeof _self.addEditTag[0].saveClick == "undefined") {
            console.log("A tag de bussiness montada não tem o método de salvar declarado (convenção)");
        } else {
            _self.addEditTag[0].saveClick();
        }
    };

    // botão cancelar a edição ou inserção de um novo registro, fechando a tela e voltando ao estado normal;
    _self.cancelClick = function () {
        if (typeof _self.addEditTag[0].cancelClick != "undefined") _self.addEditTag[0].cancelClick();

        app.state = bosAppState.browsing;
        _self.hideAddEditScreen();
        _self.showButtons = _self.parent.opts.properties.commandButtons;
        _self.update();
    };

    // botão filtrar que mostra as opções de filtro para a coleção;
    _self.filterClick = function () {
        _self.showFilterOptions();
        // reconfigura os botões da tag;
        _self.showButtons = [helpersWebApp.both().actions.confirm, helpersWebApp.both().actions.close, helpersWebApp.both().actions.clear];
        _self.update();
    };

    // botão confirmar que aplica o filtro na coleção de acordo com os parâmetros passados pelo usuário;
    _self.confirmClick = function (showLoading) {
        _self.refreshGridData(true, true, undefined, showLoading);
    };

    // botão para fechar a action aberta (primeira tr da grid)
    _self.closeClick = function () {
        _self.hideFilterOptions(function () {
            _self.showButtons = _self.parent.opts.properties.commandButtons;
            _self.update();
        });
    };

    _self.clearClick = function () {
        _self.parent.opts.collection.filtered = false;
        _self.refreshGridData(false, true);
        $(String.format("{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}]", _self.parent.gridIdClass, _self.parent.gridId)).form("clear");
        // Comentado pois estava desabilitando o input do lookup.
        // $(String.format('{0} .grid-filter-content[data-id={1}] .grid-filter-form[data-id={1}] .field-column input', _self.parent.gridIdClass, _self.parent.gridId)).attr('disabled', true);
    };

    // método chamado pelas telas addEdit que informam a grid quando um registro foi salvo;
    _self.itemSaved = function (entity, action) {
        app.state = bosAppState.browsing;
        switch (action) {
            case helpersWebApp.both().actions.add:
                _self.refreshGridData(undefined, true);
                _self.hideAddEditScreen();
                _self.showButtons =
                    typeof _self.parent.opts.properties.commandButtonsAfterSave === "undefined"
                        ? _self.parent.opts.properties.commandButtons
                        : _self.parent.opts.properties.commandButtonsAfterSave;

                if (typeof _self.parent.opts.properties.onInsert !== "undefined") _self.parent.opts.properties.onInsert(entity);

                _self.update();
                break;

            case helpersWebApp.both().actions.edit:
                _self.hideAddEditScreen();
                _self.showButtons = _self.parent.opts.properties.commandButtons;
                _self.update();
                break;

            case helpersWebApp.both().actions.remove:
                setTimeout(function () {
                    _self.refreshGridData(undefined, true);
                }, 500);
                break;
        }
    };

    // chama o método método load (já deve existir por convenção) da tag addEdit
    _self.editClick = function (entity, readOnly) {
        app.loading(true);
        // método hideFilterOptions recebe um callback como parâmetro: caso aberto o filtro, fecha e mostra a tela de edição, senão somente mostra a tela de edição;
        _self.hideFilterOptions(function () {
            // mostra a tela de addEdit com a opção de adicionar;
            _self.showAddEditScreen(helpersWebApp.both().actions.edit);
            app.state = bosAppState.editing;
            // informa para a tagAddEdit para editar um registro;
            let collectionSettings = Object.assign({}, _self.parent.opts.collection);
            collectionSettings.dataType = helpersWebApp.both().dataType.singleCollection;
            let queryOptions = { id: entity.id };
            bbc.boswrappergetdata.get(
                {
                    collectionSettings: JSON.stringify(collectionSettings),
                    queryOptions: JSON.stringify(queryOptions)
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
                        _self.addEditTag[0].load(dataResult.data, readOnly);
                        // atualiza essa mesma tag mostrando apenas os botões save e cancel;
                        _self.showButtons = readOnly ? [helpersWebApp.both().actions.cancel] : [helpersWebApp.both().actions.save, helpersWebApp.both().actions.cancel];
                        _self.update();
                        app.loading(false);
                    }
                }
            );
        });
    };

    _self.removeClick = function (entity) {
        iziToast.question({
            close: true,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            title: "Atenção",
            message: "Deseja apagar o registro?",
            position: "center",
            buttons: [
                [
                    "<button><b>Sim</b></button>",
                    function (instance, toast) {
                        app.loading(true);
                        _self.addEditTag = riot.mount(
                            $(String.format("{0} {1} .screen-crud[data-id={2}]", _self.parent.opts.properties.mainContainer, _self.parent.gridIdClass, _self.parent.gridId)),
                            _self.parent.opts.properties.addEditTag,
                            {
                                onlyBusiness: true,
                                action: helpersWebApp.both().actions.remove,
                                gridCommandOrigin: _self
                            }
                        );
                        _self.addEditTag[0].removeItem(entity.id);
                        _self.addEditTag[0].unmount();
                        $(
                            String.format("{0} {1} .grid-screen-content[data-id={2}]", _self.parent.opts.properties.mainContainer, _self.parent.gridIdClass, _self.parent.gridId)
                        ).append(String.format('<div class="screen-crud" data-id={0}/>', _self.parent.gridId));
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    },
                    true
                ],
                [
                    "<button>Não</button>",
                    function (instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    }
                ]
            ],
            onClosing: function (instance, toast, closedBy) {},
            onClosed: function (instance, toast, closedBy) {}
        });
    };

    _self.exportClick = function (action) {
        app.loading(true);
        let _collectionCloneOptions = $.extend({}, _self.parent.opts.collection);
        _collectionCloneOptions.dataType = helpersWebApp.both().dataType.exportData;
        bbc.exportreports.get({ collection: _collectionCloneOptions }, function (exportResult, error) {
            app.loading(false);
            if (error || exportResult.result == helpersWebApp.both().dataResult.error) {
                iziToast.error({
                    title: helpersWebApp.both().formatString("Erro ao exportar os dados: {0}", error.message || exportResult.result.errorMessage),
                    message: error,
                    position: "center"
                });
            } else {
                switch (exportResult.result.id) {
                    case helpersWebApp.both().dataResult.success.id:
                        if (exportResult.exportedFileName) {
                            bbc.systemsettings.get({ name: "downloadPath" }, function (downloadPath, error) {
                                if (error) {
                                    iziToast.error({
                                        title: "Erro ao exportar os dados: ",
                                        message: error,
                                        position: "center"
                                    });
                                } else {
                                    window.open(String.format("{0}{1}", downloadPath[0].value, exportResult.exportedFileName));
                                }
                            });
                        }
                        break;

                    case helpersWebApp.both().dataResult.exportQueued.id:
                        iziToast.info({
                            title: "Exportando o relatório",
                            message: "Seu relatório está sendo exportado, você será avisado quando estiver pronto (acesse no menu Relatório / Exportações)",
                            position: "center"
                        });
                        break;
                }
            }
        });
    };

    _self.filterOptionsOpened = function () {
        return _filterOptionsOpened;
    };
};
