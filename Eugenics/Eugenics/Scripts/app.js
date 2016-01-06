(function () {
    "use strict";

    requirejs.config({
        baseUrl: "Scripts/lib",
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",
            //"material": "https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min",
            "knockout": "knockout-3.4.0",
            "modernizr": "modernizr-2.8.3",
            "sprintf": "sprintf.min",
            "app": "../app"
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

    requirejs(["app/main"])
})();
