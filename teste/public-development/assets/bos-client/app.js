/* BOS - BierOnStack - File Reserved: ToChange */
var appSettings = {
	showRegisterOnLogin: false
};

var setTitle = function () {
	dpd.systemsettings.get({ name: 'appTitleSetting' }, function (systemSettings) {
		document.title = systemSettings.length > 0 ? systemSettings[0].value : 'Ops, sem título (:';
	});
};

var nedSalesQueueType = {
	manager: 1,
	pending: 2,
	treatment: 3,
	preSale: 4,
	posSale: 5
};

var nedAppActions = {
	viewRevenueMaster: {
		index: 2000,
		icon: ''
	}
};

$.fn.form.settings.rules.emptyIfIsNewCustomer = function (value, fieldsOptions) {
	if (value) return true;
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');
	isValid = $("input[id='" + arrayOptions[0] + "']").prop('checked') || (!$("input[id='" + arrayOptions[0] + "']").prop('checked') && value);

	return isValid;
};

$.fn.form.settings.rules.emptyIfIsCustomerPhysical = function (value, fieldsOptions) {
	if (value) return true;
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');
	isValid = $("input[id='" + arrayOptions[0] + "']").prop('checked') && value;

	return isValid;
};

$.fn.form.settings.rules.emptyIfIsCustomerLegal = function (value, fieldsOptions) {
	if (value) return true;
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');

	isValid = $("input[id='" + arrayOptions[0] + "']").prop('checked') && value;
	return isValid;
};

$.fn.form.settings.rules.emptyIfStatusBlock = function (value, fieldsOptions) {
	if (value) return true;
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');
	var selectedStatus = $("input[id='" + arrayOptions[0] + "']").val();

	isValid = arrayOptions.indexOf(selectedStatus) >= 0 || (arrayOptions.indexOf(selectedStatus) < 0 && value);
	return isValid;
};

$.fn.form.settings.rules.cpfValidIfIsCustomerPhysical = function (value, fieldsOptions) {
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');

	isValid = $("input[id='" + arrayOptions[0] + "']").prop('checked') && CPF.isValid(value);
	return isValid;
};

$.fn.form.settings.rules.cnpjValidIfIsCustomerLegal = function (value, fieldsOptions) {
	var isValid = false;
	var arrayOptions = fieldsOptions.split(',');
	isValid = $("input[id='" + arrayOptions[0] + "']").prop('checked') && CNPJ.isValid(value);
	return isValid;
};

$.fn.form.settings.rules.hasCheckedItensFromBotProcess = function (value, rowClass) {
	return $(helpersWebApp.both().formatString('.{0} .checkbox.checked', 'bot-process-post-results')).length > 0;
};

