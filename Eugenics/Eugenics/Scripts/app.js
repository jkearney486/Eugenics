(function () {
    "use strict";

    requirejs.config({
        baseUrl: "Scripts/lib",
        paths: {
            "jquery": [
                "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",
                "jquery-2.1.4.min"
            ],
            "knockout": "knockout-3.4.0",
            "sprintf": "sprintf.min",
            "app": "../app",
            "views": "../views",
        },
        shim: {
            "knockout": {
                deps: ["jquery"]
            }
        },
        map: {
            "*": {
                "jquery": "jquery-private"
            },
            "jquery-private": {
                "jquery": "jquery"
            }
        }
    });

    requirejs(["app/main"]);
})();
