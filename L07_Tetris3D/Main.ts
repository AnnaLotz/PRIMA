///<reference types="../Fudge/FudgeCore.js"/> 
namespace L07 {
    import f = FudgeCore;
    export let viewport: f.Viewport;
    document.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5); //Kamera auf Z-Achse verschieben

        //create Game Node
        let game: f.Node = createGame();

        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);

        viewport.draw();

    } //close handleLoad

    function createGame(): f.Node {
        let game: f.Node = new f.Node("Game");
        let fragment: Fragment = new Fragment();
        // fragment.createMesh();
        return game;
    } //close createGame

} //close Namespace