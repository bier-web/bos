/* BOS - BierOnStack - File Reserved */
loginTag = function (opts) {
    var self = this;

    this.configForm = function () {
        $(".login-form").form({
            on: "submit",
            fields: {
                loginUserName: {
                    identifier: "login-username",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Digite seu nome de usuário."
                        }
                    ]
                },
                loginPassword: {
                    identifier: "login-password",
                    rules: [
                        {
                            type: "empty",
                            prompt: "Digite sua senha."
                        }
                    ]
                }
            },
            onSuccess: function (e) {
                e.preventDefault();
                e.stopPropagation();
                app.loading(true);
                bbc.users.login(
                    {
                        username: $(".login-form #login-username").val(),
                        password: $(".login-form #login-password").val()
                    },
                    function (user, error) {
                        if (error) {
                            helpersWebApp.showErrors(".login-form", error);
                            $(".login-form #login-email").focus();
                            app.loading(false);
                        } else {
                            helpersWebApp.isLogged(function (isLogged, user) {
                                if (isLogged) {
                                    app.loadRoutesByMenus(function () {
                                        app.loadTimeZone(function (timeZone) {
                                            window.loggedUser = user;
                                            window.timeZone = timeZone;
                                            app.mainTag = riot.mount("#root-content", "main-container", { showHeader: true });
                                            window.location.href = "#/home";
                                            app.listenUserEvents(user);
                                            app.loading(false);
                                        });
                                    });
                                } else {
                                    riot.mount("login", {
                                        show: true,
                                        animation: false
                                    });
                                    app.loading(false);
                                }
                            });
                        }
                    }
                );
            }
        });

        $(".login-form #login-username").focus();
    };

    this.on("mount", function () {
        this.configForm();
    });
};
