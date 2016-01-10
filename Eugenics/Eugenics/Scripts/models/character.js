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
            this.modStrBase = ko.observable(character.modStr);
            this.modMagBase = ko.observable(character.modMag);
            this.modSklBase = ko.observable(character.modSkl);
            this.modSpdBase = ko.observable(character.modSpd);
            this.modLckBase = ko.observable(character.modLck);
            this.modDefBase = ko.observable(character.modDef);
            this.modResBase = ko.observable(character.modRes);
            this.parentId = ko.observable(character.parentID);
            // selectedParent will be the id of the second parent
            this.selectedParent = ko.observable();
            // avatarAsset/Flaw will be the AssetFlawViewModel object
            this.avatarAsset = ko.observable();
            this.avatarFlaw = ko.observable();
            this.isPaired = ko.observable(false);
            this.isPairMain = ko.observable(false);
            this.isMarried = ko.observable(false);
            this.isInitialized = ko.observable(false);
            // selectedClass will be the ClassViewModel object
            this.selectedClass = ko.observable();
            this.supports = ko.observableArray([]);
            this.baseClasses = ko.observableArray([]);
            this.promotedClasses = ko.observableArray([]);
            this.skills = ko.observableArray([]);
            this.inheritedSkills = ko.observableArray([]);
            this.parents = ko.observableArray([]);

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
            this.str = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.mag = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.skl = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.spd = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.lck = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.def = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });
            this.res = ko.computed({
                read: function () {
                    var total = 0;
                },
                deferEvaluation: true,
                owner: this
            });

            this.selectedParent.subscribe(function (value) {
                if (value) {
                    this.getClassesChild();
                    this.getSkillsInheritedUnique();
                } else {
                    this.getClasses();
                    this.inheritedSkills([]);
                }
            }, this);
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
            getClassesChild: function () {
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/parents/%s/%s/classes",
                    ko.unwrap(this.id),
                    ko.unwrap(this.parentId),
                    ko.unwrap(this.selectedParent));
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
            getSkillsInheritedUnique: function () {
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/parents/%s/%s/skills",
                    ko.unwrap(this.id),
                    ko.unwrap(this.parentId),
                    ko.unwrap(this.selectedParent));
                $.getJSON(url)
                .done(function (data) {
                    var skills = [];
                    ko.utils.arrayForEach(data, function (s) {
                        skills.push(s);
                    });
                    that.inheritedSkills(skills);
                })
                .fail(this.logError);
            },
            getParents: function () {
                var parentId = this.parentId();
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/supports", parentId);
                $.getJSON(url)
                .done(function (data) {
                    var parents = [];
                    ko.utils.arrayForEach(data, function (p) {
                        parents.push(p);
                    });
                    that.parents(parents);
                })
                .fail(this.logError);
            },
            initialize: function () {
                if (!this.isInitialized()) {
                    this.getSupports();
                    this.getClasses();
                    if (this.isChild()) {
                        this.getParents();
                    }
                    this.isInitialized(true);
                }
            }
        };

        return CharacterViewModel;
    });
})();
