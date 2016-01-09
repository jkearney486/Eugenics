(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/skill-nameplate.html"
    ], function (ko, htmlString) {
        var SkillNameplateViewModel = function (params) {
            this.skills = params.skills;
            this.skillId = params.id;

            this.selectedSkill = ko.computed({
                read: function () {
                    var skillId = ko.unwrap(this.skillId);
                    return ko.utils.arrayFirst(this.skills(), function (s) {
                        return ko.unwrap(s.id) === skillId;
                    });
                },
                deferEvaluation: true,
                owner: this
            });
        };

        return {
            viewModel: SkillNameplateViewModel,
            template: htmlString
        };
    });
})();
