(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/character-card.html"
    ], function (ko, htmlString) {
        var CharacterCardViewModel = function (params) {
            this.cardIndex = params.index;
            this.character = ko.unwrap(params.character);
            this.characters = params.characters;
            this.classes = params.classes;
            this.skills = params.skills;
            this.assets = params.assets;
            this.flaws = params.flaws;

            this.avatarTabId = ko.computed({
                read: function () {
                    var href = "avatar-tab";
                    href += this.cardIndex();
                    return href;
                },
                owner: this
            });
            this.parentsTabId = ko.computed({
                read: function () {
                    var href = "parents-tab";
                    href += this.cardIndex();
                    return href;
                },
                owner: this
            });
            this.classesTabId = ko.computed({
                read: function () {
                    var href = "classes-tab";
                    href += this.cardIndex();
                    return href;
                },
                owner: this
            });
            this.skillsTabId = ko.computed({
                read: function () {
                    var href = "skills-tab";
                    href += this.cardIndex();
                    return href;
                },
                owner: this
            });
            this.avatarTabHref = ko.computed({
                read: function () {
                    return "#" + this.avatarTabId();
                },
                deferEvaluation: true,
                owner: this
            });
            this.parentsTabHref = ko.computed({
                read: function () {
                    return "#" + this.parentsTabId();
                },
                deferEvaluation: true,
                owner: this
            });
            this.classesTabHref = ko.computed({
                read: function () {
                    return "#" + this.classesTabId();
                },
                deferEvaluation: true,
                owner: this
            });
            this.skillsTabHref = ko.computed({
                read: function () {
                    return "#" + this.skillsTabId();
                },
                deferEvaluation: true,
                owner: this
            });
            this.strBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;
                    
                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.str();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairStr();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.magBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.mag();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairMag();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.sklBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.skl();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairSkl();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.spdBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.spd();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairSpd();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.lckBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.lck();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairLck();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.defBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.def();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairDef();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.resBonus = ko.computed({
                read: function () {
                    var total = 0;
                    var character = this.character;
                    var pairCharacter, pairClass;
                    var pairStat, pairUpStat;

                    if (character.isPaired() && character.isPairMain()) {
                        pairCharacter = character.pairPartner();
                        pairStat = pairCharacter.res();

                        pairClass = pairCharacter.selectedClass();
                        if (pairClass) {
                            total += Math.min(3, pairStat);
                            pairUpStat = pairClass.pairRes();
                            if (pairUpStat > 0) {
                                total += pairUpStat + 2;
                            }
                        }
                    }

                    if (total === 0) {
                        return "";
                    }
                    return "+ " + total;
                },
                deferEvaluation: true,
                owner: this
            });

            this.setupChild();
        };

        CharacterCardViewModel.prototype = {
            selectParent: function (character) {
                // character will be the CharacterNameplateViewModel
                // this will be the CharacterCardViewModel
                var selectedCharacter = this.getCharacterById(character.characterId);
                var oldParent;
                if (!selectedCharacter.isMarried()) {
                    oldParent = this.character.selectedParent();
                    if (oldParent) {
                        oldParent.marriagePartner(null);
                    }
                    this.character.selectedParent(this.getCharacterById(character.characterId));
                }
            },
            setupChild: function () {
                var mainParent;
                if (this.character.isChild()) {
                    mainParent = this.getCharacterById(this.character.parentId());
                    this.character.mainParent(mainParent);
                    if (mainParent.isMarried()) {
                        this.character.selectedParent(mainParent.marriagePartner());
                    }
                    this.character.calculateStatMods();
                }
            },
            selectClass: function (selectedClass) {
                var classObj = this.getClassById(ko.unwrap(selectedClass.classId));
                this.character.selectedClass(classObj);
            },
            removeClass: function () {
                this.character.selectedClass(null);
            },
            selectAsset: function (asset) {
                this.character.avatarAsset(asset);
            },
            selectFlaw: function (flaw) {
                this.character.avatarFlaw(flaw);
            },
            selectSkill: function (selectedSkill) {
                var skill;
                var selected = false;
                if (this.character.selectedSkills().length < 5) {
                    skill = this.getSkillById(ko.unwrap(selectedSkill.skillId));
                    selected = !!ko.utils.arrayFirst(this.character.selectedSkills(), function (s) {
                        return skill === s;
                    });
                    if (!selected) {
                        this.character.selectedSkills.push(skill);
                    }
                }
            },
            removeSkill: function (selectedSkill) {
                var skill = this.getSkillById(ko.unwrap(selectedSkill.skillId));
                this.character.selectedSkills.remove(skill);
            },
            getCharacterById: function (id) {
                return ko.utils.arrayFirst(this.characters(), function (character) {
                    return ko.unwrap(character.id) === id;
                });
            },
            getClassById: function (id) {
                return ko.utils.arrayFirst(this.classes(), function (c) {
                    return ko.unwrap(c.id) === id;
                });
            },
            getSkillById: function (id) {
                return ko.utils.arrayFirst(this.skills(), function (skill) {
                    return ko.unwrap(skill.id) === id;
                });
            }
        };

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    componentHandler.upgradeElements(componentInfo.element);
                    return new CharacterCardViewModel(params);
                }
            },
            template: htmlString
        };
    });
})();
