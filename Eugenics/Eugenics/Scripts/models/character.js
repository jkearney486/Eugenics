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
            // mainParent will be the CharacterViewModel of the main parent (from parentId)
            this.mainParent = ko.observable();
            // selectedParent will be the CharacterViewModel of the second parent
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
            this.selectedClassId = ko.computed({
                read: function () {
                    var sc = this.selectedClass();
                    if (sc) {
                        return ko.unwrap(sc.id);
                    }
                    return null;
                },
                deferEvaluation: true,
                owner: this
            });
            this.selectedAssetId = ko.computed({
                read: function () {
                    var asset = this.avatarAsset();
                    if (asset) {
                        return ko.unwrap(asset.id);
                    }
                    return null;
                },
                deferEvaluation: true,
                owner: this
            });
            this.selectedFlawId = ko.computed({
                read: function () {
                    var flaw = this.avatarFlaw();
                    if (flaw) {
                        return ko.unwrap(flaw.id);
                    }
                    return null;
                },
                deferEvaluation: true,
                owner: this
            });
            this.selectedParentId = ko.computed({
                read: function () {
                    var selectedParent = this.selectedParent();
                    if (selectedParent) {
                        return ko.unwrap(selectedParent.id);
                    }
                    return null;
                },
                deferEvaluation: true,
                owner: this
            });
            this.str = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxStr();
                    }

                    total += this.modStr();
                    
                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.mag = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxMag();
                    }

                    total += this.modMag();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.skl = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxSkl();
                    }

                    total += this.modSkl();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.spd = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxSpd();
                    }

                    total += this.modSpd();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.lck = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxLck();
                    }

                    total += this.modLck();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.def = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxDef();
                    }

                    total += this.modDef();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });
            this.res = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxRes();
                    }

                    total += this.modRes();

                    return total;
                },
                deferEvaluation: true,
                owner: this
            });

            this.selectedParentId.subscribe(function (value) {
                this.selectedClass(null);
                this.calculateStatMods();
                if (value) {
                    this.getClassesChild();
                    this.getSkillsInheritedUnique();
                } else {
                    this.getClasses();
                    this.inheritedSkills([]);
                }
            }, this);
            this.avatarAsset.subscribe(function (value) {
                this.calculateAvatarStatMods();
            }, this);
            this.avatarFlaw.subscribe(function (value) {
                this.calculateAvatarStatMods();
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
                    ko.unwrap(this.selectedParentId));
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
                    ko.unwrap(this.selectedParentId));
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
            calculateStatMods: function () {
                var firstParent = this.mainParent();
                var secondParent = this.selectedParent();
                var str, mag, skl, spd, lck, def, res;
                var isChildParent = false;
                str = 0;
                mag = 0;
                skl = 0;
                spd = 0;
                lck = 0;
                def = 0;
                res = 0;
                if (firstParent) {
                    isChildParent = isChildParent || firstParent.isChild();
                    str += firstParent.modStr();
                    mag += firstParent.modMag();
                    skl += firstParent.modSkl();
                    spd += firstParent.modSpd();
                    lck += firstParent.modLck();
                    def += firstParent.modDef();
                    res += firstParent.modRes();
                }
                if (secondParent) {
                    isChildParent = isChildParent || secondParent.isChild();
                    str += secondParent.modStr();
                    mag += secondParent.modMag();
                    skl += secondParent.modSkl();
                    spd += secondParent.modSpd();
                    lck += secondParent.modLck();
                    def += secondParent.modDef();
                    res += secondParent.modRes();
                }
                if (!isChildParent) {
                    str += this.modStrBase();
                    mag += this.modMagBase();
                    skl += this.modSklBase();
                    spd += this.modSpdBase();
                    lck += this.modLckBase();
                    def += this.modDefBase();
                    res += this.modResBase();
                }
                this.modStr(str);
                this.modMag(mag);
                this.modSkl(skl);
                this.modSpd(spd);
                this.modLck(lck);
                this.modDef(def);
                this.modRes(res);
            },
            calculateAvatarStatMods: function () {
                var asset = this.avatarAsset();
                var flaw = this.avatarFlaw();
                var str, mag, skl, spd, lck, def, res;
                str = 0;
                mag = 0;
                skl = 0;
                spd = 0;
                lck = 0;
                def = 0;
                res = 0;
                if (asset) {
                    str += asset.str();
                    mag += asset.mag();
                    skl += asset.skl();
                    spd += asset.spd();
                    lck += asset.lck();
                    def += asset.def();
                    res += asset.res();
                }
                if (flaw) {
                    str -= flaw.str();
                    mag -= flaw.mag();
                    skl -= flaw.skl();
                    spd -= flaw.spd();
                    lck -= flaw.lck();
                    def -= flaw.def();
                    res -= flaw.res();
                }
                this.modStr(str);
                this.modMag(mag);
                this.modSkl(skl);
                this.modSpd(spd);
                this.modLck(lck);
                this.modDef(def);
                this.modRes(res);
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
