// BOS - BierOnStack - File Reserved
crop-image.crop-image-tag.small.ui.modal
    div.content.crop-image-container
        div.ui.grid.wide.middle.aligned
            div.row
                img.image-to-crop
            div.row
                div.button.crop.ui.button.fluid.medium.basic.primary(onclick='{ cropImage }') Cortar            
    script cropImageTag.call(this, this.opts)