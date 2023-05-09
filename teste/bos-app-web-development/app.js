/* BOS - BierOnStack - File Reserved 05-mai-2023 */
const bosAppRoutes = require("./bos-app-routes");
const app = new (function () {
    let navigationTag;
    let mainTag;
    let state;
    let _loadingCounter = 0;
    let previousUrl;

    const startBosApp = function () {
        this.notificationCount = 0;
        this.state = bosAppState.away;
        this.notificationCount = 0;
        this.loginData = {
            user: null,
            isLogged: false
        };

        const _self = this;

        moment.locale("pt-br");
        iziToast.settings({
            timeout: false
        });

        riot.observable(app);

        this.loadBosRoutes();
        this.mainTag = riot.mount("#root-content", "main-container", {
            showHeader: false
        });

        // waiting for route-changed event;
        app.on("route-changed", function (url) {
            if (this.navigationTag) this.navigationTag[0].routed(url);
        });
        // waiting for loading event;
        app.on("loading", function (isLoading) {
            $.getJSON("https://ipapi.co/json/", function (data) {
                window.connectionData = data;
            });
            // emit event to main-container show or hide loading;
            if (this.mainTag) this.mainTag[0].loading(isLoading);
        });
        app.on("userLoggedInOut", (user) => {
            _self.loginData.user = user;
            _self.loginData.isLogged = user !== "";
        });
    };

    const loadBosRoutes = function (callback) {
        const _self = this;
        route.base("#");
        route.stop();
        bosAppRoutes.forEach((bosAppRoute) => {
            route(bosAppRoute.path, function () {
                $("#tag-container").transition({
                    animation: "zoom",
                    onComplete: function () {
                        _self.mainTag = riot.mount("#root-content", "main-container", {
                            showHeader: bosAppRoute.showHeader
                        });
                        riot.mount("#tag-container", bosAppRoute.tagName);
                    }
                });
            });
        });

        route.start(true);

        // helpersWebApp.isLogged(function (isLogged, user) {
        //     // Carregando as rotas da aplicação

        //     // // verificando as rotas e configurando de acordo com menus;
        //     // bbc.menus.get(function (menus) {
        //     //     menus.forEach((menu) => {
        //     //         if (menu.url) {
        //     //             route(menu.url, function () {
        //     //                 if (menu.url != app.previousUrl) {
        //     //                     if (app.state in [bosAppState.away, bosAppState.browsing]) {
        //     //                         appOnBeforeNavigation(menu, function (canNavigate) {
        //     //                             if (canNavigate) {
        //     //                                 $("#tag-container").transition({
        //     //                                     animation: "fade",
        //     //                                     onComplete: function () {
        //     //                                         this.mainTag = riot.mount("#root-content", "main-container", {
        //     //                                             showHeader: true
        //     //                                         });
        //     //                                         riot.mount("header", {
        //     //                                             title: menu.name,
        //     //                                             icon: menu.iconClass
        //     //                                         });
        //     //                                         riot.mount("#tag-container", menu.tagName, { menu: menu });
        //     //                                         app.trigger("route-changed", menu.url);
        //     //                                     }
        //     //                                 });

        //     //                                 app.previousUrl = menu.url;
        //     //                             }
        //     //                         });
        //     //                     } else {
        //     //                         iziToast.warning({
        //     //                             title: "",
        //     //                             message: "Você está inserindo ou editando um registro, use o botão <b>Salvar</b> ou <b>Cancelar</b>",
        //     //                             position: "center",
        //     //                             timeout: false
        //     //                         });

        //     //                         window.location.href = app.previousUrl;
        //     //                     }
        //     //                 }
        //     //             });
        //     //         }
        //     //     });

        //     //     if (typeof callback === "function") callback();
        //     // });

        //     // route("/", function () {
        //     //     this.mainTag = riot.mount("#root-content", "main-container", {
        //     //         showHeader: true
        //     //     });
        //     //     riot.mount("#tag-container", "index");
        //     // });

        //     // route("/login", function () {
        //     //     this.mainTag = riot.mount("#root-content", "main-container", {
        //     //         showHeader: false,
        //     //         showHeaderAlert: false
        //     //     });
        //     //     riot.mount("#tag-container", "login-container");
        // });

        // if (typeof callback === "function") callback();

        // if (isLogged) {
        //     app.loadRoutesByMenus();
        //     app.listenUserEvents(user);
        // }
        // });
    };

    const loadTimeZone = function (callback) {
        bbc.systemsettings.get({ name: "timeZone" }, function (systemSettings) {
            let timeZone = systemSettings.length == 0 ? "America/Sao_Paulo" : systemSettings[0].value;
            callback(timeZone);
        });
    };

    const updateNotificationLabel = function (user) {
        bbc.boswrappergetdata.get(
            {
                collectionSettings: JSON.stringify({ dataType: helpersBoth.dataType.singleView, viewName: "viewalertshome", bosAction: "count" }),
                queryOptions: JSON.stringify({})
            },
            function (dataResult, error) {
                if (error || dataResult.result.id == helpersBoth.dataResult.error.id) {
                    iziToast.error({
                        title: "Ocorreu um erro",
                        message: String.format("Erro ao carregar notificações de alertas: {0}", error || dataResult.errorMessage),
                        position: "center",
                        timeout: false
                    });
                } else {
                    app.notificationCount = dataResult.count;
                    riot.mount("notification");
                }
            }
        );
    };

    const listenUserEvents = function (user) {
        // Quando um alerta é marcado como LIDO, recebe o evento para atualização a central de notificação.
        bbc.alerts.off(user.id + "alertRead");
        bbc.alerts.on(user.id + "alertRead", function () {
            updateNotificationLabel(user);
        });

        // Quando um alerta é marcado como NÃO LIDO, recebe o evento para atualização a central de notificação.
        bbc.alerts.off(user.id + "alertUnRead");
        bbc.alerts.on(user.id + "alertUnRead", function () {
            updateNotificationLabel(user);
        });

        // Quando um alerta é inserido, recebe o evento para atualização a central de notificação.
        bbc.alerts.off(user.id + "newAlert");
        bbc.alerts.on(user.id + "newAlert", function () {
            updateNotificationLabel(user);
        });

        // Quando um alerta é marcado como LIDO, recebe o evento para atualização a central de notificação.
        bbc.alerts.off(user.id + "alertDeleted");
        bbc.alerts.on(user.id + "alertDeleted", function () {
            updateNotificationLabel(user);
        });

        // Quando um alerta é atualizado, recebe o evento para atualização a central de notificação.
        bbc.alerts.off(user.id + "alertUpdated");
        bbc.alerts.on(user.id + "alertUpdated", function () {
            updateNotificationLabel(user);
        });

        bbc.boswrappergetdata.get(
            {
                collectionSettings: JSON.stringify({ dataType: helpersBoth.dataType.singleView, viewName: "viewalertshome", bosAction: "count" }),
                queryOptions: JSON.stringify({})
            },
            function (dataResult, error) {
                if (error || dataResult.result.id == helpersBoth.dataResult.error.id) {
                    iziToast.error({
                        title: "Ocorreu um erro",
                        message: String.format("Erro ao carregar notificações de alertas: {0}", error || dataResult.errorMessage),
                        position: "center",
                        timeout: false
                    });
                } else {
                    app.notificationCount = dataResult.count;
                    riot.mount("notification");
                }
            }
        );
    };

    const loading = function (isLoading) {
        if (_loadingCounter < 0) _loadingCounter = 0;

        if (isLoading) {
            _loadingCounter += 1;
            if (_loadingCounter == 1) {
                // emit event to main-container show or hide loading;
                app.trigger("loading", isLoading);
            }
        } else {
            _loadingCounter -= 1;
            if (_loadingCounter == 0) {
                // emit event to main-container show or hide loading;
                app.trigger("loading", isLoading);
            }
        }
    };

    return {
        startBosApp: startBosApp,
        loadBosRoutes: loadBosRoutes,
        loading: loading,
        listenUserEvents: listenUserEvents,
        loadTimeZone: loadTimeZone
    };
})();
