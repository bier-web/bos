/* BOS - BierOnStack - File Reserved */
let helpersServer = require('../../bos-helpers/helpers-server');
let dpdConnectionServer = require('./dpd-connection');
let startDataApp = require('./start-data-app');
let dpdConnection;

function verifyMenus(isToEraseData, callbackVerifySystemData) {
	helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: verifyMenus :: Ação :: Begin');
	let eraseMenus = function (callbackVerifyMenus) {
		helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: eraseMenus :: Ação :: Begin');
		dpdConnection.menus
			.getResource()
			.store.getCollection()
			.then(function (mongoCollection) {
				mongoCollection.deleteMany({}, function () {
					helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: eraseMenus :: Ação :: End menus apagados com sucesso');
					callbackVerifyMenus();
				});
			});
	};
	let createMenus = function (callbackVerifyMenus) {
		helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: createMenus :: Ação :: Begin');
		let createMenuHome = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Home',
					description: 'Menu Inicial',
					order: 100000,
					isSystem: true,
					isParent: true,
					isActive: true
				},
				function (menuHome, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu home {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Home created successful');
						dpdConnection.menus.post({
							name: 'Home',
							description: 'Página inicial',
							url: '#/home',
							tagName: 'home',
							iconClass: 'home icon',
							order: 0,
							isSystem: true,
							isParent: false,
							isActive: false,
							menuParentId: menuHome.id
						});
						dpdConnection.menus.post({
							name: 'Perfil',
							description: 'Perfil usuário',
							url: '#/profile',
							tagName: 'profile',
							iconClass: 'address card outline icon',
							order: 0,
							isSystem: true,
							isParent: false,
							isActive: false,
							menuParentId: menuHome.id
						});
						dpdConnection.menus.post({
							name: 'Sair',
							description: 'Sair',
							url: '#/logout',
							tagName: 'logout',
							iconClass: 'door open icon',
							order: 0,
							isSystem: true,
							isParent: false,
							isActive: false,
							menuParentId: menuHome.id
						});
						callbackCreateMenus(menuHome);
					}
				}
			);
		};
		let createMenuReports = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Relatórios',
					description: 'Relatórios em Geral',
					order: 400000,
					isSystem: false,
					isParent: true,
					isActive: false,
					isReportMenu: true
				},
				function (menuReport, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Relatórios {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Relatórios created successful');
						callbackCreateMenus(menuReport);
					}
				}
			);
		};
		let createMenuDashboards = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Dashboards',
					description: 'Dashboards em Geral',
					order: 500000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuDashboard, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Dashboards {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Dashboards created successful');
						callbackCreateMenus(menuDashboard);
					}
				}
			);
		};
		let createMenuRegister = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Cadastros',
					description: 'Cadastros gerais',
					order: 600000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuRegister, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Cadastro {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Cadastro created successful');
						dpdConnection.menus.post({
							name: 'Avisos',
							description: 'Cadastros de avisos',
							url: '#/alerts',
							tagName: 'alerts',
							iconClass: 'envelope outline icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							menuParentId: menuRegister.id
						});
						callbackCreateMenus(menuRegister);
					}
				}
			);
		};
		let createMenuRequests = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Suporte',
					description: 'Chamados de suporte',
					order: 700000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuSolicitacoes, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Solicitacoes {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Solicitacoes created successful');
						dpdConnection.menus.post({
							name: 'Chamados de Suporte',
							description: 'Chamados para suporte',
							url: '#/support-requests',
							tagName: 'support-requests',
							iconClass: 'ambulance icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							menuParentId: menuSolicitacoes.id
						});
						callbackCreateMenus(menuSolicitacoes);
					}
				}
			);
		};
		let createMenuSystem = function (callbackCreateMenus) {
			dpdConnection.menus.post(
				{
					name: 'Sistema',
					description: 'Gerenciamento do sistema',
					order: 800000,
					isSystem: false,
					isParent: true,
					isActive: false
				},
				function (menuSistema, error) {
					if (error) {
						helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating menu Sistema {0}', error.message));
					} else {
						helpersServer.pinoLogger.info('BierOnStack Menu Sistema created successful');
						dpdConnection.menus.post({
							name: 'Segurança - Grupos',
							description: 'Grupos de Usuários',
							url: '#/user-groups',
							tagName: 'user-groups',
							iconClass: 'user friends icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Segurança - Usuários',
							description: 'Cadastro de Usuários',
							url: '#/users',
							tagName: 'users',
							iconClass: 'user icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Configurações Internas',
							description: 'Configurações de Sistema',
							url: '#/system-settings',
							tagName: 'system-settings',
							iconClass: 'code icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Auditoria',
							description: 'Logs de Auditoria',
							url: '#/audits',
							tagName: 'audits',
							iconClass: 'eye outline icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Chamados - Prioridades',
							description: 'Cadastro de prioridade de chamados',
							url: '#/support-priorities',
							tagName: 'support-priorities',
							iconClass: 'file code outline icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Chamados - Status',
							description: 'Cadastro de status de chamados',
							url: '#/support-statuses',
							tagName: 'support-statuses',
							iconClass: 'file code outline icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						dpdConnection.menus.post({
							name: 'Exportações - Definições',
							description: 'Configurações de exportação',
							url: '#/export-definitions',
							tagName: 'export-definitions',
							iconClass: 'file code outline icon',
							order: 0,
							isSystem: false,
							isParent: false,
							isActive: false,
							isRoot: false,
							menuParentId: menuSistema.id
						});
						callbackCreateMenus(menuSistema);
					}
				}
			);
		};

		helpersServer.pinoLogger.info('BierOnStack Creating menus (using tamplates)...');
		createMenuHome(function (menuHome) {
			if (typeof startDataApp.appMenuHomeChildren != 'undefined') startDataApp.appMenuHomeChildren(menuHome, dpdConnection);
			createMenuReports(function (menuReports) {
				if (typeof startDataApp.appMenuReportsChildren != 'undefined') startDataApp.appMenuReportsChildren(menuReports, dpdConnection);
				createMenuDashboards(function (menuDashboards) {
					if (typeof startDataApp.appMenuDashboardsChildren != 'undefined') startDataApp.appMenuDashboardsChildren(menuDashboards, dpdConnection);
					createMenuRegister(function (menuRegisters) {
						if (typeof startDataApp.appMenuRegistersChildren != 'undefined') startDataApp.appMenuRegistersChildren(menuRegisters, dpdConnection);
						createMenuRequests(function (menuRequests) {
							if (typeof startDataApp.appMenuRequestsChildren != 'undefined') startDataApp.appMenuRequestsChildren(menuRequests, dpdConnection);
							createMenuSystem(function (menuSystem) {
								if (typeof startDataApp.appMenuSystemChildren != 'undefined') startDataApp.appMenuSystemChildren(menuSystem, dpdConnection);
								startDataApp.verifyAppDataMenus(dpdConnection, function () {
									callbackVerifyMenus();
								});
							});
						});
					});
				});
			});
		});
	};

	helpersServer.pinoLogger.info('BierOnStack Verifing Menus...');
	if (isToEraseData) {
		eraseMenus(function () {
			createMenus(function () {
				callbackVerifySystemData();
			});
		});
	} else {
		dpdConnection.menus.get(function (menuItens, error) {
			if (!error && menuItens.length === 0) {
				helpersServer.pinoLogger.warn('BierOnStack Menus not exists');
				createMenus(function () {
					callback();
				});
			} else {
				helpersServer.pinoLogger.info('BierOnStack Menus exists');
				callbackVerifySystemData();
			}
		});
	}
}

