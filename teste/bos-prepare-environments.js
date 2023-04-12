/* BOS - BierOnStack */
var copyDir = require('copy-dir');
var nodeMinify = require('node-minify');
var fileSystem = require('fs');

var prepareHomolog = function () {
  copyDir.sync('./public-development', './public-homolog');

  nodeMinify.minify({
    compressor: 'no-compress',
    input: 'public-homolog/assets/bos-client/tags/**/*.js',
    output: 'public-homolog/assets/bos-client/app.tags.general.min.js',
    callback: function (err, min) {
      nodeMinify.minify({
        compressor: 'babel-minify',
        input: 'public-homolog/assets/bos-client/**/*.js',
        output: 'public-homolog/assets/bos-client/app.helpers.general.min.js',
        callback: function (err, min) {
          nodeMinify.minify({
            compressor: 'babel-minify',
            input: 'public-homolog/tags/**/*.js',
            output: 'public-homolog/assets/bos-client/app.tags.logic.general.min.js',
            callback: function (err, min) {
              nodeMinify.minify({
                compressor: 'babel-minify',
                input: 'public-homolog/app.js',
                output: 'public-homolog/assets/bos-client/app.general.min.js',
                callback: function (err, min) {
                  fileSystem.rename('public-homolog/index-homolog.html', 'public-homolog/index.html', function (err) {
                    console.log('Arquivos Gerados com Sucesso!');
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  prepareHomolog: prepareHomolog
};

require('make-runnable');
