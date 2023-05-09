/* BOS - BierOnStack - File Reserved */
let internalClient = require('bos-backend/lib/internal-client');

module.exports = {
	connect: function (callback) {
		let sessionStore = process.server.sessions;
		sessionStore.createSession(function (error, createdSession) {
			callback(internalClient.build(process.server, createdSession));
		});
	}
};
