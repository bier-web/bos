var helpersWebApp = {
	gridType: {
		crud: 1,
		chart: 2,
		dashboard: 3
	},
	gridPageSize: {
		normal: 40,
		medium: 80,
		big: 160,
		ultra: 320,
		halfThousand: 500,
		thousand: 1000
	},
	both: function () {
		return helpersBoth;
	},
	bothApp: function () {
		return helpersBothApp;
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
						collectionSettings: JSON.stringify({ dataType: helpersBoth.dataType.singleView, viewName: 'viewusersecuritydata' }),
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
