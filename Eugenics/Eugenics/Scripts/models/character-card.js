﻿(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/character-card.html"
    ], function (ko, htmlString) {
        var CharacterCardViewModel = function (params) {
            this.cardIndex = params.index;
            this.character = params.character;
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
        };

        CharacterCardViewModel.prototype = {
            // character here will be the CharacterNameplateViewModel
            // this will be the CharacterCardViewModel
            selectParent: function (character) {
                this.character.selectedParent(character.characterId);
                this.setupChild();
            },
            setupChild: function () {
                var firstParent = this.getCharacterById(this.character.parentId());
                var secondParent = this.getCharacterById(this.character.selectedParent());
                var str, mag, skl, spd, lck, def, res;
                var isChildParent = firstParent.isChild() || secondParent.isChild();
                str = firstParent.modStr() + secondParent.modStr();
                mag = firstParent.modMag() + secondParent.modMag();
                skl = firstParent.modSkl() + secondParent.modSkl();
                spd = firstParent.modSpd() + secondParent.modSpd();
                lck = firstParent.modLck() + secondParent.modLck();
                def = firstParent.modDef() + secondParent.modDef();
                res = firstParent.modRes() + secondParent.modRes();
                if (!isChildParent) {
                    str += this.character.modStrBase();
                    mag += this.character.modMagBase();
                    skl += this.character.modSklBase();
                    spd += this.character.modSpdBase();
                    lck += this.character.modLckBase();
                    def += this.character.modDefBase();
                    res += this.character.modResBase();
                }
                this.character.modStr(str);
                this.character.modMag(mag);
                this.character.modSkl(skl);
                this.character.modSpd(spd);
                this.character.modLck(lck);
                this.character.modDef(def);
                this.character.modRes(res);
            },
            selectClass: function (selectedClass) {
                var classObj = this.getClassById(ko.unwrap(selectedClass.classId));
                this.character.selectedClass(classObj);
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
