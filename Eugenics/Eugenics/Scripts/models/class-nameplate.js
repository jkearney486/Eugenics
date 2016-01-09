(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/class-nameplate.html"
    ], function (ko, htmlString) {
        var ClassNameplateViewModel = function (params) {
            this.classes = params.classes;
            this.classId = params.id;

            this.selectedClass = ko.computed({
                read: function () {
                    var classId = ko.unwrap(this.classId);
                    return ko.utils.arrayFirst(this.classes(), function (c) {
                        return ko.unwrap(c.id) === classId;
                    });
                },
                deferEvaluation: true,
                owner: this
            });
        };

        return {
            viewModel: ClassNameplateViewModel,
            template: htmlString
        };
    });
})();
