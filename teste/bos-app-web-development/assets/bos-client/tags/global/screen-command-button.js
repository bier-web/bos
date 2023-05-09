

riot.tag2('screen-command-button', '<button-tag if="{opts.showButtons.indexOf(&quot;confirm&quot;)&gt;-1}" button-type="confirm" button-click="{confirmClick}"> </button-tag> <button-tag if="{opts.showButtons.indexOf(&quot;cancel&quot;)&gt;-1}" button-type="cancel" button-click="{cancelClick}"></button-tag>', '', 'class="screen-command-button"', function(opts) {
screenCommandButtonTag.call(this, this.opts)
});