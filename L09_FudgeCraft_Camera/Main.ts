///<reference types="../Fudge/FudgeCore.js"/> 
namespace L09_FudgeCraft_Camera {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);

    export let game: f.Node = new f.Node("Game");
    export let grid: Grid = new Grid();
    let camera: CameraOrbit;
    let fragment: Fragment;
    let currentFragment: Fragment;

    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event: Event): void {

        console.log("Hello World");
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden

        camera = new CameraOrbit();
        game.appendChild(camera);

        //Light
        let cmpLight: f.ComponentLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(30, 10, 30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-30, 10, 30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-30, 10, -30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(30, 10, -30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);

        // let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.WHITE));
        // game.addComponent(cmpLightAmbient);

        //Viewport
        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst

        createStart();
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad


    function createStart(): void {

        //Boden erstellen
        for (let x: number = -6; x < 6; x++) {
            for (let z: number = -6; z < 6; z++) {
                let position: f.Vector3 = new f.Vector3(x, 0, z);
                let cube: Cube = new Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.WHITE)));
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement(cube));
                // console.log("set cube at pos: " + position);
            }
        }
        // console.log(grid);

        let rndFragNum: number = Math.floor(Math.random() * 7);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        game.appendChild(fragment);

        f.RenderManager.update();
        viewport.draw();
    } //close createStart


    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {

        // let key: f.KEYBOARD_CODE = f.KEYBOARD_CODE;
        if (_event.code == f.KEYBOARD_CODE.W || _event.code == f.KEYBOARD_CODE.A || _event.code == f.KEYBOARD_CODE.S ||
            _event.code == f.KEYBOARD_CODE.D || _event.code == f.KEYBOARD_CODE.Q || _event.code == f.KEYBOARD_CODE.E) {
            moveFragment(_event, 1);
            if (checkIfHit()) {
                moveFragment(_event, -1); //die bewegung rückgängig machen
                // f.RenderManager.update();
                fragment.setAtPosition();
                createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
            }
        } else if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT) {
            console.log("rotate left");
            rotateFragmentAround(-90);
            camera.rotateY(-90);
        } else if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT) {
            console.log("rotate right");
            rotateFragmentAround(90);
            camera.rotateY(90);
        }

    } //close handleKeyDown

    function rotateFragmentAround(_direction: number): void {
        // let vectorToCurrent: f.Vector3 = currentFragment.mtxWorld.translation;
        // console.log(vectorToCurrent);
        for (let cube of currentFragment.getChildren()) {
            let pos: f.Vector3 = cube.mtxWorld.translation;
            console.log(pos.get());
            pos.set(-pos.z, pos.y, pos.x);
            // let newPos: f.Vector3 = new f.Vector3(-pos.z, pos.y, pos.x);
            // newPos.x = pos.z * -1;
            // newPos.z = pos.x;
            // console.log("newPos: " + newPos);
            console.log(pos.get());


            let vctPosition: f.Vector3 = f.Vector3.ZERO();
            vctPosition.set(pos.x, pos.y, pos.z);

            cube.cmpTransform.local.translation.x = pos.x;
            

            currentFragment.cmpTransform.local.translation = pos;

            f.RenderManager.update();
            viewport.draw();

            // cube.cmpTransform.local.translate(newPos);
            // cube.cmpTransform.local.translation.set(pos);


            // cube.mtxWorld.translation.set(newPos);
            // cube.mtxWorld.translation.x = newPos.x;
            // cube.mtxWorld.translate(newPos);
            // cube.mtxWorld.translateX(newPos.x);
            // cube.cmpTransform.local.translation.set(pos);
            // cube.cmpTransform.local.translate(pos);

            // let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(newPos));
            // // cube.addComponent(cmpTransform);
            // cube.transformComp = cmpTransform;

            // cube.mtxWorld.translation.x = newPos.x;
            // cube.mtxWorld.translateX = newPos.x;

            // let newContainer: f.Node = new f.Node("Container");
            // let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(pos));
            // newContainer.addComponent(cmpTransform);


            // let vctPosition: f.Vector3 = f.Vector3.ZERO();
            // vctPosition.set(newPos.x, newPos.y, newPos.z);


            // fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
            // cube.cmpTransform.local.translate(new f.Vector3(-pos.z, pos.y, pos.x));


            // cube.cmpTransform.local.translation = new f.Vector3(-pos.z, pos.y, pos.x);
            // cube.cmpTransform.local.translation.set(vctPosition);

            // cube.cmpTransform.
            // console.log("newPos: " + newPos);
            // cube.mtxWorld.translation.set(-pos.z, pos.y, pos.x);
            // cube.mtxWorld.translate(newPos);
            // cube.cmpTransform.local.translation.y = 2;
            // cube.cmpTransform.local.translate(newPos);
        }
        
    }//close rotateFragmentAround


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


    function moveFragment(_event: KeyboardEvent, _moveOn: number): void {

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