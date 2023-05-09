const bosAppRoutes = [
    {
        name: "index",
        description: "Página Inicial",
        path: "/",
        tagName: "index",
        isUnloggedRoute: true,
        showHeader: true
    },
    {
        name: "not-found",
        description: "Página não encontrada",
        path: "/not-found",
        tagName: "not-found",
        isUnloggedRoute: true,
        showHeader: true
    },
    {
        name: "login",
        description: "Login do Sistema",
        path: "/login",
        tagName: "login",
        isUnloggedRoute: false,
        showHeader: false
    },
    {
        name: "register",
        description: "Registro no Sistema",
        path: "/register",
        tagName: "register",
        isUnloggedRoute: false,
        showHeader: false
    }
];

module.exports = bosAppRoutes;
