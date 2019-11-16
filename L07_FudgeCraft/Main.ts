///<reference types="../Fudge/FudgeCore.js"/> 
namespace L07_FudgeCraft {
    import f = FudgeCore;
    export let viewport: f.Viewport;
    let game: f.Node;
    document.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        f.Debug.log(canvas);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(20); //Kamera auf Z-Achse verschieben
        cmpCam.pivot.translate(new f.Vector3(5, 5, 5));
        cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen

        //create Game Node
        let game: f.Node = createGame();

        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);

        viewport.draw();

    } //close handleLoad

    function createGame(): f.Node {
        game = new f.Node("Game");

        let fragment: Fragment = new Fragment(0);
        game.appendChild(fragment);

        return game;
    } //close createGame

} //close Namespace