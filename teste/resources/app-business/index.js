var helpers = requireModule("helpers");

var loadStatus = {
    queued: {
        index: 1,
        icon: "large hourglass outline orange icon",
        tooltip: "Em fila para execução"
    },
    running: {
        index: 2,
        icon: "large sync blue icon",
        tooltip: "Em execução"
    },
    completed: {
        index: 3,
        icon: "large thumbs up outline green icon",
        tooltip: "Carga concluída"
    },
    never: {
        index: 4,
        icon: "large thumbs down outline orange icon",
        tooltip: "Carga nunca realizada"
    },
    fail: {
        index: 5,
        icon: "large exclamation red icon",
        tooltip: "Falha ao realizar a carga"
    }
};

module.exports = {
    loadStatus: loadStatus
};
