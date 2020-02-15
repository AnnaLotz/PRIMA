namespace EscapeTheEdge {
    export function showMenue(): void {
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("controlPage").style.display = "none";
        document.getElementById("creditsPage").style.display = "none";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("menueButtons").style.display = "initial";

    }

    export function showControls(): void {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("controlPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    } //close showControls

    export function toggleMusic(): void {
        Sound.init();
        if (!musicMuted) {
            musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
            Sound.stopMusic();
        } else if (musicMuted) {
            musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
            Sound.playMusic();
            Sound.sounds["gameMusic"].muted = false;
        }
        // 
    } //close toggleMusic

    export function toggleSounds(): void {
        if (!soundMuted) {
            soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sounds: aus";
        } else if (soundMuted) {
            soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sounds: an";
        }
    } //close toggleSounds

    export function showCredits(): void {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("creditsPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    }
}//close Namespace