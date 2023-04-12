/* BOS - BierOnStack - File Reserved */
commentsTag = function (opts) {
	var self = this;

	this.on('mount', function () {
		$('.comments-tag #comment-form').form({
			on: 'submit',
			fields: {
				message: {
					identifier: 'message-text',
					rules: [
						{
							type: 'empty',
							prompt: 'É necessário escrever um comentário!'
						}
					]
				}
			},
			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();

				let newComment = {
					date: new Date(),
					message: $('#message-text').val()
				};

				opts.onComment(newComment, self);
				$('#message-text').val('');
				return false;
			}
		});
	});

	this.on('update', function () {
		console.log(opts);
	});
};
