let helperServer = require('../../bos-helpers/helpers-server');
let helpersServer = require('../../bos-helpers/helpers-server');
var isDebug = false;
var showUnauthorizedErrors = false;
var pdf = require('html-pdf');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var lodash = require('lodash');
var cpfFormater = require('cpf');
var moment = require('moment-timezone');
const TextMessageService = require('comtele-sdk').TextMessageService;
var Pushover = require('pushover-notifications');
const apiSmsKey = process.env.BOS_SMS_API_KEY;
const apiPushoverToken = process.env.BOS_PUSHOVER_API_TOKEN;
const apiPushoverUser = process.env.BOS_PUSHOVER_API_USER;

var prepareRegExp = function (string) {
	if (string) {
		return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}
};

var isCamelCase = function (string) {
	return /^([a-z]+)(([A-Z]([a-z]+))+)$/.test(string);
};

var formatMoney = function (numberToFormat, places, symbol, thousand, decimal) {
	places = !isNaN((places = Math.abs(places))) ? places : 2;
	symbol = symbol !== undefined ? symbol : '$';
	thousand = thousand || ',';
	decimal = decimal || '.';
	var number = numberToFormat,
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

var sendSms = function (phones, message) {
	var textMessageService = new TextMessageService(apiSmsKey);
	console.log('Enviando SMS', phones, message);
	textMessageService.send('Sender', message, phones, (data) => {
		console.log(moment(new Date()).tz('America/Sao_Paulo').format('lll'), 'Notificando SMS: ', phones, message);
		if (data.Success) {
			console.log(moment(new Date()).tz('America/Sao_Paulo').format('lll'), 'SMS envidado com sucesso!', message, phones);
		}
	});
};

var sendPushover = function (devices, title, message, priority, html, expire, retry, sound) {
	console.log('Enviando Pushover', devices, title, message);

	devices.forEach(function (device) {
		let pushover = new Pushover({
			user: apiPushoverUser,
			token: apiPushoverToken
		});

		let pushoverMsg = {
			message: message,
			title: title,
			sound: sound,
			device: device,
			priority: priority,
			html: html,
			expire: expire,
			retry: retry
		};

		pushover.send(pushoverMsg, function (err, result) {
			if (err) {
				console.log('Erro enviando notificação de pushover', err);
			}
			console.log('Notificação de pushover enviada.', result);
		});
	});
};

var log = function (messageToLog, exception) {
	if (isDebug || exception) console.log(moment(new Date()).tz('America/Sao_Paulo').format('lll'), messageToLog);
};

var guid = function () {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var shortGuid = function () {
	return Math.random().toString(36).slice(-6);
};

var arrayRemoveDuplicates = function (myArr, prop) {
	return myArr.filter((obj, pos, arr) => {
		return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
	});
};

var notifyException = function (exception) {
	if (exception) {
		switch (exception.statusCode) {
			case undefined:
				log(exception, true);
				break;

			case 401:
				if (showUnauthorizedErrors) log(exception, true);
				break;
		}
	} else {
		log(exception, true);
	}
};

var renderHtml = function (htmlString, props, callback) {
	var html = ejs.render(htmlString, props);
	return callback(html);
};

var generatePDFFromHTML = function (html, outputpath, options, callback, onError) {
	pdf.create(html, options).toFile(outputpath, function (err, res) {
		if (err) return onError(err);
		else {
			console.log(res);
			return callback(res);
		}
	});
};

var prepareTemplateToSendEmail = function (dpd, templateId, templateProps, callback) {
	dpd.htmltemplates.get(templateId, function (htmlTemplate, error) {
		if (error) {
			notifyException('helpers -> sendMail -> erro desconhecido buscando template informado ->');
			notifyException(error);
			callback(false);
		} else {
			if (typeof htmlTemplate == undefined) {
				notifyException('helpers -> sendMail -> template informado não encontrado ->');
				callback(false);
			} else {
				renderHtml(htmlTemplate.html, templateProps, function (htmlContent) {
					callback(true, htmlContent);
				});
			}
		}
	});
};

var sendEmail = function (dpd, emailTo, emailSubject, emailContentText, emailContentHtml, callback) {
	dpd.systemsettings.get(
		{
			name: {
				$in: ['smtpServer', 'smtpPort', 'smtpSecure', 'smtpUser', 'smtpPassword', 'smtpSender']
			}
		},
		function (systemSettings, error) {
			if (error) {
				notifyException('helpers -> sendMail -> erro desconhecido ->');
				notifyException(error);
			} else {
				try {
					nodemailer.createTestAccount((err, account) => {
						let transporter = nodemailer.createTransport({
							host: lodash.filter(systemSettings, {
								name: 'smtpServer'
							})[0].value,
							port: parseInt(
								lodash.filter(systemSettings, {
									name: 'smtpPort'
								})[0].value
							),
							secure:
								lodash.filter(systemSettings, {
									name: 'smtpSecure'
								})[0].value == 'true',
							auth: {
								user: lodash.filter(systemSettings, {
									name: 'smtpUser'
								})[0].value,
								pass: lodash.filter(systemSettings, {
									name: 'smtpPassword'
								})[0].value
							}
						});

						// setup email data with unicode symbols
						let mailOptions = {
							from: lodash.filter(systemSettings, {
								name: 'smtpSender'
							})[0].value, // sender address
							to: emailTo,
							subject: emailSubject, // Subject line
							text: emailContentText, // plain text body
							html: emailContentHtml // html body
						};

						// send mail with defined transport object
						transporter.sendMail(mailOptions, (error, info) => {
							callback(error == null, error);
							if (error) {
								return log(error);
							}
						});
					});
				} catch (exception) {
					notifyException('helpers -> sendMail -> erro desconhecido ->');
					notifyException(exception);
				}
			}
		}
	);
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

module.exports = {
	helperServer: helperServer,
	helpersServer: helpersServer,
	isCamelCase: isCamelCase,
	log: log,
	notifyException: notifyException,
	renderHtml: renderHtml,
	generatePDFFromHTML: generatePDFFromHTML,
	guid: guid,
	shortGuid: shortGuid,
	sendEmail: sendEmail,
	prepareTemplateToSendEmail: prepareTemplateToSendEmail,
	arrayRemoveDuplicates: arrayRemoveDuplicates,
	sendSms: sendSms,
	sendPushover: sendPushover,
	convertBrasilDateTimeToJS: convertBrasilDateTimeToJS,
	formatMoney: formatMoney,
	prepareRegExp: prepareRegExp
};
