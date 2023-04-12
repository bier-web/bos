/* BOS - BierOnStack - File Reserved: ToChange */
let helpersServer = require('../../bos-helpers/helpers-server');

module.exports = {
	verifyAppDataMenus: function (dpdConnection, callbackCreateMenus) {
		let createMenuSales = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Gestão de Vendas',
					description: 'Gestão e base de vendas',
					order: 200000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuSales, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Sales {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Sales created successful');
						dpdConnection.menus.post({
							name: 'Base de Vendas',
							description: 'Gestão da base de vendas',
							url: '#/sales',
							tagName: 'sales',
							iconClass: 'shopping cart icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							menuParentId: menuSales.id
						});
					}
					callbackCreateMenus();
				}
			);
		};
		let createMenuQueues = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Filas de Vendas',
					description: 'Filas para operações com vendas',
					order: 300000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuQueues, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Queues {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Queues created successful');
						dpdConnection.menus.post({
							name: 'Fila de Vendas Pendentes',
							description: 'Vendas pendentes de auditoria',
							url: '#/sales-pending',
							tagName: 'sales-pending',
							iconClass: 'cart plus icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							menuParentId: menuQueues.id
						});
					}
					dpdConnection.menus.post({
						name: 'Fila de Vendas em Tratamento',
						description: 'Vendas com tratativa especial',
						url: '#/sales-treatment',
						tagName: 'sales-treatment',
						iconClass: 'cart arrow down icon',
						order: 0,
						isSystem: false,
						isParent: false,
						isActive: false,
						menuParentId: menuQueues.id
					});
					dpdConnection.menus.post({
						name: 'Fila de Vendas para Instalação',
						description: 'Vendas em processo de instalação',
						url: '#/sales-pre-sale',
						tagName: 'sales-pre-sale',
						iconClass: 'gem outline icon',
						order: 0,
						isSystem: false,
						isParent: false,
						isActive: false,
						menuParentId: menuQueues.id
					});
					dpdConnection.menus.post({
						name: 'Fila de Vendas para Pós-Vendas',
						description: 'Ações de retenção e pós vendas',
						url: '#/sales-pos-sale',
						tagName: 'sales-pos-sale',
						iconClass: 'handshake icon',
						order: 0,
						isSystem: false,
						isParent: false,
						isActive: false,
						menuParentId: menuQueues.id
					});
					callbackCreateMenus();
				}
			);
		};

		createMenuSales(function () {
			createMenuQueues(function () {
				callbackCreateMenus();
			});
		});
	},
	appMenuReportsChildren: function (menuReport, dpdConnection) {
		dpdConnection.menus.post({
			name: 'Exportações',
			description: 'Gerenciamento de Exportações',
			url: '#/exports-manager',
			tagName: 'exports-manager',
			iconClass: 'cloud download alternate icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Parciais Diárias - Vendedores',
			description: 'Resultado parcial por dia / vendedores',
			url: '#/rel-sales-partials-sellers',
			tagName: 'rel-sales-partials-sellers',
			iconClass: 'hand holding usd icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Parciais Diárias - Equipes',
			description: 'Resultado parcial por dia / equipes',
			url: '#/rel-sales-partials-teams',
			tagName: 'rel-sales-partials-teams',
			iconClass: 'hand holding usd icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Vendas Detalhadas',
			description: 'Listagem de vendas com informações detalhadas',
			url: '#/rel-sales-details',
			tagName: 'rel-sales-details',
			iconClass: 'file alternate outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Vendas Detalhadas Consolidado',
			description: 'Listagem de vendas que compõem o relatório consolidado',
			url: '#/rel-sales-details-consolidated',
			tagName: 'rel-sales-details-consolidated',
			iconClass: 'file alternate outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Fixa - Vendedores',
			description: 'Relatório consolidado de vendas fixas / vendedores',
			url: '#/rel-sales-consolidated-fix-sellers',
			tagName: 'rel-sales-consolidated-fix-sellers',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Fixa - Equipes',
			description: 'Relatório consolidado de vendas fixas / equipes',
			url: '#/rel-sales-consolidated-fix-teams',
			tagName: 'rel-sales-consolidated-fix-teams',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Fixa - PDVs',
			description: 'Relatório consolidado de vendas fixas / pdvs',
			url: '#/rel-sales-consolidated-fix-pdvs',
			tagName: 'rel-sales-consolidated-fix-pdvs',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Móvel - Vendedores',
			description: 'Relatório consolidado de vendas móvel / vendedores',
			url: '#/rel-sales-consolidated-mobile-sellers',
			tagName: 'rel-sales-consolidated-mobile-sellers',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Móvel - Equipes',
			description: 'Relatório consolidado de vendas móvel / equipes',
			url: '#/rel-sales-consolidated-mobile-teams',
			tagName: 'rel-sales-consolidated-mobile-teams',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
		dpdConnection.menus.post({
			name: 'Consolidado Móvel - PDVs',
			description: 'Relatório consolidado de vendas móvel / pdvs',
			url: '#/rel-sales-consolidated-mobile-pdvs',
			tagName: 'rel-sales-consolidated-mobile-pdvs',
			iconClass: 'file invoice dollar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			isReportMenu: true,
			menuParentId: menuReport.id
		});
	},
	appMenuDashboardsChildren: function (menuDashboard, dpdConnection) {
		dpdConnection.menus.post({
			name: 'Filas de Atendimento',
			description: 'Gráfico de situações das filas',
			url: '#/dash-sales-queues-01',
			tagName: 'dash-sales-queues-01',
			iconClass: 'chart bar icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuDashboard.id
		});
	},
	appMenuRegistersChildren: function (menuRegister, dpdConnection) {
		dpdConnection.menus.post({
			name: 'Clientes',
			description: 'Cadastro de clientes',
			url: '#/customers',
			tagName: 'customers',
			iconClass: 'address book outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
		dpdConnection.menus.post({
			name: 'Serviços',
			description: 'Cadastro de serviços',
			url: '#/services',
			tagName: 'services',
			iconClass: 'satellite dish icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
		dpdConnection.menus.post({
			name: 'Colaboradores',
			description: 'Cadastro de colaboradores',
			url: '#/employees',
			tagName: 'employees',
			iconClass: 'people carry icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
		dpdConnection.menus.post({
			name: 'Metas',
			description: 'Cadastro de metas',
			url: '#/goals',
			tagName: 'goals',
			iconClass: 'percentage icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
		dpdConnection.menus.post({
			name: 'Cidades',
			description: 'Cadastro de cidades',
			url: '#/cities',
			tagName: 'cities',
			iconClass: 'map marker alternate icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
		dpdConnection.menus.post({
			name: 'Equipes',
			description: 'Cadastro de equipes',
			url: '#/teams',
			tagName: 'teams',
			iconClass: 'user friends icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuRegister.id
		});
	},
	appMenuSystemChildren: function (menuSystem, dpdConnection) {
		dpdConnection.menus.post({
			name: 'Configurações da New eDealer',
			description: 'Configurações do New eDealer',
			url: '#/app-settings',
			tagName: 'app-settings',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});

		dpdConnection.menus.post({
			name: 'Colaboradores - Cargos',
			description: 'Cadastro de cargos de colaboradores',
			url: '#/employee-positions',
			tagName: 'employee-positions',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});

		dpdConnection.menus.post({
			name: 'Serviços - Categorias',
			description: 'Cadastro de categorias dos serviços',
			url: '#/service-categories',
			tagName: 'service-categories',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});
		dpdConnection.menus.post({
			name: 'Vendas - Tipos',
			description: 'Cadastro de tipos de venda',
			url: '#/sale-types',
			tagName: 'sale-types',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});
		dpdConnection.menus.post({
			name: 'Vendas - PDVs',
			description: 'Cadastro de PDV de vendas',
			url: '#/sale-pdvs',
			tagName: 'sale-pdvs',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});
		dpdConnection.menus.post({
			name: 'Vendas - Sistemas Externos',
			description: 'Cadastro de sistemas externos',
			url: '#/external-systems',
			tagName: 'external-systems',
			iconClass: 'folder outline icon',
			order: 0,
			isSystem: false,
			isParent: false,
			isActive: false,
			menuParentId: menuSystem.id
		});
	},
	verifyAppDataPermissions: function (dpdConnection, callbackCreateSystemPermissions) {
		//appsettings
		dpdConnection.permissions.post(
			{
				collection: 'appsettings',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Configurações da Aplicação'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'appsettings',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Configurações da Aplicação'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'appsettings',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Configurações da Aplicação'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//customers
		dpdConnection.permissions.post(
			{
				collection: 'customers',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Clientes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'customers',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Clientes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'customers',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Clientes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'customers',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Clientes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//saletypes
		dpdConnection.permissions.post(
			{
				collection: 'saletypes',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Tipo de Venda'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'saletypes',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Tipo de Venda'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'saletypes',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Tipo de Venda'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//employeepositions
		dpdConnection.permissions.post(
			{
				collection: 'employeepositions',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Cargos de Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'employeepositions',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Cargos de Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'employeepositions',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Cargos de Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//externalsystems
		dpdConnection.permissions.post(
			{
				collection: 'externalsystems',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Sistema Externo'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'externalsystems',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Sistema Externo'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'externalsystems',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Sistema Externo'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//salepdvs
		dpdConnection.permissions.post(
			{
				collection: 'salepdvs',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir PDV'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'salepdvs',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar PDV'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'salepdvs',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover PDV'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//servicecategories
		dpdConnection.permissions.post(
			{
				collection: 'servicecategories',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Categoria de Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'servicecategories',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Categoria de Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'servicecategories',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Categoria de Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//services
		dpdConnection.permissions.post(
			{
				collection: 'services',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'services',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'services',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'services',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Serviços'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//goals
		dpdConnection.permissions.post(
			{
				collection: 'goals',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Metas'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'goals',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Metas'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'goals',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Metas'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'goals',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Metas'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//teams
		dpdConnection.permissions.post(
			{
				collection: 'teams',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Equipes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'teams',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Equipes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'teams',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Equipes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'teams',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Equipes'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//employees
		dpdConnection.permissions.post(
			{
				collection: 'employees',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'employees',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'employees',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'employees',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Colaboradores'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//cities
		dpdConnection.permissions.post(
			{
				collection: 'cities',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Cidades'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'cities',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Cidades'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		dpdConnection.permissions.post(
			{
				collection: 'cities',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Cidades'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);

		callbackCreateSystemPermissions();
	}
};
