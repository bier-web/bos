/* BOS - BierOnStack - File Reserved */
headerTag = function (opts) {
    const _self = this;

    this.showNavigation = function () {
        $(".navigation-tag").sidebar({}).sidebar("toggle");
    };

    this.on("mount", function () {
        $(".menu-button").popup();
    });
};
