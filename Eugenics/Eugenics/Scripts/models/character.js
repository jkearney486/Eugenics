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
            this.modRes = ko.observable(character.modRes).extend({ notify: "always" });
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
            // marriagePartner will be the CharacterViewModel of this character's spouse
            this.marriagePartner = ko.observable();
            // pairPartner will be the CharacterViewModel of the character they are paired with
            this.pairPartner = ko.observable();
            this.isPairMain = ko.observable(false);
            this.isInitialized = ko.observable(false);
            // selectedClass will be the ClassViewModel object
            this.selectedClass = ko.observable();
            // these great lord observables will get overwritten,
            // but feel like they should at least be initialized
            this.greatLordMale = ko.observable();
            this.greatLordFemale = ko.observable();
            this.isSelected = ko.observable(false);
            this.supports = ko.observableArray([]);
            this.baseClasses = ko.observableArray([]);
            this.promotedClasses = ko.observableArray([]);
            this.skills = ko.observableArray([]);
            this.inheritedSkills = ko.observableArray([]);
            this.parents = ko.observableArray([]);
            this.selectedSkills = ko.observableArray([]);

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
            this.isMarried = ko.computed({
                read: function () {
                    return !!this.marriagePartner();
                },
                deferEvaluation: true,
                owner: this
            });
            this.isPaired = ko.computed({
                read: function () {
                    return !!this.pairPartner();
                },
                deferEvaluation: true,
                owner: this
            });
            this.isLimitBroken = ko.computed({
                read: function () {
                    return !!ko.utils.arrayFirst(this.selectedSkills(), function (skill) {
                        return ko.unwrap(skill.name) === "Limit Breaker";
                    });
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
            this.updateStat = ko.computed({
                read: function () {
                    // Unfortunate hack to create a dependency on both parent's
                    // modRes parameter so that if it changes, the child will
                    // recalculate their own stats based on the new ones of the parent.
                    // Have to use modRes, since that's the last one that gets assigned
                    // in the avatar stat calculation function.
                    // If we use modStr for example, since these dependencies execute
                    // synchronously, this updateStat computed will be called before
                    // the rest of the stats are assigned (mag thru res).
                    // This tells me that this is a really bad way of doing this
                    // so hopefully I can come up with something better later on...
                    var selectedParent = this.selectedParent();
                    var mainParent = this.mainParent();
                    if (selectedParent) {
                        selectedParent.modRes();
                    }
                    if (mainParent) {
                        mainParent.modRes();
                    }
                },
                deferEvaluation: true,
                owner: this
            }).extend({ notify: "always" });
            this.updateParents = ko.computed({
                read: function () {
                    // U.G.L.Y.
                    var mainParent = this.mainParent();
                    var selectedParent = this.selectedParent();
                    if (mainParent) {
                        mainParent.isMarried();
                    }
                    if (selectedParent) {
                        selectedParent.isMarried();
                    }
                },
                deferEvaluation: true,
                owner: this
            }).extend({ notify: "always" });
            this.str = ko.computed({
                read: function () {
                    var total = 0;
                    var selectedClass = this.selectedClass();

                    if (selectedClass) {
                        total = selectedClass.maxStr();
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
                        if (this.isLimitBroken()) {
                            total += 10;
                        }
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
            this.selectedParent.subscribe(function (value) {
                if (value) {
                    value.marriagePartner(this.mainParent());
                    this.mainParent().marriagePartner(value);
                } else {
                    this.mainParent().marriagePartner(null);
                }
            }, this);
            this.updateStat.subscribe(function (value) {
                this.calculateStatMods();
            }, this);
            this.updateParents.subscribe(function (value) {
                this.refreshParents();
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
                var isFemale = this.gender() === "Female" ? true : false;
                var greatLordMaleId = this.greatLordMale();
                var greatLordFemaleId = this.greatLordFemale();
                $.getJSON("api/classes/promotions", { ids: ids })
                .done(function (data) {
                    var classes = [];
                    ko.utils.arrayForEach(data, function (c) {
                        if (c !== greatLordFemaleId && c !== greatLordMaleId) {
                            classes.push(c);
                        } else if (c === greatLordFemaleId && isFemale) {
                            classes.push(c);
                        } else if (c === greatLordMaleId && !isFemale) {
                            classes.push(c);
                        }
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
                        that.skills.push(s);
                    });
                })
                .fail(this.logError);
            },
            getCharacterSkills: function () {
                var that = this;
                var url = sprintf.sprintf("api/characters/%s/skills", ko.unwrap(this.id));
                $.getJSON(url)
                .done(function (data) {
                    var skills = [];
                    ko.utils.arrayForEach(data, function (s) {
                        that.skills.push(s);
                    });
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
            refreshParents: function () {
                var mainParent = this.mainParent();
                var selectedParent = this.selectedParent();

                if (!mainParent.isMarried()) {
                    this.selectedParent(null);
                } else {
                    if (mainParent.marriagePartner() !== selectedParent) {
                        this.selectedParent(mainParent.marriagePartner());
                    }
                }
            },
            initialize: function (glm, glf) {
                if (!this.isInitialized()) {
                    this.greatLordFemale = glf;
                    this.greatLordMale = glm;
                    this.getSupports();
                    this.getClasses();
                    this.getCharacterSkills();
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
