import helpersBothFromBos from './helpers-both.js';
import 'moment/locale/pt-br';
import momentTz from 'moment-timezone';

export default {
	helpersBoth: helpersBothFromBos,
	getDateFromTime: function (timeString, timeZone) {
		momentTz.locale('pt-br');
		let _dateNow = new Date();
		let _yearNow = _dateNow.getFullYear();
		let _monthNow = _dateNow.getMonth();
		let _dayNow = _dateNow.getDate();
		let _dateWithTime;
		let _timeString = timeString.split(':');
		_dateWithTime = momentTz(new Date(_yearNow, _monthNow, _dayNow, _timeString[0], _timeString[1])).tz(timeZone);
		return _dateWithTime;
	},
	getSecurityDataFromLoggedUser: function (bosDpd, callback) {
		this.isLogged(function (isLogged, user) {
			if (isLogged) {
				bosDpd.boswrappergetdata.get(
					{
						collectionSettings: JSON.stringify({ dataType: helpersBothFromBos.dataType.singleView, viewName: 'viewusersecuritydata' }),
						queryOptions: JSON.stringify({})
					},
					function (dataResult, error) {
						callback(user, dataResult.data);
					}
				);
			} else {
				callback(false, undefined);
			}
		});
	},
	isLogged: function (bosDpd, callback) {
		bosDpd.users.me(function (user) {
			callback(user !== '', user);
		});
	}
};
