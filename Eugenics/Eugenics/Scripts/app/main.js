(function () {
    "use strict";

    require([
        "knockout",
        "jquery",
        "sprintf",
        "text",
        "knockout-delegatedEvents"
    ],
    function (ko, $, sprintf, text) {
        var getPromotedClasses = function (ids) {
            return $.getJSON("api/classes/promotions", { ids: ids });
        };

        var CharacterViewModel = function (character) {
            this.id = ko.observable(character.id);
            this.name = ko.observable(character.name);
            this.gender = ko.observable(character.gender);
            this.modStr = ko.observable(character.modStr);
            this.modMag = ko.observable(character.modMag);
            this.modSkl = ko.observable(character.modSkl);
            this.modSpd = ko.observable(character.modSpd);
            this.modLck = ko.observable(character.modLck);
            this.modDef = ko.observable(character.modDef);
            this.modRes = ko.observable(character.modRes);
            this.parentId = ko.observable(character.parentID);
            this.avatarAsset = ko.observable();
            this.avatarFlaw = ko.observable();
            this.isPaired = ko.observable(false);
            this.isPairMain = ko.observable(false);
            this.isMarried = ko.observable(false);
            this.isInitialized = ko.observable(false);
            this.supports = ko.observableArray([]);
            this.baseClasses = ko.observableArray([]);
            this.promotedClasses = ko.observableArray([]);
            this.skills = ko.observableArray([]);
            this.inheritedSkills = ko.observableArray([]);

            this.isChild = ko.computed({
                read: function () {
                    return !!this.parentId();
                },
                deferEvaluation: true,
                owner: this
            });
            this.isAvatar = ko.computed({
                read: function () {
                    return this.name().search("Avatar") != -1;
                },
                deferEvaluation: true,
                owner: this
            });
        };

        CharacterViewModel.prototype = {
            logError: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            getSupports: function () {
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/supports", ko.unwrap(this.id));
                $.getJSON(url)
                .done(function (data) {
                    var supports = [];
                    ko.utils.arrayForEach(data, function (s) {
                        supports.push(s);
                    });
                    that.supports(data);
                })
                .fail(this.logError);
            },
            getClasses: function () {
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/classes", ko.unwrap(this.id));
                $.getJSON(url)
                .done(function (data) {
                    var classes = [];
                    ko.utils.arrayForEach(data, function (c) {
                        classes.push(c);
                    });
                    that.baseClasses(classes);
                    that.getPromotedClasses();
                })
                .fail(this.logError);
            },
            getPromotedClasses: function () {
                var that = this;
                var ids = this.baseClasses();
                getPromotedClasses(ids)
                .done(function (data) {
                    var classes = [];
                    ko.utils.arrayForEach(data, function (c) {
                        classes.push(c);
                    });
                    that.promotedClasses(classes);
                    that.getSkills();
                })
                .fail(this.logError);
            },
            getSkills: function () {
                var that = this;
                var ids = this.baseClasses().concat(this.promotedClasses());
                $.getJSON("api/classes/skills", { ids: ids })
                .done(function (data) {
                    var skills = [];
                    ko.utils.arrayForEach(data, function (s) {
                        skills.push(s);
                    });
                    that.skills(skills);
                })
                .fail(this.logError);
            },
            initialize: function () {
                if (!this.isInitialized()) {
                    this.getSupports();
                    this.getClasses();
                    this.isInitialized(true);
                }
            }
        };

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

        ClassViewModel.prototype = {
            logError: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
        };

        var SkillViewModel = function (skill) {
            this.id = ko.observable(skill.id);
            this.name = ko.observable(skill.name);
            this.description = ko.observable(skill.description);
            this.activationStat = ko.observable(skill.activationStat);
            this.activationMultiplier = ko.observable(skill.activationMultiplier);
            this.dlc = ko.observable(skill.dlc);
        };

        SkillViewModel.prototype = {
            logError: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
        };

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

        var EugenicsViewModel = function () {
            this.characters = ko.observableArray([]);
            this.classes = ko.observableArray([]);
            this.skills = ko.observableArray([]);
            this.assets = ko.observableArray([]);
            this.flaws = ko.observableArray([]);
            this.selectedCharacters = ko.observableArray([]);
        };

        EugenicsViewModel.prototype = {
            logError: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            getCharacters: function () {
                var that = this;
                $.getJSON("api/characters")
                .done(function (data) {
                    var characters = [];
                    ko.utils.arrayForEach(data, function (c) {
                        characters.push(new CharacterViewModel(c));
                    });
                    that.characters(characters);
                })
                .fail(this.logError);
            },
            getClasses: function () {
                var that = this;
                $.getJSON("api/classes")
                .done(function (data) {
                    var classes = [];
                    ko.utils.arrayForEach(data, function (c) {
                        classes.push(new ClassViewModel(c));
                    });
                    that.classes(classes);
                })
                .fail(this.logError);
            },
            getSkills: function () {
                var that = this;
                $.getJSON("api/skills")
                .done(function (data) {
                    var skills = [];
                    ko.utils.arrayForEach(data, function (s) {
                        skills.push(new SkillViewModel(s));
                    });
                    that.skills(skills);
                })
                .fail(this.logError);
            },
            getAssets: function () {
                var that = this;
                $.getJSON("api/avatar/assets")
                .done(function (data) {
                    var assets = [];
                    ko.utils.arrayForEach(data, function (a) {
                        assets.push(new AssetFlawViewModel(a));
                    });
                    that.assets(assets);
                })
                .fail(this.logError);
            },
            getFlaws: function () {
                var that = this;
                $.getJSON("api/avatar/flaws")
                .done(function (data) {
                    var flaws = [];
                    ko.utils.arrayForEach(data, function (f) {
                        flaws.push(new AssetFlawViewModel(f));
                    });
                    that.flaws(flaws);
                })
                .fail(this.logError);
            },
            initialize: function () {
                this.getCharacters();
                this.getClasses();
                this.getSkills();
                this.getAssets();
                this.getFlaws();
            },
            selectCharacter: function (character) {
                character.initialize();
                this.selectedCharacters.push(character);
            },
            removeCharacter: function (card) {
                this.selectedCharacters.remove(card.character);
            }
        };

        ko.components.register("character-card", { require: "../models/character-card" });
        ko.components.register("class-nameplate", { require: "../models/class-nameplate" });
        ko.components.register("skill-nameplate", { require: "../models/skill-nameplate" });

        $(function () {
            var container = document.getElementById("main");
            var viewModel;

            if (container) {
                viewModel = new EugenicsViewModel();
                viewModel.initialize();
                ko.applyBindings(viewModel, container);
            }
        })
    });
}());
