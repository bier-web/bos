

riot.tag2('export-definition', '<div class="ui segment export-definition-container"> <form class="export-definition-form ui tiny equal width form error" autocomplete="off"> <input type="hidden" id="export-definition-id"> <div class="ui grid wide middle aligned"> <div class="row"> <div class="ui error message"></div> </div> <div class="row two columns"> <div class="column"> <div class="field"> <label>Nome da Definição</label> <input class="firstFocus" type="text" id="export-definition-name" placeholder="Nome da definição"> </div> </div> <div class="column"> <div class="field"> <label>Nome da Coleção</label> <input type="text" id="export-definition-collection-name" placeholder="Nome da coleção"> </div> </div> </div> <div class="row one columns"> <div class="column"> <div class="field"> <label>Configuração da Definição</label> <textarea type="text" id="export-definition-export-definitions" placeholder="Configurações da Definição"></textarea> </div> </div> </div> </div> </form> </div>', '', 'class="export-definition-tag"', function(opts) {
exportDefinitionTag.call(this, this.opts)
});