(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/parent-panel.html"
    ], function (ko, htmlString) {
        var ParentPanelViewModel = function (params) {
            this.parentId = params.parentId;
            this.parents = params.parents;
            this.characters = params.characters;

            this.mainParent = ko.computed({
                read: function () {
                    var parentId = ko.unwrap(this.parentId);
                    return ko.utils.arrayFirst(this.characters(), function (c) {
                        return ko.unwrap(c.id) === parentId;
                    });
                },
                deferEvaluation: true,
                owner: this
            });
            this.femaleParents = ko.computed({
                read: function () {
                    var parents = [];
                    if (ko.unwrap(this.mainParent().gender) === "Female") {
                        parents.push(ko.unwrap(this.parentId));
                    } else {
                        parents = this.parents();
                    }
                    return parents;
                },
                deferEvaluation: true,
                owner: this
            });
            this.maleParents = ko.computed({
                read: function () {
                    var parents = [];
                    if (ko.unwrap(this.mainParent().gender) === "Male") {
                        parents.push(ko.unwrap(this.parentId));
                    } else {
                        parents = this.parents();
                    }
                    return parents;
                },
                deferEvaluation: true,
                owner: this
            });
        };

        return {
            viewModel: ParentPanelViewModel,
            template: htmlString
        };
    });
})();
