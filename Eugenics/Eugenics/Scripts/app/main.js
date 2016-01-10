(function () {
    "use strict";

    require([
        "knockout",
        "jquery",
        "sprintf",
        "text",
        "../models/character",
        "../models/class",
        "../models/skill",
        "../models/asset-flaw",
        "knockout-delegatedEvents"
    ],
    function (ko,
        $,
        sprintf,
        text,
        CharacterViewModel,
        ClassViewModel,
        SkillViewModel,
        AssetFlawViewModel) {
        
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
            addCharacter: function (character) {
                character.initialize();
                this.selectedCharacters.push(character);
            },
            removeCharacter: function (card) {
                this.selectedCharacters.remove(card.character);
            }
        };

        ko.components.register("character-card", { require: "../models/character-card" });
        ko.components.register("parent-panel", { require: "../models/parent-panel" });
        ko.components.register("class-nameplate", { require: "../models/class-nameplate" });
        ko.components.register("skill-nameplate", { require: "../models/skill-nameplate" });
        ko.components.register("character-nameplate", { require: "../models/character-nameplate" });

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
