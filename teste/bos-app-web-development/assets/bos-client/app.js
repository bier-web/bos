/* BOS - BierOnStack - File Reserved: ToChange */
var setTitle = function () {
    bbc.systemsettings.get({ name: "appTitleSetting" }, function (systemSettings) {
        document.title = systemSettings.length > 0 ? systemSettings[0].value : "Ops, sem título (:";
    });
};

var appActions = {};

var appApplyCustomMasks = function (input, dataType) {
    // switch (dataType) {
    //     case "vivo-multi-iccid":
    //         $(input).mask(
    //             "99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999 / 99999999999999999999"
    //         );
    //         break;
    // }
};

var scriptFiles = [
    "assets/bos-client/tags/app/app-settings.js",
    "tags/logic/app/app-settings.tag.js",
    "assets/bos-client/tags/app/app-setting.js",
    "tags/logic/app/app-setting.tag.js",
    // Charts e Dashboards
    "assets/bos-client/tags/app/files-upload.js",
    "tags/logic/app/files-upload.tag.js"
];

// var appBusiness001_StudentDataIsCompleted = function(callback) {
//     if (window.loggedUser.idStudent) {
//         bbc.students.get(window.loggedUser.idStudent, function(student, error) {
//             if (error) {
//                 iziToast.error({
//                     title: 'Erro ao acessar o cadastro do estudante!',
//                     message: error,
//                     position:'center'
//                 });
//                 callback(false);
//             } else {
//                 callback(student.isDataCompleted);
//             }
//         });
//     }
// }

var appOnStartValidations = function () {
    // Exemplo de business da aplicação.
    // appBusiness001_StudentDataIsCompleted(function(studentDataIsCompleted){
    //     if (!studentDataIsCompleted) {
    //         iziToast.warning({
    //             title: 'Dados Cadastrais',
    //             message: 'Para contratar cursos, complete suas informações de cadastro no menu Meu Cadastro -> Editar',
    //             position:'center',
    //             timeout: 15000
    //         });
    //     }
    // });
};

var appOnBeforeNavigation = function (menu, callback) {
    callback(true);
    // Exemplo de business da aplicação.
    // appBusiness001_StudentDataIsCompleted(function(studentDataIsCompleted){

    //     var canNavigate = studentDataIsCompleted
    //         || menu.tagName == 'students'
    //         || menu.tagName == 'home'
    //         || menu.tagName == 'profile'
    //         || menu.tagName == 'logout';

    //     if (!canNavigate) {
    //         iziToast.warning({
    //             title: 'Dados Cadastrais',
    //             message: 'Para contratar cursos, complete suas informações de cadastro no menu Meu Cadastro -> Editar',
    //             position:'center',
    //             timeout: 15000
    //         });
    //     }

    //     callback(canNavigate);
    // });
};

var getLoadStatusTooltipById = function (loadStatusId) {
    switch (loadStatusId) {
        case loadStatus.queued.index:
            return loadStatus.queued.tooltip;
            break;
        case loadStatus.running.index:
            return loadStatus.running.tooltip;
            break;
        case loadStatus.completed.index:
            return loadStatus.completed.tooltip;
            break;
        case loadStatus.never.index:
            return loadStatus.never.tooltip;
            break;
        case loadStatus.fail.index:
            return loadStatus.fail.tooltip;
            break;
    }
};

var getLoadStatusIconById = function (loadStatusId) {
    switch (loadStatusId) {
        case loadStatus.queued.index:
            return loadStatus.queued.icon;
            break;
        case loadStatus.running.index:
            return loadStatus.running.icon;
            break;
        case loadStatus.completed.index:
            return loadStatus.completed.icon;
            break;
        case loadStatus.never.index:
            return loadStatus.never.icon;
            break;
        case loadStatus.fail.index:
            return loadStatus.fail.icon;
            break;
    }
};
