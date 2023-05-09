/* BOS - BierOnStack - File Reserved: ToChange */
homeTag = function (opts) {
    this.on("mount", function () {
        if (!app.navigationTag) app.navigationTag = riot.mount("navigation", { isCreating: true });

        var gridAlerts = {
            properties: {
                gridType: helpersWebApp.gridType.crud,
                name: "Avisos",
                class: "striped",
                size: "wide",
                item_tap: function (element, data) {},
                item_postRender: function (element, data) {},
                item_changed: function (element, data) {},
                postRender: function (element, data) {},
                showFilter: false,
                commandButtons: [],
                addEditTag: "",
                mainContainer: ".home-container",
                actionRow: true,
                filterColumns: [],
                dataColumns: [
                    {
                        name: "typeId",
                        weight: "one",
                        type: "icon",
                        searchData: [alertTypes.warning, alertTypes.news, alertTypes.urgent],
                        icon: function (data) {
                            switch (data.typeId) {
                                case alertTypes.warning.id:
                                    return alertTypes.warning.icon;
                                    break;

                                case alertTypes.urgent.id:
                                    return alertTypes.urgent.icon;
                                    break;

                                case alertTypes.news.id:
                                    return alertTypes.news.icon;
                                    break;
                            }
                        },
                        class: "center aligned",
                        title: {
                            type: "text",
                            content: "Tipo",
                            class: "bold center aligned"
                        }
                    },
                    {
                        name: "title",
                        weight: "two",
                        type: "text",
                        class: "bold italic",
                        title: {
                            type: "text",
                            content: "Título",
                            class: "bold"
                        }
                    },
                    {
                        name: "alert",
                        weight: "seven",
                        type: "text",
                        class: "bold italic",
                        title: {
                            type: "text",
                            content: "Alerta",
                            class: "bold"
                        }
                    },
                    {
                        name: "emittedAt",
                        weight: "three",
                        type: "date",
                        format: "lll",
                        class: "bold italic",
                        title: {
                            type: "text",
                            content: "Emitido",
                            class: "bold"
                        }
                    },
                    {
                        weight: "one",
                        type: "checkbox",
                        name: "isVisualized",
                        class: "center aligned",
                        searchName: "isVisualized",
                        searchType: "lookup",
                        searchFieldId: "id",
                        searchFieldDescription: "name",
                        searchData: [
                            { id: true, name: "Sim" },
                            { id: false, name: "Não" }
                        ],
                        onClick: function (isChecked, data) {
                            data.include = ["no_emit", "setReaded"];
                            data.isReaded = isChecked;
                            bbc.alerts.post(data, function (alert, error) {
                                if (error) {
                                    iziToast.error({
                                        title: "Erro ao salvar visualização de alerta",
                                        message: String.Format("Erro ao salvar permissão: {0}", error.message),
                                        position: "center"
                                    });
                                }
                            });
                        },
                        title: {
                            type: "text",
                            content: "Lido?",
                            class: "center aligned"
                        }
                    }
                ]
            },
            collection: {
                viewName: "viewalertshome",
                reportLabel: "avisos para você",
                name: "alerts",
                dataType: helpersWebApp.both().dataType.singleView,
                noUpdateEvent: true,
                events: [
                    {
                        name: window.loggedUser.id + "updatedHomeAlerts",
                        onEvent: function (data, opts) {
                            opts.gridCommandButtons.confirmClick(); // reaplica o filtro na grid para atualizar com o novo alerta.
                        }
                    }
                ]
            }
        };

        riot.mount("#grid-alerts", "grid", gridAlerts);
    });
};
