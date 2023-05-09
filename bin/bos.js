#!/usr/bin/env node
const program = require('commander');
const packageInfo = require('../package.json');
const bosActions = require('./bos-actions.js');

require('dotenv-extended').load();

program.version(packageInfo.version);
// Comando para criar uma nova aplicação Bos;
program.command('new [nome-app]').description('Criar um novo projeto com o Bos').action(bosActions.actionNew);
// Comando para preparar a nova aplicação criada (executa tudo que é preciso para preparar e desenvolver);
program.command('prepare').description('Preparar a aplicação para executar').action(bosActions.actionPrepareBosApp);
// Comando para remover a aplicação com o nome passado como parâmetro (remove do diretório corrente);
program.command('remove [nome-app]').description('Remove um projeto do diretório atual').action(bosActions.actionRemove);
// Comando para gerar uma nova chave de autenticação para o dashboard do bosBackend;
program.command('keygen').description('Gerando a chave para acesso remoto (./.bos-backend/keys.json)').action(bosActions.actionGenerateKey);
// Comando para mostrar a chave de autenticação para o dashboard do bosBackend;
program.command('showkey').description('Mostrar a chave para acesso remoto (./.bos-backend/keys.json)').action(bosActions.actionShowKey);
// Comando para compilar os componentes riot, less e iniciar a aplicação em mode desenvolvimento, fica escutando as mudanças em arquivos;
program
	.command('build')
	.description('Compilar BosApp em dev ou prod')
	.option('-d, --dev', 'compilar BosApp para desenvolvimento')
	.option('-p, --prod', 'compilar BosApp para produção')
	.action((options) => {
		if (options.dev) {
			bosActions.actionBuildDev(true);
		} else if (options.prod) {
			bosActions.actionBuildProd();
		}
	});

program
	.command('create')
	.description('Criar recursos da aplicação')
	.option('-a, --admin', 'Criar usuário admin da aplicação')
	.option('-s, --screen', 'Criar tela de cadastro na aplicação')
	.action((options) => {
		if (options.admin) {
			bosActions.createAdminUser();
		} else if (options.screen) {
			bosActions.createScreen();
		}
	});

// // Comando para iniciar o projeto BosApp;
// program
//  .command('start')
//  .description('iniciar o projeto bos')
//  .option('-d, --dashboard', 'inicia o bos backend dashboard')
//  .option('-o, --open', 'abre o bos app no browser')
//  .option('-e, --environment [env]', 'ambiente padrão é desenvolvimento (development)')
//  .action((options) => {
//      bosActions.startApp(options);
//  });

program.parse(process.argv);
