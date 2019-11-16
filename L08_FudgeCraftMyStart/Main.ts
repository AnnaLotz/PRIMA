///<reference types="../Fudge/FudgeCore.js"/> 
namespace L08_FudgeCraft {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);


    let game: f.Node;
    let currentFragment: Fragment;
    
    
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event: Event): void {
        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        f.Debug.log(canvas);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translate(new f.Vector3(0, 3, 30)); // kamera auf ort setzen
        // cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen

        //create Game Node
        let game: f.Node = createGame();

        let cmpLight: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 0, 0.5));
        game.addComponent(cmpLight);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);

        viewport.draw();

        window.addEventListener("keydown", handleKeyDown);

    } //close handleLoad

    function createGame(): f.Node {
        game = new f.Node("Game");

        let fragment: Fragment = new Fragment(0);
        game.appendChild(fragment);

        fragment = new Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 5, 0))));
        game.appendChild(fragment);
        currentFragment = fragment;

        // for (let i: number = 0; i < 7; i++) {
        //     let fragment: Fragment = new Fragment(i);
        //     fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(i * 3, 0, 0))));
        //     game.appendChild(fragment);
        // }
    
        return game;
    } //close createGame


    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {

        //bewegung
        switch (_event.code) {
            case f.KEYBOARD_CODE.W: //später raus nehmen
                currentFragment.cmpTransform.local.translateY(1);
                break;
            case f.KEYBOARD_CODE.A:
                currentFragment.cmpTransform.local.translateX(-1);
                break;
            case f.KEYBOARD_CODE.D:
                currentFragment.cmpTransform.local.translateX(1);
                break;
            case f.KEYBOARD_CODE.S:
                currentFragment.cmpTransform.local.translateY(-1);
                break;
        }

        //Rotation
        switch (_event.code) {
            case f.KEYBOARD_CODE.Q:
                currentFragment.cmpTransform.local.rotateZ(90);
                break;
            case f.KEYBOARD_CODE.E:
                currentFragment.cmpTransform.local.rotateZ(-90);
                break;
        }
        console.log(currentFragment.cmpTransform);
        
        
        console.log(checkIfHit());
        if (checkIfHit) {
            //fragment fest setzen und neues erstellen
        }

        f.RenderManager.update();
        viewport.draw();
    } //close handleKeyDown

    function checkIfHit(): boolean {

        for (let fragment of game.getChildren()) {
            if (fragment != currentFragment) {
                //hier die abfrage für hit hin
                
            }

        }
        return false;
    } //close checkIfHit
    

} //close Namespace