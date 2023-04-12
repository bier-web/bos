/* BOS - BierOnStack - File Reserved */
var bosScriptExternalFiles = [];

var searchKeyType = {
	int: 0,
	string: 1
};

var types = {
	itsTrue: {
		index: 1,
		icon: 'icon check circle outline green'
	},
	itsFalse: {
		index: 2,
		icon: 'icon circle orange outline '
	}
};

var alertTypes = {
	warning: {
		id: 1,
		icon: 'grid-item-cell-icon-medium exclamation triangle orange icon',
		name: 'Atenção'
	},
	news: {
		id: 2,
		icon: 'grid-item-cell-icon-medium icon-alert rss yellow icon',
		name: 'Notícias'
	},
	urgent: {
		id: 3,
		icon: 'grid-item-cell-icon-medium icon-alert bullhorn red icon',
		name: 'Urgente'
	}
};

var templateTypes = {
	email: {
		index: 1,
		icon: 'envelope outline icon',
		tooltip: 'Template de e-mail'
	}
};

var getTemplateTypeTooltipById = function (templateTypeId) {
	switch (templateTypeId) {
		case templateTypes.email.index:
			return templateTypes.email.tooltip;
			break;
	}
};

var getTemplateTypeIconById = function (templateTypeId) {
	switch (templateTypeId) {
		case templateTypes.email.index:
			return templateTypes.email.icon;
			break;
	}
};

var appState = {
	away: 0,
	browsing: 1,
	editing: 2,
	inserting: 3
};

var messageType = {
	custom: 0,
	error: 1,
	warning: 2,
	basic: 3
};

function randomColorGenerator() {
	return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
}

function tryParseInt(str, defaultValue) {
	var retValue = defaultValue;
	if (str !== null) {
		if (str.length > 0) {
			if (!isNaN(str)) {
				retValue = parseInt(str);
			}
		}
	}

	return retValue;
}

$.fn.form.settings.rules.cpnjValid = function (value) {
	return CNPJ.isValid(value);
};

$.fn.form.settings.rules.cpfValid = function (value) {
	return CPF.isValid(value);
};

$.fn.form.settings.rules.jsonValidFromCodeMirror = function (value, jsonElementId) {
	try {
		let jsonValue = $($(helpersWebApp.both().formatString('#{0}', jsonElementId)).parent())
			.find('div')[0]
			.CodeMirror.getValue();
		let isJsonValid = JSON.parse(jsonValue);
		return typeof isJsonValid === 'object';
	} catch (e) {
		return false;
	}
};

// Validação utilizada na tela de alerta
$.fn.form.settings.rules.isTargetPublicEmpty = function (text, csv) {
	//If the text of the field itself isn't empty, then it is valid
	if (text) return true;

	var array = csv.split(','); // you're separating the string by commas
	var isValid = false; // return value
	$.each(array, function (index, elem) {
		// for each item in array, get an input element with the specified name, and check if it has any values
		var element = $("input[id='" + elem + "']");

		//If element is found, and it's value is not empty, then it is valid
		if (element && element.val()) isValid = true;
	});

	return isValid;
};

function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
	else byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], { type: mimeString });
}

guid = function () {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
	places = !isNaN((places = Math.abs(places))) ? places : 2;
	symbol = symbol !== undefined ? symbol : '$';
	thousand = thousand || ',';
	decimal = decimal || '.';
	var number = this,
		negative = number < 0 ? '-' : '',
		i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
		j = (j = i.length) > 3 ? j % 3 : 0;
	return (
		symbol +
		negative +
		(j ? i.substr(0, j) + thousand : '') +
		i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
		(places
			? decimal +
			  Math.abs(number - i)
					.toFixed(places)
					.slice(2)
			: '')
	);
};

String.format = function () {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = new RegExp('\\{' + i + '\\}', 'gm');
		s = s.replace(reg, arguments[i + 1]);
	}

	return s;
};

String.prototype.hashCode = function () {
	if (Array.prototype.reduce) {
		return this.split('').reduce(function (a, b) {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0);
	}

	var hash = 0;
	if (this.length === 0) return hash;
	for (var i = 0; i < this.length; i++) {
		var character = this.charCodeAt(i);
		hash = (hash << 5) - hash + character;
		hash = hash & hash; // Convert to 32bit integer
	}

	return hash;
};

function orderByProperty(prop) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function (a, b) {
		var equality = a[prop] - b[prop];
		if (equality === 0 && arguments.length > 1) {
			return orderByProperty.apply(null, args)(a, b);
		}

		return equality;
	};
}

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
		}
		callback();
	});
};

loadExternalResources = function (callback) {
	getApiKeys(function () {
		bosScriptExternalFiles.forEach(function (resourceFile) {
			loadFileResource(resourceFile, 'js');
		});
	});
	callback();
};
