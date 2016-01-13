(function () {
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

            this.setupChild();
        };

        CharacterCardViewModel.prototype = {
            selectParent: function (character) {
                // character will be the CharacterNameplateViewModel
                // this will be the CharacterCardViewModel
                this.character.selectedParent(this.getCharacterById(character.characterId));
            },
            setupChild: function () {
                var mainParent;
                if (this.character.isChild()) {
                    mainParent = this.getCharacterById(this.character.parentId());
                    this.character.mainParent(mainParent);
                    this.character.calculateStatMods();
                }
            },
            selectClass: function (selectedClass) {
                var classObj = this.getClassById(ko.unwrap(selectedClass.classId));
                this.character.selectedClass(classObj);
            },
            selectAsset: function (asset) {
                this.character.avatarAsset(asset);
            },
            selectFlaw: function (flaw) {
                this.character.avatarFlaw(flaw);
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
