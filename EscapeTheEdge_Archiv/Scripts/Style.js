"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    function showMenue() {
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("controlPage").style.display = "none";
        document.getElementById("creditsPage").style.display = "none";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("menueButtons").style.display = "initial";
    } //close showMenue
    EscapeTheEdge_Archiv.showMenue = showMenue;
    function showControls() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("controlPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    } //close showControls
    EscapeTheEdge_Archiv.showControls = showControls;
    function toggleMusic() {
        EscapeTheEdge_Archiv.Sound.init();
        if (!EscapeTheEdge_Archiv.musicMuted) {
            EscapeTheEdge_Archiv.musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
            EscapeTheEdge_Archiv.Sound.stopMusic();
        }
        else if (EscapeTheEdge_Archiv.musicMuted) {
            EscapeTheEdge_Archiv.musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
            EscapeTheEdge_Archiv.Sound.playMusic();
            EscapeTheEdge_Archiv.Sound.sounds["gameMusic"].muted = false;
        }
    } //close toggleMusic
    EscapeTheEdge_Archiv.toggleMusic = toggleMusic;
    function toggleSounds() {
        if (!EscapeTheEdge_Archiv.soundMuted) {
            EscapeTheEdge_Archiv.soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sounds: aus";
        }
        else if (EscapeTheEdge_Archiv.soundMuted) {
            EscapeTheEdge_Archiv.soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sounds: an";
        }
    } //close toggleSounds
    EscapeTheEdge_Archiv.toggleSounds = toggleSounds;
    function showCredits() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("creditsPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    } //close showCredits
    EscapeTheEdge_Archiv.showCredits = showCredits;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close Namespace
//# sourceMappingURL=Style.js.map