"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            if (!soundMuted) {
                Sound.sounds[_id].volume = 0.5;
                Sound.sounds[_id].play();
            }
        } //close play
        static playMusic() {
            if (!musicMuted) {
                Sound.sounds["gameMusic"].loop = true;
                Sound.sounds["gameMusic"].volume = 0.3;
                Sound.sounds["gameMusic"].play();
            }
        } //close playMusic
        static stopMusic() {
            Sound.sounds["gameMusic"].muted = true;
        } //close stopMusic
    } //close class
    Sound.sounds = {};
    EscapeTheEdge_Archiv.Sound = Sound;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close Namespace
//# sourceMappingURL=Sound.js.map