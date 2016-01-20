(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/skill-nameplate.html"
    ], function (ko, htmlString) {
        var SkillNameplateViewModel = function (params) {
            this.nameplateIndex = params.index;
            this.skills = params.skills;
            this.skillId = params.id;
            this.attr = params.attr || {};
            // in this case, selected is a list of the selected skill objects
            this.selected = params.selected;
            this.str = params.str;
            this.mag = params.mag;
            this.skl = params.skl;
            this.spd = params.spd;
            this.lck = params.lck;
            this.def = params.def;
            this.res = params.res;

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
            this.activationRate = ko.computed({
                read: function () {
                    var skill = this.selectedSkill();
                    var stat = ko.unwrap(skill.activationStat);
                    var multiplier = ko.unwrap(skill.activationMultiplier);
                    var rate;

                    if (stat && multiplier) {
                        rate = Math.min(100, (ko.unwrap(this[stat]) * multiplier));
                    }
                    return rate;
                },
                deferEvaluation: true,
                owner: this
            });
            this.nameplateId = ko.computed({
                read: function () {
                    return "skillNameplate" + ko.unwrap(this.skillId) +
                        ko.unwrap(this.nameplateIndex);
                },
                deferEvaluation: true,
                owner: this
            });
            this.mainAttr = ko.computed({
                read: function () {
                    var attr = {};
                    var passedAttr = ko.unwrap(this.attr);
                    var id;

                    // bring in all attributes passed over
                    for (var i in passedAttr) {
                        if (passedAttr.hasOwnProperty(i)) {
                            attr[i] = passedAttr[i];
                        }
                    }

                    attr.id = ko.unwrap(this.nameplateId);

                    return attr;
                },
                deferEvaluation: true,
                owner: this
            });
        };

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    componentHandler.upgradeElements(componentInfo.element);
                    return new SkillNameplateViewModel(params);
                }
            },
            template: htmlString
        };
    });
})();
