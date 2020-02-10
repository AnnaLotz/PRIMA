///<reference types="../Fudge/FudgeCore.js"/> 
namespace L11_FudgeCraft_Compression {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    document.addEventListener("DOMContentLoaded", handleLoad);

    export let game: f.Node = new f.Node("Game");
    export let grid: Grid = new Grid();
    let camera: CameraOrbit;
    let fragment: Fragment;
    let currentFragment: Fragment;
    let rotator: f.Node = new f.Node("Rotator");

    interface Rows {
        [y: number]: GridElement[];
    }
    // export let rows: Rows = {};

    //SETUP
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden

        camera = new CameraOrbit();
        rotator.appendChild(camera);

        //Light
        let cmpLight: f.ComponentLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        game.addComponent(cmpLight);

        let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("GREY")));
        game.addComponent(cmpLightAmbient);

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

        rotator.addComponent(new f.ComponentTransform());
        game.appendChild(rotator);

        //Boden erstellen
        for (let x: number = -5; x < 6; x++) {
            for (let z: number = -5; z < 6; z++) {
                let position: f.Vector3 = new f.Vector3(x, 0, z);
                let cube: Cube = new Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.CSS("WHITE"))));
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement(cube));
            }
        }

        let rndFragNum: number = Math.floor(Math.random() * 7);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);

        f.RenderManager.update();
        viewport.draw();
    } //close createStart


    //WHILE GAME
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event: KeyboardEvent): void {

        // let key: f.KEYBOARD_CODE = f.KEYBOARD_CODE;
        if (_event.code == f.KEYBOARD_CODE.W || _event.code == f.KEYBOARD_CODE.A || _event.code == f.KEYBOARD_CODE.S ||
            _event.code == f.KEYBOARD_CODE.D || _event.code == f.KEYBOARD_CODE.Q || _event.code == f.KEYBOARD_CODE.E) {
            moveFragment(_event, 1);
            if (checkIfHit()) {
                moveFragment(_event, -1); //die bewegung rückgängig machen
                fragment.setAtPosition();
                findFullRows();
                createNewFragment();
            }
        } else if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT) {
            rotateAroundNode(-90, rotator);
            if (checkIfHit()) {
                rotateAroundNode(90, rotator);
            }
        } else if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT) {
            rotateAroundNode(90, rotator);
            if (checkIfHit()) {
                rotateAroundNode(-90, rotator);
            }
        }
    } //close handleKeyDown


    function createNewFragment(): void {
        rotator.removeChild(currentFragment);
        let rndFragNum: number = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 10, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);

        f.RenderManager.update();
        viewport.draw();

        if (checkIfHit()) {
            console.log("GameOver");
        }
    } //close createNewFragment


    function checkIfHit(): boolean {
        for (let cube of currentFragment.getChildren()) {
            let element: GridElement = grid.pull(cube.mtxWorld.translation);
            if (element) {
                return true;
            }
        }
        return false;
    } //close checkIfHit


    function findFullRows(): void {

        let rows: Rows = {};
        fillRowsArray(rows);

        // let rowsToSlide: number[] = [];
        //volle rows finden
        for (let y in rows) {
            console.log("Testet Reihe " + y);
            if (rows[y].length >= 4) {

                grid.popRow(Number(y));
                rows[y] = []; //Array wird irgendwie nicht richtig geleert?
                console.log(rows[y]);
                grid.slideRowsDown(Number(y));
                // rowsToSlide.push(Number(y));
                
            }

        }
        
        // console.log(rowsToSlide);
        // for (let i: number = 0; i < rowsToSlide.length; i++) {
        //     grid.slideRowsDown(rowsToSlide[i]);
        // }

        fillRowsArray(rows);
        console.log("rows:");
        console.log(rows);

        f.RenderManager.update();
        viewport.draw();

    } //close findFullRow


    function fillRowsArray(_rows: Rows): void {
        _rows = [];
        for (let element of grid.values()) {
            let yPos: number = element.cube.mtxWorld.translation.y;
            if (yPos != 0) {
                if (_rows[yPos] == undefined)
                    _rows[yPos] = [element];
                else
                    _rows[yPos].push(element);
            }
        }

    }


    //MOVEMENT
    // ############################################################################################
    // ############################################################################################

    function moveFragment(_event: KeyboardEvent, _moveOn: number): void {
        //Bewegung
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


    function rotateAroundNode(_direction: number, _node: f.Node): void {

        _node.cmpTransform.local.rotateY(- _direction);
        f.RenderManager.update();
        viewport.draw();

    }//close rotateFragmentAround


} //close Namespace