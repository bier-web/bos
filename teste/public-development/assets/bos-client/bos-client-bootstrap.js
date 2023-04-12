var bosScriptFiles = ['assets/bos-client/app.tags.general.min.js', 'assets/bos-client/app.tags.logic.general.min.js', 'assets/bos-client/app.general.min.js'];

var bosScriptExternalFiles = [];

function loadFileResource(filename, filetype) {
	if (filetype == 'js') {
		//if filename is a external JavaScript file
		var fileref = document.createElement('script');
		fileref.setAttribute('type', 'text/javascript');
		fileref.setAttribute('src', filename);
	} else if (filetype == 'css') {
		//if filename is an external CSS file
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
	}

	if (typeof fileref != 'undefined') document.getElementsByTagName('head')[0].appendChild(fileref);
}

loadAppResources = function (callback) {
	scriptFiles.forEach(function (resourceFile) {
		loadFileResource(resourceFile, 'js');
	});

	callback();
};

var getApiKeys = function (callback) {
	dpd.systemsettings.get({ name: 'googleApiKey' }, function (systemSettings, error) {
		if (error) {
			helpersWebApp.showException(helpersWebApp.both().formatString('Arghhh, error getting Google Api Key from SystemSettings: {0}', error.message));
		} else {
			bosScriptExternalFiles.push(helpersWebApp.both().formatString('https://maps.googleapis.com/maps/api/js?key={0}&v=3.exp&sensor=false&libraries=places', systemSettings[0].value));
			return callback();
		}
	});
};

loadBosResources = function () {
	bosScriptFiles.forEach(function (resourceFile) {
		loadFileResource(resourceFile, 'js');
	});

	getApiKeys(function () {
		bosScriptExternalFiles.forEach(function (resourceFile) {
			loadFileResource(resourceFile, 'js');
		});
		setTitle();
		app.bootstrapApp();
	});
};
