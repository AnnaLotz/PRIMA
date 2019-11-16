///<reference types="../Fudge/FudgeCore.js"/> 
namespace L08_FudgeCraft {
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
        cmpCam.pivot.translate(new f.Vector3(12, 8, 15)); // kamera auf ort setzen
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

        fragment = new Fragment(1);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(3))));
        game.appendChild(fragment);

        fragment = new Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-5))));
        game.appendChild(fragment);

        fragment = new Fragment(3);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(7))));
        game.appendChild(fragment);

        //Light
        let cmpLight: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);

        return game;
    } //close createGame

} //close Namespace