let _systemSetting = this;
cancelIf(!(typeof me !== 'undefined' && typeof me.isRoot != 'undefined' && me.isRoot) && ((!_systemSetting.isPublic && (!me || !internal)) || (!internal && _systemSetting.isInternal)), 'Você não está logado', 401);
