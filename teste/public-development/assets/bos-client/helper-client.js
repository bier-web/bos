/* BOS - BierOnStack - File Reserved */
var helperClient = {
	gridType: {
		crud: 1,
		chart: 2,
		dashboard: 3
	},
	gridPageSize: {
		normal: 20,
		medium: 30,
		big: 40,
		ultra: 100
	},
	both: function () {
		return helperBoth;
	},
	showErrors: function (formElement, error) {
		if (typeof error.errors === 'undefined') {
			$(formElement).form('add errors', {
				formError: error.message
			});
		} else {
			$.each(error.errors, function (field, message) {
				$(formElement).form('add errors', {
					field: message
				});
			});
		}
	},
	isLogged: function (callback) {
		app.loading(true);
		dpd.users.me(function (user) {
			if (user != '') {
				dpd.boswrappergetdata.get(
					{
						collectionSettings: JSON.stringify({ dataType: helperBoth.dataType.singleView, viewName: 'viewusersecuritydata' }),
						queryOptions: JSON.stringify({})
					},
					function (dataResult, error) {
						callback(user !== '', dataResult.data);
					}
				);
			} else {
				callback(false, undefined);
			}
			app.loading(false);
		});
	}
};
