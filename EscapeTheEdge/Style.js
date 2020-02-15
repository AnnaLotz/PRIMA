"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    function showMenue() {
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("controlPage").style.display = "none";
        document.getElementById("creditsPage").style.display = "none";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("menueButtons").style.display = "initial";
    }
    EscapeTheEdge.showMenue = showMenue;
    function showControls() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("controlPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    } //close showControls
    EscapeTheEdge.showControls = showControls;
    function toggleMusic() {
        EscapeTheEdge.Sound.init();
        if (!EscapeTheEdge.musicMuted) {
            EscapeTheEdge.musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
            EscapeTheEdge.Sound.stopMusic();
        }
        else if (EscapeTheEdge.musicMuted) {
            EscapeTheEdge.musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
            EscapeTheEdge.Sound.playMusic();
            EscapeTheEdge.Sound.sounds["gameMusic"].muted = false;
        }
        // 
    } //close toggleMusic
    EscapeTheEdge.toggleMusic = toggleMusic;
    function toggleSounds() {
        if (!EscapeTheEdge.soundMuted) {
            EscapeTheEdge.soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sounds: aus";
        }
        else if (EscapeTheEdge.soundMuted) {
            EscapeTheEdge.soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sounds: an";
        }
    } //close toggleSounds
    EscapeTheEdge.toggleSounds = toggleSounds;
    function showCredits() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("creditsPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    }
    EscapeTheEdge.showCredits = showCredits;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close Namespace
//# sourceMappingURL=Style.js.map