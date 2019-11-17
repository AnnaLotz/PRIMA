///<reference types="../Fudge/FudgeCore.js"/> 
namespace L08_FudgeCraft {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);

    let game: f.Node;
    let currentFragment: Fragment;
    let firstFragment: Fragment;


    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event: Event): void {
        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden

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

        console.log("before viewport.draw(): " + currentFragment.getCubesPositions());
        viewport.draw();
        console.log("after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst

        // currentFragment.cmpTransform.local.translateX(0);
        // currentFragment.cmpTransform.local.translateY(0);
        
        window.addEventListener("keydown", handleKeyDown);

    } //close handleLoad


    function createGame(): f.Node {
        game = new f.Node("Game");

        let fragment: Fragment;
        fragment = new Fragment(0);
        firstFragment = fragment;
        game.appendChild(fragment);


        fragment = new Fragment(1);
        fragment.addComponent(new f.ComponentTransform);
        currentFragment = fragment;
        game.appendChild(fragment);

        // console.log(firstFragment.getCubesPositions());
        console.log("in create game: " + currentFragment.getCubesPositions());

        return game;
    } //close createGame


    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {


        processInput(_event);
        f.RenderManager.update();
        viewport.draw();

        console.log("handleKeyDown after keypress transform: " + currentFragment.getCubesPositions());

        // checkIfHit();
        // if (checkIfHit) {
        //     //fragment fest setzen und neues erstellen
        // }


    } //close handleKeyDown


    function checkIfHit(): boolean {

        // console.log(firstFragment.getCubesPositions());
        console.log(currentFragment.getCubesPositions());

        // for (let fragment of game.getChildren()) {
        //     console.log("1. durch alle game.getChildren");
        //     if (fragment != currentFragment && fragment instanceof Fragment) {
        //         console.log("2. if fragment != currentFragment und Fragment instace");
        //         for (let othersPosition of fragment.getCubesPositions()) {
        //             console.log("3. for otherpositions of fragment.getCubesPositions");
        //             for (let currentPosition of currentFragment.getCubesPositions()) {
        //                 console.log("4. for currentPos of currentFrag.getCubesPositions");
        //                 console.log("other: " + othersPosition);
        //                 console.log("current: " + currentPosition);
        //                 if (othersPosition == currentPosition) {
        //                     console.log("5. If hit");

        //                     return true;
        //                 }
        //             }

        //         }


        //     }
        // }
        return false;
    } //close checkIfHit


    function processInput(_event: KeyboardEvent): void {
        //bewegung
        switch (_event.code) {
            case f.KEYBOARD_CODE.W: //W später raus nehmen
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
    } //close process Input


} //close Namespace