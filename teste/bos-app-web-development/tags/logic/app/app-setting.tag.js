/* BOS - BierOnStack - File Reserved: ToChange */
appSettingTag = function (opts) {
    var _self = this;
    var _gridCommandOrigin = opts.gridCommandOrigin;
    this.mixin(mixForCrudScreens, opts);

    this.on("mount", function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            app.loading(true);
            bbc.appsettings.post({}, function (newItem) {
                _self.load(newItem);
                app.loading(false);
            });
        }

        if (!opts.onlyBusiness) {
            $(".app-setting-tag .app-setting-form").form({
                on: "submit",
                inline: true,
                onSuccess: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    app.loading(true);

                    bbc.appsettings.post(
                        {
                            id: $(".app-setting-tag .app-setting-form #app-setting-id").val(),
                            name: $(".app-setting-tag .app-setting-form #app-setting-name").val(),
                            sellerEmployeePositionIds: $(".app-setting-tag .app-setting-form #app-setting-seller-employee-position-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            backofficeEmployeePositionIds: $(".app-setting-tag .app-setting-form #app-setting-backoffice-employee-position-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            supervisorEmployeePositionIds: $(".app-setting-tag .app-setting-form #app-setting-supervisor-employee-position-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            coordinatorEmployeePositionIds: $(".app-setting-tag .app-setting-form #app-setting-coordinator-employee-position-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            allowedStatusOnQueuePendingIds: $(".app-setting-tag .app-setting-form #app-setting-allowed-status-on-queue-pending-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            showedStatusOnQueuePendingIds: $(".app-setting-tag .app-setting-form #app-setting-showed-status-on-queue-pending-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            allowedStatusOnQueuePreSaleIds: $(".app-setting-tag .app-setting-form #app-setting-allowed-status-on-queue-pre-sale-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            showedStatusOnQueuePreSaleIds: $(".app-setting-tag .app-setting-form #app-setting-showed-status-on-queue-pre-sale-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            allowedStatusOnQueuePosSaleIds: $(".app-setting-tag .app-setting-form #app-setting-allowed-status-on-queue-pos-sale-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            showedStatusOnQueuePosSaleIds: $(".app-setting-tag .app-setting-form #app-setting-showed-status-on-queue-pos-sale-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            saleStatusIndexProgressionIds: $(".app-setting-tag .app-setting-form #app-setting-sale-status-index-progression-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(","),
                            saleStatusNonBlockingIds: $(".app-setting-tag .app-setting-form #app-setting-sale-status-non-blocking-ids .dropdown")
                                .dropdown("get value")[0]
                                .split(",")

                            // idSaleStatusApproved: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-approved .dropdown').dropdown('get value')[0],
                            // idSaleStatusSended: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-sended .dropdown').dropdown('get value')[0],
                            // idSaleStatusInstalled: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-installed .dropdown').dropdown('get value')[0],
                            // idSaleStatusCanceled: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-canceled .dropdown').dropdown('get value')[0],
                            // idSaleStatusProgress: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-progress .dropdown').dropdown('get value')[0],
                            // idSaleStatusDisconnected: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-disconnected .dropdown').dropdown('get value')[0],
                            // idSaleStatusHeld: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-held .dropdown').dropdown('get value')[0],
                            // idSaleStatusHeldCanceling: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-held-canceling .dropdown').dropdown('get value')[0],
                            // idSaleStatusDisconnecting: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-disconnecting .dropdown').dropdown('get value')[0],
                            // idsStatusSalesQueuePending: $('.app-setting-tag .app-setting-form #app-setting-ids-status-sales-queue-pending .dropdown').dropdown('get value')[0].split(','),

                            // idsStatusSalesQueuePreSale: $('.app-setting-tag .app-setting-form #app-setting-ids-status-sales-queue-pre-sale .dropdown').dropdown('get value')[0].split(','),
                            // idsStatusSalesQueuePosSale: $('.app-setting-tag .app-setting-form #app-setting-ids-status-sales-queue-pos-sale .dropdown').dropdown('get value')[0].split(','),
                            // reportPartialSalesByTeamsIdsStatus: $('.app-setting-tag .app-setting-form #app-setting-report-partial-sales-by-teams-ids-status .dropdown').dropdown('get value')[0].split(','),
                            // reportConsolidatedSalesIdsStatus: $('.app-setting-tag .app-setting-form #app-setting-report-consolidated-sales-ids-status .dropdown').dropdown('get value')[0].split(','),
                            // idSaleTypeTerritorial: $('.app-setting-tag .app-setting-form #app-setting-id-sale-type-territorial .dropdown').dropdown('get value')[0],
                            // idSaleTypeCondominium: $('.app-setting-tag .app-setting-form #app-setting-id-sale-type-condominium .dropdown').dropdown('get value')[0],
                            // idsStatusSalesQueueTreatment: $('.app-setting-tag .app-setting-form #app-setting-ids-status-sales-queue-treatment .dropdown').dropdown('get value')[0].split(','),
                            // idsStatusLockerSale: $('.app-setting-tag .app-setting-form #app-setting-ids-status-locker-sale .dropdown').dropdown('get value')[0].split(','),
                            // idSaleStatusCancellationCommercial: $('.app-setting-tag .app-setting-form #app-setting-id-sale-cancellation-commercial .dropdown').dropdown('get value')[0],
                            // idSaleStatusCancellationOther: $('.app-setting-tag .app-setting-form #app-setting-id-sale-cancellation-other .dropdown').dropdown('get value')[0],
                            // idSaleStatusCancellationTechnical: $('.app-setting-tag .app-setting-form #app-setting-id-sale-cancellation-technical .dropdown').dropdown('get value')[0],
                            // idsSaleStatusDisconnectionMobile: $('.app-setting-tag .app-setting-form #app-setting-ids-sale-status-disconnection-mobile .dropdown').dropdown('get value')[0].split(','),
                            // idSaleStatusPriorized: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-priorized .dropdown').dropdown('get value')[0],
                            // qtdAvailableLinesToPriorize: $('.app-setting-tag .app-setting-form #app-setting-qtd-available-lines-to-priorize').val(),
                            // recalcSalesRevenueWhenChangeService: $('.app-setting-tag .app-setting-form #app-setting-recalc-sales-revenue-when-change-service').prop('checked'),
                            // idSaleStatusSaleCommented: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-sale-commented .dropdown').dropdown('get value')[0],
                            // idsSalesResultByStatus: $('.app-setting-tag .app-setting-form #app-setting-ids-sales-result-by-status .dropdown').dropdown('get value')[0].split(','),
                            // idSaleStatusApprovedManually: $('.app-setting-tag .app-setting-form #app-setting-id-sale-status-approved-manually .dropdown').dropdown('get value')[0],
                            // isMigrateSalesOnCoortinatorOrSupervisorTeamChange: $('.app-setting-tag .app-setting-form #app-setting-is-migrate-sales-on-coordinator-or-supervisor-team-change').prop('checked'),
                            // idsSaleStatusCancelled: $('.app-setting-tag .app-setting-form #app-setting-ids-sale-status-cancelled .dropdown').dropdown('get value')[0].split(','),
                            // idsSaleStatusDisconnected: $('.app-setting-tag .app-setting-form #app-setting-ids-sale-status-disconnected .dropdown').dropdown('get value')[0].split(','),
                            // lockerSaleOnBackofficeGet: $('.app-setting-tag .app-setting-form #app-setting-locker-sale-on-backoffice-get').prop('checked')
                        },
                        function (appSetting, error) {
                            if (error) {
                                app.loading(false);
                                helpersWebApp.showErrors($(".app-setting-tag .app-setting-form"), error);
                                $(".app-setting-tag .app-setting-form .firstFocus").focus();
                            } else {
                                app.loading(false);
                                _gridCommandOrigin.itemSaved(appSetting, opts.action);
                            }
                        }
                    );
                }
            });
        }
    });

    this.saveClick = function () {
        $(".app-setting-tag .app-setting-form").submit();
    };

    this.cancelClick = function () {
        if (opts.action == helpersWebApp.both().actions.add) {
            _self.removeItem($(".app-setting-tag .app-setting-form #app-setting-id").val());
        }
    };

    this.load = function (appSetting) {
        _self.appSetting = appSetting;

        $(".app-setting-tag .app-setting-form #app-setting-id").val(appSetting.id);
        $(".app-setting-tag .app-setting-form #app-setting-name").val(appSetting.name);

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-coordinator-employee-position-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe o cargo dos coordenadores",
            lookupName: "Lista de Cargos",
            collection: {
                name: "employeepositions"
            },
            fieldId: "id",
            formFieldId: "coordinatorEmployeePositionIds",
            fieldDescription: "name",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.coordinatorEmployeePositionIds.forEach(function (employeePositionId) {
                    lookupItem.dropdown("set selected", employeePositionId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-supervisor-employee-position-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe o cargo dos supervisores",
            lookupName: "Lista de Cargos",
            collection: {
                name: "employeepositions"
            },
            fieldId: "id",
            formFieldId: "supervisorEmployeePositionIds",
            fieldDescription: "name",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.supervisorEmployeePositionIds.forEach(function (employeePositionId) {
                    lookupItem.dropdown("set selected", employeePositionId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-seller-employee-position-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe o cargo dos vendedores",
            lookupName: "Lista de Cargos",
            collection: {
                name: "employeepositions"
            },
            fieldId: "id",
            formFieldId: "sellerEmployeePositionIds",
            fieldDescription: "name",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.sellerEmployeePositionIds.forEach(function (employeePositionId) {
                    lookupItem.dropdown("set selected", employeePositionId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-backoffice-employee-position-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe o cargo dos backoffices",
            lookupName: "Lista de Cargos",
            collection: {
                name: "employeepositions"
            },
            fieldId: "id",
            formFieldId: "backofficeEmployeePositionId",
            fieldDescription: "name",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.backofficeEmployeePositionIds.forEach(function (employeePositionId) {
                    lookupItem.dropdown("set selected", employeePositionId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-allowed-status-on-queue-pending-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status disponíveis para atendentes",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "allowedStatusOnQueuePendingIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.allowedStatusOnQueuePendingIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-showed-status-on-queue-pending-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status mostrados na fila de pendentes",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "showedStatusOnQueuePendingIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.showedStatusOnQueuePendingIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-allowed-status-on-queue-pre-sale-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status disponíveis para filas de pré-vendas",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "allowedStatusOnQueuePreSaleIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.allowedStatusOnQueuePreSaleIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-allowed-status-on-queue-pos-sale-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status disponíveis para filas de pós-vendas",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "allowedStatusOnQueuePosSaleIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.allowedStatusOnQueuePosSaleIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-showed-status-on-queue-pre-sale-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status mostrados na fila de pré-vendas",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "showedStatusOnQueuePreSaleIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.showedStatusOnQueuePreSaleIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-showed-status-on-queue-pos-sale-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status mostrados na fila de pós-vendas",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "showedStatusOnQueuePosSaleIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.showedStatusOnQueuePosSaleIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-sale-status-index-progression-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status que incrementam o índice de progressão",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "saleStatusIndexProgressionIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.saleStatusIndexProgressionIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        app.loading(true);
        riot.mount($(".app-setting-tag #app-setting-sale-status-non-blocking-ids .lookup-combobox"), "lookup-combobox", {
            placeholder: "Informe os status que não bloqueiam a venda",
            lookupName: "Lista de Status",
            collection: {
                viewName: "viewsalestatuses",
                dataType: helpersWebApp.both().dataType.singleView,
                name: "salestatuses",
                queryOptions: {}
            },
            fieldId: "id",
            formFieldId: "saleStatusNonBlockingIds",
            fieldDescription: "nameWithServiceTypes",
            isAllowMultiple: true,
            onLoad: function (lookupItem) {
                appSetting.saleStatusNonBlockingIds.forEach(function (saleStatusId) {
                    lookupItem.dropdown("set selected", saleStatusId);
                });
                app.loading(false);
            }
        });

        // $('.app-setting-tag .app-setting-form #app-setting-is-migrate-sales-on-coordinator-or-supervisor-team-change').prop('checked', appSetting.isMigrateSalesOnCoortinatorOrSupervisorTeamChange);
        // $('.app-setting-tag .app-setting-form #app-setting-recalc-sales-revenue-when-change-service').prop('checked', appSetting.recalcSalesRevenueWhenChangeService);
        // $('.app-setting-tag .app-setting-form #app-setting-qtd-available-lines-to-priorize').val(appSetting.qtdAvailableLinesToPriorize);
        // $('.app-setting-tag .app-setting-form #app-setting-locker-sale-on-backoffice-get').prop('checked', appSetting.lockerSaleOnBackofficeGet);

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-seller-employee-position .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o cargo dos vendedores',
        //  lookupName: 'Lista de Cargos',
        //  collection: {
        //      name: 'employeepositions'
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSellerEmployeePosition',
        //  fieldDescription: 'name',
        //  isAllowMultiple: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsSellerEmployeePosition.forEach(function (employeePositionId) {
        //          lookupItem.dropdown('set selected', employeePositionId);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-sale-commented .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas comentário respondido',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses'
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusSaleCommented',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusSaleCommented);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-progress .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas em andamento',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses'
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusProgress',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusProgress);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-approved-manually .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas aprovadas manualmente',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusApprovedManually',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusApprovedManually);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-approved .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas aprovadas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusApproved',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusApproved);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-sended .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas agendadas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusScheduled',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusSended);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-installed .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas instaladas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusInstalled',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusInstalled);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-disconnected .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas desconectadas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusDisconnected',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusDisconnected);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-disconnecting .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas desconexão em andamento',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusDisconnecting',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusDisconnecting);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-canceled .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas canceladas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1, 3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusCanceled',
        //  fieldDescription: 'nameWithServiceType',
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusCanceled);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-held .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas retidas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusHeld',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusHeld);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-held-canceling .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas retidas em processo de cancelamento',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusHeldCanceling',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusHeldCanceling);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-sales-result-by-status .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas para o relatório',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          $sort: {
        //              name: 1
        //          }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idsSalesResultByStatus',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsSalesResultByStatus.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-status-sales-queue-pre-sale .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas para a fila de pré-vendas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idsStatusSalesQueuePreSale',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsStatusSalesQueuePreSale.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-status-sales-queue-pos-sale .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas para a fila de pós-vendas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idsStatusSalesQueuePosSale',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsStatusSalesQueuePosSale.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-status-locker-sale .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas que bloqueiam as vendas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idsStatusLockerSale',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsStatusLockerSale.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-status-sales-queue-treatment .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas para a fila de vendas em tratamento',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idsStatusSalesQueueTreatment',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsStatusSalesQueueTreatment.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-report-partial-sales-by-teams-ids-status .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status considerados no relatório',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'reportPartialSalesByTeamsIdsStatus',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.reportPartialSalesByTeamsIdsStatus.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-report-consolidated-sales-ids-status .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status considerados no relatório consolidado',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'reportConsolidatedSalesIdsStatus',
        //  fieldDescription: 'nameWithServiceType',
        //  isAllowMultiple: true,
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.reportConsolidatedSalesIdsStatus.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-type-territorial .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o tipo da venda territorial',
        //  lookupName: 'Lista Tipos de Vendas',
        //  collection: {
        //      name: 'saletypes'
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleTypeTerritorial',
        //  fieldDescription: 'name',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleTypeTerritorial);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-type-condominium .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o tipo da venda condomínio',
        //  lookupName: 'Lista Tipos de Vendas',
        //  collection: {
        //      name: 'saletypes'
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleTypeCondominium',
        //  fieldDescription: 'name',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleTypeCondominium);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-cancellation-commercial .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas canceladas por motivos comerciais',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1, 3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusCancellationCommercial',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusCancellationCommercial);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-cancellation-other .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas canceladas por outros motivos',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1, 3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusCancellationOther',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusCancellationOther);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-cancellation-technical .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas canceladas por motivos técnicos',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [1, 3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusCancellationTechnical',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusCancellationTechnical);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-sale-status-disconnection-mobile .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas desconectadas (móvel)',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [2] }
        //      }
        //  },
        //  fieldId: 'id',
        //  isAllowMultiple: true,
        //  formFieldId: 'idsSaleStatusDisconnectionMobile',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsSaleStatusDisconnectionMobile.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-id-sale-status-priorized .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe o status de vendas priorizadas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {
        //          idServiceType: { $in: [3] }
        //      }
        //  },
        //  fieldId: 'id',
        //  formFieldId: 'idSaleStatusPriorized',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      lookupItem.dropdown('set selected', appSetting.idSaleStatusPriorized);
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-sale-status-cancelled .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas consideradas canceladas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  isAllowMultiple: true,
        //  formFieldId: 'idsSaleStatusCancelled',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsSaleStatusCancelled.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });

        // app.loading(true);
        // riot.mount($('.app-setting-tag #app-setting-ids-sale-status-disconnected .lookup-combobox'), 'lookup-combobox', {
        //  placeholder: 'Informe os status de vendas consideradas desconectadas',
        //  lookupName: 'Lista de Status',
        //  collection: {
        //      name: 'salestatuses',
        //      queryOptions: {}
        //  },
        //  fieldId: 'id',
        //  isAllowMultiple: true,
        //  formFieldId: 'idsSaleStatusDisconnected',
        //  fieldDescription: 'nameWithServiceType',
        //  fullTextSearch: true,
        //  onLoad: function (lookupItem) {
        //      appSetting.idsSaleStatusDisconnected.forEach(function (idSaleStatus) {
        //          lookupItem.dropdown('set selected', idSaleStatus);
        //      });
        //      app.loading(false);
        //  }
        // });
    };

    this.removeItem = function (id) {};
};
