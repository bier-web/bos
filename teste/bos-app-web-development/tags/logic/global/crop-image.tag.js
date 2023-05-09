/* BOS - BierOnStack - File Reserved */
cropImageTag = function (opts) {
	var _self = this;

	this.on('mount', function () {
		var _fileReader = new FileReader();
		_imgToCrop = $('.image-to-crop');
		_imgToCrop.title = opts.imageFile.name;

		_fileReader.onload = function (event) {
			_imgToCrop[0].src = event.target.result;
			$('.crop-image-tag').modal('show');
			setTimeout(function () {
				_self.cropper = new Cropper(_imgToCrop[0], opts.settings);
			}, 200);
		};

		_fileReader.readAsDataURL(opts.imageFile);
	});

	this.cropImage = function () {
		_self.cropper.getCroppedCanvas(opts.cropSettings).toBlob(function (blob) {
			var reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = function () {
				$(opts.imageClass)[0].src = reader.result;
				$('.crop-image-tag').modal('hide');
				_self.unmount();
				// adiciona a tag ao crop-image novamente, devido ao bug do riot que, ao montar uma tag em uma div, quando desmonta ele apaga a div
				$(opts.cropClass).append("<div id='crop-image'/>");
			};
		});
	};
};
