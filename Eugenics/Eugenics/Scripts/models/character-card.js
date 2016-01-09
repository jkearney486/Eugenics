(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/character-card.html"
    ], function (ko, htmlString) {
        var CharacterCardViewModel = function (params) {
            this.cardIndex = params.index;
            this.character = params.character;

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
            this.baseClasses = ko.computed({
                read: function () {
                    return ko.utils.arrayFilter(this.classes(), function (c) {
                        return ko.unwrap(c.isBaseClass);
                    });
                },
                deferEvaluation: true,
                owner: this
            });
            this.promotedClasses = ko.computed({
                read: function () {
                    return ko.utils.arrayFilter(this.classes(), function (c) {
                        return !ko.unwrap(c.isBaseClass);
                    });
                },
                deferEvaluation: true,
                owner: this
            });
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
