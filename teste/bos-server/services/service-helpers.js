/* BOS - BierOnStack - File Reserved */
var toTitleCase = function (str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

var convertBrasilDateTimeToJS = function (dateTime) {
	var dateTimeSplitted = dateTime.split(' ');
	var dateSplitted;
	var timeSplitted;

	if (dateTimeSplitted.length > 1) {
		dateSplitted = dateTimeSplitted[0].split('/');
		timeSplitted = dateTimeSplitted[1].split(':');
	} else {
		dateSplitted = dateTimeSplitted[0].split('/');
		timeSplitted = ['00', '00', '00'];
	}

	timeSplitted[0] = typeof timeSplitted[0] != 'undefined' ? timeSplitted[0] : 0;
	timeSplitted[1] = typeof timeSplitted[1] != 'undefined' ? timeSplitted[1] : 0;
	timeSplitted[2] = typeof timeSplitted[2] != 'undefined' ? timeSplitted[2] : 0;

	var jsDate = new Date(
		dateSplitted[2],
		dateSplitted[1] - 1, // mês em js começa em 0
		dateSplitted[0],
		timeSplitted[0],
		timeSplitted[1],
		timeSplitted[2]
	);

	return jsDate;
};

var guid = function () {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

module.exports = {
	convertBrasilDateTimeToJS: convertBrasilDateTimeToJS,
	guid: guid,
	toTitleCase: toTitleCase
};
