cancelUnless(me || internal, 'Você não está logado', 401);
if (!me.isRoot && !internal) {
	hide('fieldId');
	hide('isToAll');
}
