///<reference types="../Fudge/FudgeCore.js"/> 
namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);

    export let game: f.Node;
    export let grid: Grid;
    let fragment: Fragment;
    let currentFragment: Fragment;
    let firstFragment: Fragment;

    // interface Collision {
    //     element: GridElement;
    //     thisCube: Cube;
    // }


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
        createStart();

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

        window.addEventListener("keydown", handleKeyDown);
        


        console.log("Setup done");
    } //close handleLoad


    function createStart(): f.Node {

        let rndFragNum: number = Math.floor(Math.random() * 7);
        fragment = new Fragment(rndFragNum);
        firstFragment = fragment;
        game.appendChild(firstFragment);


        for (let cube of firstFragment.getChildren()) {
            f.RenderManager.update();
            let position: f.Vector3 = cube.mtxWorld.translation;
            console.log(cube.mtxWorld.translation.toString());
            // cube.cmpTransform.local.translation = position;
            // grid.push(position, new GridElement(cube));
        }

        // rndFragNum = Math.floor(Math.random() * fragment.fragmentDef.length);
        // fragment = new Fragment(rndFragNum);
        // fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 7, 0))));
        // currentFragment = fragment;
        // game.appendChild(fragment);

        return game;
    } //close createGame


    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {
        
        processInput(_event, 1);

        if (checkIfHit()) {
            processInput(_event, -1); //die bewegung rückgängig machen
            for (let cube of currentFragment.getChildren()) {
                let position: f.Vector3 = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement());
            }
            createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
        }
    } //close handleKeyDown


    function checkIfHit(): boolean {

        // console.log("firstFrag: " + firstFragment.getCubesPositions());
        // console.log("currentFrag: " + currentFragment.getCubesPositions());

        // let collisions: Collision[] = [];
        
        for (let cube of currentFragment.getChildren()) {
            let element: GridElement = grid.pull(cube.mtxWorld.translation);
            console.log(element);
            if (element) {
                
                // collisions.push({ element, cube });
                return true;
            }
        }
        return false;



        // for (let fragment of game.getChildren()) {
        //     // console.log("1. durch alle game.getChildren");
        //     if (fragment != currentFragment && fragment instanceof Fragment) {
        //         // console.log("2. if fragment != currentFragment und Fragment instace");
        //         for (let othersPosition of fragment.getCubesPositions()) {
        //             // console.log("3. for otherpositions of fragment.getCubesPositions");
        //             for (let currentPosition of currentFragment.getCubesPositions()) {
        //                 // console.log("4. for currentPos of currentFrag.getCubesPositions");
        //                 // console.log(othersPosition);
        //                 // console.log(currentPosition);
        //                 if (othersPosition[0] == currentPosition[0] && othersPosition[1] == currentPosition[1]) {
        //                     console.log("HIT!");
        //                     return true;
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }
        // return false;
    } //close checkIfHit


    function createNewFragment(): void {
        let rndFragNum: number = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 0));
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