$.fn.form.settings.rules.emptyIfIsFixStatusFiltered = function (value, fieldsOptions) {
	if (value) return true;
	function verifyValues() {
		let valueEqual = false;
		arrayOptions.forEach((value, index) => {
			if (index > 2 && !valueEqual) {
				valueEqual = selectedStatus == value;
			}
		});
		return valueEqual;
	}
	let isValid = false;
	let arrayOptions = fieldsOptions.split(',');
	let selectedServiceType = $("input[id='" + arrayOptions[0] + "']").val(); //ToTest Testar validação
	let selectedStatus = $("input[id='" + arrayOptions[1] + "']").val();

	isValid = selectedServiceType != arrayOptions[2] || (selectedServiceType == arrayOptions[2] && !verifyValues());
	return isValid;
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
	'assets/bos-client/tags/app/app-settings.js',
	'tags/logic/app/app-settings.tag.js',
	'assets/bos-client/tags/app/app-setting.js',
	'tags/logic/app/app-setting.tag.js',
	'assets/bos-client/tags/actors/providers.js',
	'tags/logic/actors/providers.tag.js',
	'assets/bos-client/tags/actors/provider.js',
	'tags/logic/actors/provider.tag.js',
	'assets/bos-client/tags/records/cities.js',
	'tags/logic/records/cities.tag.js',
	'assets/bos-client/tags/records/city.js',
	'tags/logic/records/city.tag.js',
	'assets/bos-client/tags/records/vivo-geo-lockers.js',
	'tags/logic/records/vivo-geo-lockers.tag.js',
	'assets/bos-client/tags/records/vivo-geo-locker.js',
	'tags/logic/records/vivo-geo-locker.tag.js',
	'assets/bos-client/tags/actors/employees.js',
	'tags/logic/actors/employees.tag.js',
	'assets/bos-client/tags/actors/employee.js',
	'tags/logic/actors/employee.tag.js',
	'assets/bos-client/tags/business/sales-pre-sale.js',
	'tags/logic/business/sales-pre-sale.tag.js',
	'assets/bos-client/tags/business/sales-pos-sale.js',
	'tags/logic/business/sales-pos-sale.tag.js',
	'assets/bos-client/tags/business/sales-pending.js',
	'tags/logic/business/sales-pending.tag.js',
	'assets/bos-client/tags/business/sales-treatment.js',
	'tags/logic/business/sales-treatment.tag.js',
	'assets/bos-client/tags/actors/customers.js',
	'tags/logic/actors/customers.tag.js',
	'assets/bos-client/tags/actors/customer.js',
	'tags/logic/actors/customer.tag.js',
	'assets/bos-client/tags/actors/teams.js',
	'tags/logic/actors/teams.tag.js',
	'assets/bos-client/tags/actors/team.js',
	'tags/logic/actors/team.tag.js',
	'assets/bos-client/tags/records/sales.js',
	'tags/logic/records/sales.tag.js',
	'assets/bos-client/tags/records/sale-provider-oi.js',
	'tags/logic/records/sale-provider-oi.tag.js',
	'assets/bos-client/tags/records/sale-provider-vivo.js',
	'tags/logic/records/sale-provider-vivo.tag.js',
	'assets/bos-client/tags/records/services.js',
	'tags/logic/records/services.tag.js',
	'assets/bos-client/tags/records/service.js',
	'tags/logic/records/service.tag.js',
	'assets/bos-client/tags/actors/team-employees.js',
	'tags/logic/actors/team-employees.tag.js',
	'assets/bos-client/tags/records/sale-types.js',
	'tags/logic/records/sale-types.tag.js',
	'assets/bos-client/tags/records/sale-type.js',
	'tags/logic/records/sale-type.tag.js',
	'assets/bos-client/tags/records/service-categories.js',
	'tags/logic/records/service-categories.tag.js',
	'assets/bos-client/tags/records/service-category.js',
	'tags/logic/records/service-category.tag.js',
	'assets/bos-client/tags/records/service-types.js',
	'tags/logic/records/service-types.tag.js',
	'assets/bos-client/tags/records/service-type.js',
	'tags/logic/records/service-type.tag.js',
	'assets/bos-client/tags/records/service-tecnologies.js',
	'tags/logic/records/service-tecnologies.tag.js',
	'assets/bos-client/tags/records/service-tecnology.js',
	'tags/logic/records/service-tecnology.tag.js',
	'assets/bos-client/tags/records/employee-positions.js',
	'tags/logic/records/employee-positions.tag.js',
	'assets/bos-client/tags/records/employee-position.js',
	'tags/logic/records/employee-position.tag.js',
	'assets/bos-client/tags/records/sale-statuses.js',
	'tags/logic/records/sale-statuses.tag.js',

	'assets/bos-client/tags/records/external-systems.js',
	'tags/logic/records/external-systems.tag.js',
	'assets/bos-client/tags/records/external-system.js',
	'tags/logic/records/external-system.tag.js',

	'assets/bos-client/tags/records/sale-pdvs.js',
	'tags/logic/records/sale-pdvs.tag.js',
	'assets/bos-client/tags/records/sale-pdv.js',
	'tags/logic/records/sale-pdv.tag.js',
	'assets/bos-client/tags/records/sale-status.js',
	'tags/logic/records/sale-status.tag.js',
	'assets/bos-client/tags/records/goals.js',
	'tags/logic/records/goals.tag.js',
	'assets/bos-client/tags/records/goal.js',
	'tags/logic/records/goal.tag.js',
	'assets/bos-client/tags/records/banks.js',
	'tags/logic/records/banks.tag.js',
	'assets/bos-client/tags/records/bank.js',
	'tags/logic/records/bank.tag.js',
	'assets/bos-client/tags/reports/rel-sales-partials-sellers.js',
	'tags/logic/reports/rel-sales-partials-sellers.tag.js',
	'assets/bos-client/tags/reports/rel-sales-partials-teams.js',
	'tags/logic/reports/rel-sales-partials-teams.tag.js',
	'assets/bos-client/tags/reports/rel-sales-details.js',
	'tags/logic/reports/rel-sales-details.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-fix-teams.js',
	'tags/logic/reports/rel-sales-consolidated-fix-teams.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-mobile-teams.js',
	'tags/logic/reports/rel-sales-consolidated-mobile-teams.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-fix-pdvs.js',
	'tags/logic/reports/rel-sales-consolidated-fix-pdvs.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-mobile-pdvs.js',
	'tags/logic/reports/rel-sales-consolidated-mobile-pdvs.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-fix-sellers.js',
	'tags/logic/reports/rel-sales-consolidated-fix-sellers.tag.js',
	'assets/bos-client/tags/reports/rel-sales-consolidated-mobile-sellers.js',
	'tags/logic/reports/rel-sales-consolidated-mobile-sellers.tag.js',
	'assets/bos-client/tags/reports/rel-sales-details-consolidated.js',
	'tags/logic/reports/rel-sales-details-consolidated.tag.js',

	// Charts e Dashboards
	'assets/bos-client/tags/dashboards/dash-sales-queues-01.js',
	'tags/logic/dashboards/dash-sales-queues-01.tag.js',

	'assets/bos-client/tags/actors/customers.js',
	'tags/logic/actors/customers.tag.js',
	'assets/bos-client/tags/actors/customer.js',
	'tags/logic/actors/customer.tag.js',
	//Componente Accordion
	'assets/bos-client/tags/app/component-bot-process-get-conditions.js',
	'tags/logic/app/component-bot-process-get-conditions.tag.js',
	'assets/bos-client/tags/records/leads.js',
	'tags/logic/records/leads.tag.js',
	'assets/bos-client/tags/records/lead.js',
	'tags/logic/records/lead.tag.js',
	'assets/bos-client/tags/records/leads-statuses.js',
	'tags/logic/records/leads-statuses.tag.js',
	'assets/bos-client/tags/records/lead-status.js',
	'tags/logic/records/lead-status.tag.js',
	'assets/bos-client/tags/app/files-upload.js',
	'tags/logic/app/files-upload.tag.js',
	'assets/bos-client/tags/records/mailings.js',
	'tags/logic/records/mailings.tag.js',
	'assets/bos-client/tags/records/mailing.js',
	'tags/logic/records/mailing.tag.js',
	'assets/bos-client/tags/app/bots-process.js',
	'tags/logic/app/bots-process.tag.js',
	'assets/bos-client/tags/app/bot-process.js',
	'tags/logic/app/bot-process.tag.js',
	'assets/bos-client/tags/app/leads-conditions-manager.js',
	'tags/logic/app/leads-conditions-manager.tag.js',
	'assets/bos-client/tags/app/component-sales-invoices.js',
	'tags/logic/app/component-sales-invoices.tag.js',
	'assets/bos-client/tags/app/marketing-actions.js',
	'tags/logic/app/marketing-actions.tag.js',
	'assets/bos-client/tags/app/marketing-action.js',
	'tags/logic/app/marketing-action.tag.js',
	'assets/bos-client/tags/app/marketing-operations.js',
	'tags/logic/app/marketing-operations.tag.js',
	'assets/bos-client/tags/app/marketing-operation.js',
	'tags/logic/app/marketing-operation.tag.js'
];

// var appBusiness001_StudentDataIsCompleted = function(callback) {
//     if (window.loggedUser.idStudent) {
//         dpd.students.get(window.loggedUser.idStudent, function(student, error) {
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
