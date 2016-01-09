(function () {
    "use strict";

    define([
        "knockout"
    ], function (ko) {
        var SkillViewModel = function (skill) {
            this.id = ko.observable(skill.id);
            this.name = ko.observable(skill.name);
            this.description = ko.observable(skill.description);
            this.activationStat = ko.observable(skill.activationStat);
            this.activationMultiplier = ko.observable(skill.activationMultiplier);
            this.dlc = ko.observable(skill.dlc);
        };

        return SkillViewModel;
    });
})();
