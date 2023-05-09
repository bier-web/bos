

riot.tag2('crop-image', '<div class="content crop-image-container"> <div class="ui grid wide middle aligned"> <div class="row"><img class="image-to-crop"></div> <div class="row"> <div class="button crop ui button fluid medium basic primary" onclick="{cropImage}">Cortar </div> </div> </div> </div>', '', 'class="crop-image-tag small ui modal"', function(opts) {
cropImageTag.call(this, this.opts)
});