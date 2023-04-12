/* BOS - BierOnStack */
cancelUnless(internal, 'BierOnStack: Menus só podem ser tratados por métodos do Sistema!', 401);

let menusBusiness = requireModule('menusBusiness');
let _menu = this;
menusBusiness.onDelete(ctx, dpd, _menu, previous);
