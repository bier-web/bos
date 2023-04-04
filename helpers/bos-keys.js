var fs = require('fs'),
	crypto = require('crypto');

function bosKeys(path) {
	this.path = path || '.bos-backend/keys.json';
}
module.exports = bosKeys;

bosKeys.prototype.get = function (key, fn) {
	this.readFile(function (err, data) {
		fn(err, data[key]);
	});
};

bosKeys.prototype.generate = function () {
	return crypto.randomBytes(256).toString('hex');
};

bosKeys.prototype.create = function (fn) {
	var key = this.generate(),
		keys = this;

	this.readFile(function (err, data) {
		if (err) return fn(err);

		data[key] = true;
		keys.writeFile(data, function (err) {
			fn(err, key);
		});
	});
};

bosKeys.prototype.readFile = function (fn) {
	fs.readFile(this.path, 'utf-8', function (err, data) {
		var jsonData, error;

		try {
			jsonData = (data && JSON.parse(data)) || {};
		} catch (ex) {
			error = ex;
		}

		fn(error, jsonData);
	});
};

bosKeys.prototype.writeFile = function (data, fn) {
	var str;

	try {
		str = JSON.stringify(data);
	} catch (e) {
		return fn(e);
	}

	fs.writeFile(this.path, str, fn);
};

bosKeys.prototype.getLocal = function (fn) {
	this.readFile(function (err, data) {
		if (err) return fn(err);
		if (data && typeof data == 'object') {
			fn(null, Object.keys(data)[0]);
		} else {
			fn();
		}
	});
};
