

riot.tag2('comments', '<div class="ui comments"> <div class="comment" each=" {opts.comments} "> <div class="content"><a class="author">{author}</a> <div class="metadata"><span class="date">{moment(date).format(⁗DD/MM/YYYY - HH:mm⁗)}</span></div> <div class="text message">{message}</div> </div> </div> <form class="ui.reply.form" id="comment-form"> <div class="field"> <textarea id="message-text"></textarea> </div> <button class="ui blue button" type="submit" form="comment-form">Comentar</button> </form> </div>', '', 'class="comments-tag"', function(opts) {
commentsTag.call(this, this.opts)
});