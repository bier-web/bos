/* BOS - BierOnStack - File Reserved */
registerTag = function (opts) {
    var self = this;

    this.on("mount", function () {
        try {
            app.loading(true);
            bbc.systemsettings.get({ name: "reCaptchaSiteKey" }, function (systemSetting, error) {
                if (error || systemSetting.length === 0) {
                    app.loading(false);
                    iziToast.error({
                        title: "Ocorreu um erro interno",
                        message: String.format("Erro ao carregar parâmetro reCaptcha: {0}", error),
                        position: "center"
                    });
                } else {
                    setTimeout(function () {
                        app.loading(false);
                        grecaptcha.render("register-recaptcha", {
                            sitekey: systemSetting[0].value
                        });
                    }, 1000);

                    $(".login-container-tag .login-container-grid").transition({
                        animation: "fade left",
                        onComplete: function () {
                            $(".login-tag").hide();
                            $(".register-tag").show();
                            $(".login-container-tag .login-container-grid").transition({
                                animation: "fade right",
                                onComplete: function () {
                                    $(".register-form").form({
                                        on: "submit",
                                        fields: {
                                            registerFullName: {
                                                identifier: "register-username",
                                                rules: [
                                                    {
                                                        type: "empty",
                                                        prompt: "Digite seu nome de usuário."
                                                    }
                                                ]
                                            },
                                            registerEmail: {
                                                identifier: "register-email",
                                                rules: [
                                                    {
                                                        type: "email",
                                                        prompt: "Digite um e-mail válido."
                                                    }
                                                ]
                                            },
                                            registerFullName: {
                                                identifier: "register-fullname",
                                                rules: [
                                                    {
                                                        type: "empty",
                                                        prompt: "Digite seu nome completo."
                                                    }
                                                ]
                                            },
                                            registerPassword: {
                                                identifier: "register-password",
                                                rules: [
                                                    {
                                                        type: "empty",
                                                        prompt: "Digite sua senha."
                                                    },
                                                    {
                                                        type: "minLength[6]",
                                                        prompt: "Digite uma senha com no mínimo {ruleValue} caracteres."
                                                    }
                                                ]
                                            },
                                            registerPasswordConfirm: {
                                                identifier: "register-passwordconfirm",
                                                rules: [
                                                    {
                                                        type: "empty",
                                                        prompt: "Digite sua senha novamente."
                                                    },
                                                    {
                                                        type: "match[register-password]",
                                                        prompt: "Digite a mesma senha informada."
                                                    }
                                                ]
                                            }
                                        },
                                        onSuccess: function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            app.loading(true);

                                            bbc.users.post(
                                                {
                                                    username: $(".register-form #register-username").val(),
                                                    email: $(".register-form #register-email").val(),
                                                    password: $(".register-form #register-password").val(),
                                                    fullName: $(".register-form #register-fullname").val(),
                                                    captcha: $(".register-form #g-recaptcha-response").val()
                                                },
                                                function (user, error) {
                                                    if (error) {
                                                        app.loading(false);
                                                        helperClient.showErrors(".register-form", error);
                                                        $(".register-form #register-email").focus();
                                                    } else {
                                                        bbc.users.login(
                                                            {
                                                                username: $(".register-form #register-username").val(),
                                                                password: $(".register-form #register-password").val()
                                                            },
                                                            function (user, error) {
                                                                if (error) {
                                                                    app.loading(false);
                                                                    helperClient.showErrors(".register-form", error);
                                                                    $(".register-form #register-username").focus();
                                                                } else {
                                                                    helperClient.isLogged(function (isLogged, user) {
                                                                        app.loading(false);
                                                                        if (isLogged) {
                                                                            window.loggedUser = user;
                                                                            riot.mount("welcome", { show: true });
                                                                        } else {
                                                                            riot.mount("login", { show: true, animation: false });
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    });

                                    $(".register-form #register-username").focus();
                                }
                            });
                        }
                    });
                }
            });
        } catch (error) {
            iziToast.error({
                title: "Ocorreu um erro interno desconhecido",
                message: String.format("erro na tela de registro: {0}", error),
                position: "center"
            });
        }
    });

    this.cancelClick = function () {};
};
