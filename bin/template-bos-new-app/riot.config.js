import { registerPreprocessor } from '@riotjs/compiler';
import { render } from 'pug';

// register the pug preprocessor
registerPreprocessor('template', 'pug', (code, options) => {
	const { file } = options;

	return {
		code: render(code, {
			filename: file,
			pretty: true,
			doctype: 'html'
		})
	};
});

export default {
	input: ' public-development/tags/pugs',
	output: 'public-development/assets/bos-client/tags',
	extension: 'pug',
	// assign the pug preprocessor to the riot compiler options
	riot: {
		template: 'pug'
	}
};
