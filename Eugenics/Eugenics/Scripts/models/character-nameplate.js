(function () {
    "use strict";

    define([
        "knockout",
        "text!../views/character-nameplate.html"
    ], function (ko, htmlString) {
        var CharacterNameplateViewModel = function (params) {
            this.characters = params.characters;
            this.characterId = params.id;

            this.selectedCharacter = ko.computed({
                read: function () {
                    var characterId = ko.unwrap(this.characterId);
                    return ko.utils.arrayFirst(this.characters(), function (c) {
                        return ko.unwrap(c.id) === characterId;
                    });
                },
                deferEvaluation: true,
                owner: this
            });
        };

        return {
            viewModel: CharacterNameplateViewModel,
            template: htmlString
        };
    });
})();
