#!/usr/bin/env node
const program = require('commander');
const packageInfo = require('../package.json');
const bosActions = require('./bos-actions.js');

require('dotenv-extended').load();

program.version(packageInfo.version);
program.command('new [nome-app]').description('criar um novo projeto com o Bos').action(bosActions.actionNew);
program.command('prepare').description('preparar a aplicação para executar').action(bosActions.actionPrepareBosApp);
program.command('remove [nome-app]').description('remove um projeto do diretório atual').action(bosActions.actionRemove);
program.command('keygen').description('gerando a chave para acesso remoto (./.bos-backend/keys.json)').action(bosActions.actionGenerateKey);
program.command('showkey').description('mostrar a chave para acesso remoto (./.bos-backend/keys.json)').action(bosActions.actionShowKey);
program.command('build tags').description('compilar as tags riots (frontend)').action(bosActions.actionBuildTags);
program.command('build less').description('compilar os arquivos less (frontend)').action(bosActions.actionBuildLess);

program
	.command('start')
	.description('iniciar o projeto bos')
	.option('-d, --dashboard', 'inicia o bos backend dashboard')
	.option('-o, --open', 'abre o bos app no browser')
	.option('-e, --environment [env]', 'ambiente padrão é desenvolvimento (development)')
	.action((options) => {
		bosActions.startApp(options);
	});

program.parse(process.argv);
