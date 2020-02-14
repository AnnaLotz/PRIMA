"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            // if (soundMuted == false) {
            Sound.sounds[_id].volume = 0.3;
            Sound.sounds[_id].play();
            // }
        } //close play
        static playMusic() {
            // if (soundMuted == false) {
            Sound.sounds["gameMusic"].loop = true;
            Sound.sounds["gameMusic"].volume = 0.2;
            Sound.sounds["gameMusic"].play();
            // }
        } //close playMusic
    } //close class
    Sound.sounds = {};
    EscapeTheEdge.Sound = Sound;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close Namespace
//# sourceMappingURL=Sound.js.map