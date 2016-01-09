(function () {
    "use strict";

    define([
        "knockout"
    ], function (ko) {
        var AssetFlawViewModel = function (assetFlaw) {
            this.id = ko.observable(assetFlaw.id);
            this.name = ko.observable(assetFlaw.name);
            this.str = ko.observable(assetFlaw.str);
            this.mag = ko.observable(assetFlaw.mag);
            this.skl = ko.observable(assetFlaw.skl);
            this.spd = ko.observable(assetFlaw.spd);
            this.lck = ko.observable(assetFlaw.lck);
            this.def = ko.observable(assetFlaw.def);
            this.res = ko.observable(assetFlaw.res);
        };

        return AssetFlawViewModel;
    });
})();
