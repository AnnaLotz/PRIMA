///<reference types="../Fudge/FudgeCore.js"/> 
namespace L09_FudgeCraft_Camera {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);

    export let game: f.Node;
    export let grid: Grid;
    let fragment: Fragment;
    let currentFragment: Fragment;

    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event: Event): void {

        // grid.set("Jonas", new Cube(new f.Vector3(3, 3, 0), new f.Material("Cyan", f.ShaderFlat, new f.CoatColored(f.Color.CYAN))));
        // console.log(grid);


        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translate(new f.Vector3(0, 6, 30)); // kamera auf ort setzen
        cmpCam.backgroundColor = f.Color.DARK_GREY;
        // cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen

        //create Game Node
        game = new f.Node("Game");
        grid = new Grid();

        //Light
        let cmpLight: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 0, 0.5));
        game.addComponent(cmpLight);
        let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.GREY));
        game.addComponent(cmpLightAmbient);

        //Viewport
        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst

        createStart();
        window.addEventListener("keydown", handleKeyDown);
        viewport.draw();
        console.log("Setup done");
    } //close handleLoad


    function createStart(): void {

        // let rndFragNum: number = Math.floor(Math.random() * 7);
        // fragment = new Fragment(rndFragNum);
        // fragment.addComponent(new f.ComponentTransform());
        // fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 10));
        // currentFragment = fragment;
        // game.appendChild(currentFragment);

        for (let x: number = -6; x < 6; x++) {
            for (let z: number = -6; z < 6; z++) {
                let position: f.Vector3 = new f.Vector3(x, 0, z);
                let cube: Cube = new Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.WHITE)));
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement(cube));
                console.log("set cube at pos: " + position);
            }

        }

        console.log(grid);

        let rndFragNum: number = Math.floor(Math.random() * 7);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        game.appendChild(fragment);

        f.RenderManager.update();
        // viewport.draw();
    } //close createStart


    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {

        processInput(_event, 1);

        if (checkIfHit()) {
            processInput(_event, -1); //die bewegung rückgängig machen
            // f.RenderManager.update();
            fragment.setAtPosition();
            createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
        }
    } //close handleKeyDown


    function checkIfHit(): boolean {


        for (let cube of currentFragment.getChildren()) {
            let element: GridElement = grid.pull(cube.mtxWorld.translation);
            if (element) {
                return true;
            }
        }
        return false;

    } //close checkIfHit


    function createNewFragment(): void {
        let rndFragNum: number = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        game.appendChild(fragment);

        f.RenderManager.update();
        viewport.draw();
    } //close createNewFragment


    function processInput(_event: KeyboardEvent, _moveOn: number): void {

        //bewegung
        switch (_event.code) {
            case f.KEYBOARD_CODE.W: //W später raus nehmen
                currentFragment.cmpTransform.local.translateY(_moveOn * 1);
                break;
            case f.KEYBOARD_CODE.A:
                currentFragment.cmpTransform.local.translateX(_moveOn * -1);
                break;
            case f.KEYBOARD_CODE.D:
                currentFragment.cmpTransform.local.translateX(_moveOn * 1);
                break;
            case f.KEYBOARD_CODE.S:
                currentFragment.cmpTransform.local.translateY(_moveOn * -1);
                break;
        }
        //Rotation
        switch (_event.code) {
            case f.KEYBOARD_CODE.Q:
                currentFragment.cmpTransform.local.rotateZ(_moveOn * 90);
                break;
            case f.KEYBOARD_CODE.E:
                currentFragment.cmpTransform.local.rotateZ(_moveOn * -90);
                break;
        }

        f.RenderManager.update();
        viewport.draw();
    } //close process Input


} //close Namespace