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
        var EugenicsViewModel = function () {

        };

        ko.components.register("character-card", { require: "../models/character-card" });

        $(function () {
            var container = document.getElementById("main");
            var viewModel;

            if (container) {
                viewModel = new EugenicsViewModel();
                ko.applyBindings(viewModel, container);
            }
        })
    });
}());
