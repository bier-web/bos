/* BOS - BierOnStack - File Reserved */
profileTag = function (opts) {
	var _self = this;

	this.on('before-mount', function () {
		_self.model = {}; // prevent expression errors;

		dpd.users.me(function (user) {
			_self.model = user;
			_self.password = '';
			_self.passwordConfirm = '';
			_self.update();
		});
	});

	this.on('mount', function () {
		app.loading(true);

		if (app.isMobile()) {
			$('.input-upload').remove();
		} else {
			document.querySelector('.input-upload').addEventListener('change', _self.handleFileSelect, false);
		}

		this.configForm(false);
		$('.profile-form #profile-fullName').focus();
		$('.profile-form #profile-password').on('change', this.passwordChange);

		app.loading(false);
	});

	this.configForm = function (validatePassword) {
		$('.profile-form').form({
			on: 'submit',
			fields: {
				profileFullName: {
					identifier: 'profile-fullName',
					rules: [
						{
							type: 'empty',
							prompt: 'Digite seu nome completo.'
						}
					]
				},
				profileEmail: {
					identifier: 'profile-email',
					rules: [
						{
							type: 'email',
							prompt: 'Digite um e-mail válido.'
						}
					]
				},
				profilePassword: {
					identifier: 'profile-password',
					optional: !validatePassword,
					rules: [
						{
							type: 'minLength[6]',
							prompt: 'Digite uma senha com no mínimo {ruleValue} caracteres.'
						}
					]
				},
				profilePasswordConfirm: {
					identifier: 'profile-passwordConfirm',
					optional: !validatePassword,
					rules: [
						{
							type: 'empty',
							prompt: 'Digite sua senha novamente.'
						},
						{
							type: 'match[profile-password]',
							prompt: 'Digite a mesma senha informada.'
						}
					]
				}
			},
			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();
				_self.submit();
			}
		});
	};

	this.submit = function () {
		app.loading(true);
		var uploadImage = String($('.profile-image')[0].src).indexOf(this.model.photoUrl) === -1;
		_self.loadModelFromForm();

		if (uploadImage) {
			_self.uploadImage(function () {
				// waiting upload image to set photoUrl path...
				_self.save();
			});
		} else {
			// save profile without change photoUrl
			_self.save();
		}
	};

	this.save = function () {
		dpd.users.post(_self.model, function (result, error) {
			if (error) {
				iziToast.error({
					title: 'Erro ao salvar o perfil',
					message: error.message,
					position: 'center'
				});
			} else {
				window.loggedUser = _self.model;
				riot.mount('header-profile-info');

				iziToast.success({
					title: '',
					message: 'Perfil salvo',
					position: 'center'
				});
			}

			app.loading(false);
		});
	};

	this.loadModelFromForm = function () {
		_self.model.fullName = $('.profile-form #profile-fullName').val();
		_self.model.email = $('.profile-form #profile-email').val();
		if ($('.profile-form #profile-password').val() !== '') _self.model.password = $('.profile-form #profile-password').val();
	};

	this.uploadImage = function (submitData) {
		var fd = new FormData();
		var fileBase64 = $('.profile-image')[0].src;
		fd.append('photo', dataURItoBlob(fileBase64), String.format('{0}.{1}', _self.model.id, fileBase64.split(';')[0].split('/')[1]));
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/user-photos');
		xhr.onload = function () {
			var response = JSON.parse(this.responseText);
			var fileName = String.format('{0}.{1}', _self.model.id, fileBase64.split(';')[0].split('/')[1]);
			if (this.status < 300) {
				dpd.systemsettings.get({ name: 'userPhotosPath' }, function (systemSetting, error) {
					if (error) {
						iziToast.error({
							title: 'Erro ao ler parâmetro de imagem',
							message: error,
							position: 'center'
						});
					} else {
						_self.model.photoUrl = String.format(
							'{0}{1}?{2}',
							systemSetting[0].value, // get default path url
							fileName,
							guid()
						); // mount file name based on id and extension of file
						submitData();
					}
				});
			} else {
				iziToast.error({
					title: 'Erro ao enviar a foto',
					message: response.message,
					position: 'center'
				});
			}
		};
		xhr.onerror = function (err) {
			iziToast.error({
				title: 'Erro ao enviar a foto',
				message: err,
				position: 'center'
			});
		};
		xhr.send(fd);
	};

	this.passwordChange = function () {
		_self.configForm($('.profile-form #profile-password').val() !== '');
	};

	this.handleFileSelect = function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object
		riot.mount('#crop-image', 'crop-image', {
			imageClass: '.profile-image',
			imageFile: files[0],
			settings: {
				center: true,
				aspectRatio: 1 / 1
			},
			cropSettings: {
				width: 100,
				height: 100
			},

			cropClass: $('#crop-image').parent()
		});
	};
};
