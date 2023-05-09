// BOS - BierOnStack - File Reserved
comments.comments-tag
	div.ui.comments
		div.comment(each=' { opts.comments } ')
			div.content
				a.author { author }
				div.metadata
					span.date { moment(date).format("DD/MM/YYYY - HH:mm") }
				div.text.message
					| { message }
		form#comment-form(class='ui.reply.form')
			div.field
				textarea#message-text
			button.ui.blue.button(type="submit" form='comment-form') Comentar
	script commentsTag.call(this, this.opts)

