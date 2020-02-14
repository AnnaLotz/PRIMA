namespace EscapeTheEdge {

    interface Sounds {
        [id: string]: HTMLAudioElement;
    }
    export class Sound {
        private static sounds: Sounds = {};

        public static init(): void {
            let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }

        public static play(_id: string): void {
            // if (soundMuted == false) {
              Sound.sounds[_id].volume = 0.3;
              Sound.sounds[_id].play();
            // }
          } //close play

        public static playMusic(): void {
            // if (soundMuted == false) {
                Sound.sounds["gameMusic"].loop = true;
                Sound.sounds["gameMusic"].volume = 0.2;
                Sound.sounds["gameMusic"].play();
            // }
        } //close playMusic
    } //close class

} //close Namespace