/* BOS - BierOnStack - File Reserved */
headerAlertTag = function (opts) {
	let _self = this;
	this.getConnectionDetails = function () {
		let connectionInformations;
		try {
			connectionInformations = String.format('{0}, {1}, lat {2}, lng {3}, IP {4}, Operadora {5}', window.connectionData.country, window.connectionData.city, window.connectionData.latitude, window.connectionData.longitude, window.connectionData.ip, window.connectionData.org);
		} catch (e) {
			connectionInformations = '!! Erro de localização !!';
		}
		return connectionInformations;
	};
};
