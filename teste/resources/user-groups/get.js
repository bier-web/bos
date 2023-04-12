let helpers = requireModule('helpers');
let userGroupsBusiness = requireModule('user-groups-business');
let _userGroup = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso UserGroups :: Evento :: get :: Ação :: Begin');
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (!internal) {
		userGroupsBusiness.canGet(ctx, dpd, me, _userGroup, function (canGet) {
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroups :: Evento :: get :: Ação :: End usuário não autorizado');
			cancelIf(!canGet, 'Usuário não autorizado');
		});
	}

	if (typeof query.include !== 'undefined' && query.include.indexOf('usergroupusers') > -1) {
		dpd.usergroupusers.get({ userGroupId: _userGroup.id, userId: query.userId, $ignoreLimitRecursion: true }, function (userGroupsUsers, error) {
			if (error) {
				helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroups :: Evento :: get :: Exceção :: {0}', error));
			} else {
				helpers.helperServer.showLog('BierOnStack: Recurso UserGroups :: Evento :: get :: Ação :: Inserindo dados do usuário');
				_userGroup.userGroupUserIsAllowed = userGroupsUsers.length > 0;
				_userGroup.userGroupUserId = userGroupsUsers.length > 0 ? userGroupsUsers[0].id : undefined;
			}
		});
	}
	helpers.helperServer.showLog('BierOnStack: Recurso UserGroups :: Evento :: get :: Ação :: End');
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroups :: Evento :: get :: Exceção :: {0}', error));
}
