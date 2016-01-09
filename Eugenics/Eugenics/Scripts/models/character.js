(function () {
    "use strict";

    define([
        "knockout",
        "jquery",
        "sprintf"
    ], function (ko, $, sprintf) {
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
                $.getJSON("api/classes/promotions", { ids: ids })
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

        return CharacterViewModel;
    });
})();
