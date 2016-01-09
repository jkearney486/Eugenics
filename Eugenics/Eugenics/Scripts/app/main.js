﻿(function () {
    "use strict";

    require([
        "knockout",
        "jquery",
        "sprintf",
        "text",
        "knockout-delegatedEvents"
    ],
    function (ko, $, sprintf, text) {
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
            this.isPaired = ko.observable(false);
            this.isPairMain = ko.observable(false);
            this.isMarried = ko.observable(false);

            this.isChild = ko.computed({
                read: function () {
                    return !!this.parentId();
                },
                deferEvaluation: true,
                owner: this
            });
        };

        CharacterViewModel.prototype = {

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

        };

        var EugenicsViewModel = function () {
            this.characters = ko.observableArray([]);
            this.classes = ko.observableArray([]);
            this.skills = ko.observableArray([]);
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
                    that.classes(data);
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
                    that.skills(data);
                })
                .fail(this.logError);
            },
            initialize: function () {
                this.getCharacters();
                this.getClasses();
                this.getSkills();
            }
        };

        ko.components.register("character-card", { require: "../models/character-card" });

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
