(function () {
    "use strict";

    define([
        "knockout"
    ], function (ko) {
        var ClassViewModel = function (classObj) {
            this.id = ko.observable(classObj.id);
            this.name = ko.observable(classObj.name);
            this.maxHP = ko.observable(classObj.maxHP);
            this.maxStr = ko.observable(classObj.maxStr);
            this.maxMag = ko.observable(classObj.maxMag);
            this.maxSkl = ko.observable(classObj.maxSkl);
            this.maxSpd = ko.observable(classObj.maxSpd);
            this.maxLck = ko.observable(classObj.maxLck);
            this.maxDef = ko.observable(classObj.maxDef);
            this.maxRes = ko.observable(classObj.maxRes);
            this.pairStr = ko.observable(classObj.pairStr);
            this.pairMag = ko.observable(classObj.pairMag);
            this.pairSkl = ko.observable(classObj.pairSkl);
            this.pairSpd = ko.observable(classObj.pairSpd);
            this.pairLck = ko.observable(classObj.pairLck);
            this.pairDef = ko.observable(classObj.pairDef);
            this.pairRes = ko.observable(classObj.pairRes);
            this.pairMov = ko.observable(classObj.pairMov);
            this.isBaseClass = ko.observable(classObj.isBaseClass);
        };

        return ClassViewModel;
    });
})();
