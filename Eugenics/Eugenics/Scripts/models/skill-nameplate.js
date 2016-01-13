(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/skill-nameplate.html"
    ], function (ko, htmlString) {
        var SkillNameplateViewModel = function (params) {
            this.skills = params.skills;
            this.skillId = params.id;
            this.attr = params.attr || {};
            // in this case, selected is a list of the select skill objects
            this.selected = params.selected;

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
            this.skillCss = ko.computed({
                read: function () {
                    var selectedSkills = ko.unwrap(this.selected);
                    var selected = false;
                    if (selectedSkills) {
                        selected = !!ko.utils.arrayFirst(selectedSkills, function (skill) {
                            return ko.unwrap(skill.id) === ko.unwrap(this.skillId);
                        }.bind(this));
                    }
                    return selected ? "selected" : "";
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