function verifyPermissions(isToEraseData, callback) {
	let erasePermissions = function (callback) {
		helpersServer.pinoLogger.warn('BierOnStack Deleting all system permissions...');
		dpdConnection.permissions
			.getResource()
			.store.getCollection()
			.then(function (mongoCollection) {
				mongoCollection.deleteMany({}, function () {
					helpersServer.pinoLogger.info('BierOnStack All system permissions were deleted.');
					callback();
				});
			});
	};

	let createSystemPermissions = function (callbackVerifyPermissions) {
		helpersServer.pinoLogger.info('BierOnStack Creating permissions...');
		// systemsettings
		dpdConnection.permissions.post(
			{
				collection: 'systemsettings',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Configurações Internas'
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
				collection: 'systemsettings',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Configurações Internas'
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
				collection: 'systemsettings',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Configurações Internas'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		// exportdefinitions
		dpdConnection.permissions.post(
			{
				collection: 'exportdefinitions',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Definições de Exportação'
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
				collection: 'exportdefinitions',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Definições de Exportação'
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
				collection: 'exportdefinitions',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Definições de Exportação'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);

		//exportsManager
		dpdConnection.permissions.post(
			{
				collection: 'exportsmanager',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Exportação de Relatórios'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//alerts
		dpdConnection.permissions.post(
			{
				collection: 'alerts',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Avisos'
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
				collection: 'alerts',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Avisos'
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
				collection: 'alerts',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Avisos'
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
				collection: 'alerts',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Avisos'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//supportpriorities
		dpdConnection.permissions.post(
			{
				collection: 'supportpriorities',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Suporte Prioridades'
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
				collection: 'supportpriorities',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Suporte Prioridades'
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
				collection: 'supportpriorities',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Suporte Prioridades'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//supportstatuses
		dpdConnection.permissions.post(
			{
				collection: 'supportstatuses',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Suporte Status'
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
				collection: 'supportstatuses',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Suporte Status'
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
				collection: 'supportstatuses',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Suporte Status'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//supportrequests
		dpdConnection.permissions.post(
			{
				collection: 'supportrequests',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Chamados'
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
				collection: 'supportrequests',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Chamados'
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
				collection: 'supportrequests',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Chamados'
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
				collection: 'viewsupportrequests',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Chamados'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//usergroups
		dpdConnection.permissions.post(
			{
				collection: 'usergroups',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Grupos de Usuários'
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
				collection: 'usergroups',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Grupos de Usuários'
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
				collection: 'usergroups',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Grupos de Usuários'
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
				collection: 'usergroups',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Grupos de Usuários'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//users
		dpdConnection.permissions.post(
			{
				collection: 'users',
				actionId: helpersServer.both.actions.add.index,
				description: 'Inserir Usuários'
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
				collection: 'users',
				actionId: helpersServer.both.actions.edit.index,
				description: 'Editar Usuários'
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
				collection: 'users',
				actionId: helpersServer.both.actions.remove.index,
				description: 'Remover Usuários'
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
				collection: 'users',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Usuários'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//menus
		dpdConnection.permissions.post(
			{
				collection: 'menus',
				actionId: helpersServer.both.actions.read.index,
				description: 'Visualizar Menus'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		//exportreports
		dpdConnection.permissions.post(
			{
				collection: 'exportreports',
				actionId: helpersServer.both.actions.read.index,
				description: 'Exportar relatórios'
			},
			function (permissionCreated, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating permission {0}', error.message));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack Permission {0} created successful', permissionCreated.description));
				}
			}
		);
		startDataApp.verifyAppDataPermissions(dpdConnection, function () {
			callbackVerifyPermissions();
		});
	};

	helpersServer.pinoLogger.info('BierOnStack Verifing System Menus...');
	if (isToEraseData) {
		erasePermissions(function () {
			createSystemPermissions(function () {
				callback();
			});
		});
	} else {
		dpdConnection.permissions.get(function (permissionItens, error) {
			if (!error && permissionItens.length === 0) {
				helpersServer.pinoLogger.warn('BierOnStack No permissions exists');
				createSystemPermissions(function () {
					callback();
				});
			} else {
				helpersServer.pinoLogger.info('BierOnStack Permissions Exists');
				callback();
			}
		});
	}
}

function verifyBasicSecurityData(isToEraseData, callback) {
	let eraseBasicSecurityData = function (callback) {
		helpersServer.pinoLogger.warn('BierOnStack Deleting all basic security data permissions...');
		dpdConnection.dimensions
			.getResource()
			.store.getCollection()
			.then(function (mongoCollection) {
				mongoCollection.deleteMany({}, function () {
					helpersServer.pinoLogger.info('BierOnStack All dimensions were deleted.');
				});
			});
		dpdConnection.users.get({ username: { $ne: process.env.BOS_SERVICE_USER_NAME } }, function (allUsers, error) {
			if (error) {
				helpersServer.showException(helpersServer.both.formatString('BierOnStack Error Getting Users {0}', error.message));
			} else {
				if (allUsers.length > 0) {
					let allUsersCount = allUsers.length;
					allUsers.forEach((user) => {
						helpersServer.showLog(helpersServer.both.formatString('BierOnStack Trying to delete user {0}', user.username));
						dpdConnection.users.del(user.id, function (userDeleted, error) {
							if (error) {
								helpersServer.showException(helpersServer.both.formatString('BierOnStack Error Getting Users {0}', error.message));
							} else {
								helpersServer.showLog(helpersServer.both.formatString('BierOnStack User deleted {0}', user.username));
							}

							allUsersCount--;
							if (allUsersCount == 0) {
								callback();
							}
						});
					});
				} else {
					callback();
				}
			}
		});
	};

	let createBasicSecurityData = function (callback) {
		helpersServer.pinoLogger.info('BierOnStack Creating Basic Security Data...');
		dpdConnection.users.post(
			{
				fullName: 'Carlos Eduardo Bier',
				username: 'eduardo.bier',
				password: 'dWGXmRXMH6bTTH63waArcV5SHAId82RVa90KRCnRb0pqeeZCQTj8OHxAd8vRe0Om6YEQ',
				// password: 'eduardo.bier',
				isProfileCompleted: true,
				email: 'eduardo.bier@referenceit.com.br',
				isActive: true,
				isRoot: true,
				isAuditable: false,
				systemIsPost: false
			},
			function (userCreated, error) {
				if (error) {
					console.log(error);
					helpersServer.showException(helpersServer.both.formatString('BierOnStack Error creating user default {0}', error.errors));
				} else {
					helpersServer.pinoLogger.info(helpersServer.both.formatString('BierOnStack User Default {0} created successful', userCreated.username));
					callback();
				}
			}
		);
	};

	helpersServer.pinoLogger.info('BierOnStack Verifing Basic Security Data...');
	if (isToEraseData) {
		eraseBasicSecurityData(function () {
			createBasicSecurityData(function () {
				callback();
			});
		});
	} else {
		dpdConnection.users.get(function (userItens, error) {
			if (!error && userItens.length === 0) {
				helpersServer.pinoLogger.warn('BierOnStack No users exists');
				createBasicSecurityData(function () {
					callback();
				});
			} else {
				helpersServer.pinoLogger.info('BierOnStack Users Exists');
				callback();
			}
		});
	}
}

module.exports = {
	verifySystemData: function (isToEraseData, callbackStartTheMagic) {
		dpdConnectionServer.connect(function (serverDpd) {
			dpdConnection = serverDpd;
			let _userName = process.env.BOS_SERVICE_USER_NAME;
			let _userPassword = process.env.BOS_SERVICE_USER_PASSWORD;
			dpdConnection.users.login({ username: _userName, password: _userPassword }, function (user, error) {
				if (error) {
					helpersServer.showException(helpersServer.both.formatString('BierOnStack: Recurso ServiceStartData  :: Evento :: verifySytemData :: Exceção :: {0}', error.message));
				} else {
					helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: verifySystemData :: Ação :: Begin');
					verifyMenus(isToEraseData, function () {
						helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: verifySystemData :: Ação :: End verifyMenus executado com sucesso');
						verifyPermissions(isToEraseData, function () {
							helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: verifySystemData :: Ação :: End verifyPermissions executado com sucesso');
							verifyBasicSecurityData(isToEraseData, function () {
								helpersServer.showLog('BierOnStack: Recurso ServiceStartData :: Evento :: verifySystemData :: Ação :: End verifyBasicSecurityData executado com sucesso');
								callbackStartTheMagic();
							});
						});
					});
				}
			});
		});
	}
};
