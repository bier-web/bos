var fs = require('fs');
var tagSymbol = '__';

String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

prepareArgsToTagsValues(process.argv.slice(2), function (tagsValues) {
	getDirectoryStructure('./bos-templates/', function (files) {
		replaceFilesNamesWithTags(files, tagsValues, function () {
			files.forEach((file) => {
				if (file.type == 'file')
					getFileContent(file.originalName, function (content) {
						file.originalContent = content;
						file.newContent = stringReplaceByObjectProperties(content, tagsValues);
						setTimeout(() => {
							createFile(file.newName, file.newContent);
						}, 500);
					});
				else createDirectoryIfDoesentExists(file.newName);
			});
		});
	});
});

function getDirectoryStructure(directoryPath, callback) {
	var files = [];

	fs.readdirSync(directoryPath).forEach((fileName) => {
		if (fs.lstatSync(directoryPath + fileName).isDirectory()) {
			files.push({
				type: 'folder',
				originalName: directoryPath + fileName
			});
			getDirectoryStructure(directoryPath + fileName + '/').forEach((file) => {
				files.push(file);
			});
		} else {
			files.push({
				type: 'file',
				originalName: directoryPath + fileName
			});
		}
	});

	if (typeof callback == 'function')
		setTimeout(() => {
			return callback(files);
		}, 3000);
	else return files;
}

function replaceFilesNamesWithTags(files, tagsValues, callback) {
	// console.log('**************************replaceFilesNamesWithTags**************************');
	files.forEach((file) => {
		// console.log('**************************replaceFilesNamesWithTagsForeach**************************');
		// console.log(file, file.originalName, tagsValues);
		file.newName = stringReplaceByObjectProperties(file.originalName.replace('/bos-templates', ''), tagsValues);
	});

	return callback(files);
}

function stringReplaceByObjectProperties(str, objects) {
	// console.log('**************************stringReplaceByObjectProperties**************************');
	// console.log(str, objects);
	Object.keys(objects).forEach((key) => {
		// console.log('**************************stringReplaceByObjectPropertiesForeach**************************');
		// console.log(tagSymbol + key + tagSymbol, objects[key]);
		str = str.replaceAll(tagSymbol + key + tagSymbol, objects[key]);
	});

	return str;
}

function prepareArgsToTagsValues(args, callback) {
	var tagsValues = [];
	for (var i = 0; i < args.length; i++) {
		tagsValues[args[i].substr(0, args[i].indexOf('='))] = args[i].substr(args[i].indexOf('=') + 1, args[i].length);
	}

	return callback(tagsValues);
}

function getFileContent(fileName, callback) {
	fs.readFile(fileName, 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		callback(data);
	});
}

function createFile(fileName, content) {
	fs.writeFile(fileName, content, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('The file ' + fileName + ' was saved!');
	});
}

function createDirectoryIfDoesentExists(directoryName) {
	if (!fs.existsSync(directoryName)) {
		fs.mkdirSync(directoryName);
	}
}

/*
    node bos-scaffolding.js dpdcollectionname=banks collection=banks resourcetagtype=records collectionnamesingular=bank objectItem=bank collectioncamelcase=banks collectionnamesingularcammelcase=bank description=bancos
*/
