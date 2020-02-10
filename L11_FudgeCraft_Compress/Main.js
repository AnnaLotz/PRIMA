"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L11_FudgeCraft_Compression;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L11_FudgeCraft_Compression) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    L11_FudgeCraft_Compression.game = new f.Node("Game");
    L11_FudgeCraft_Compression.grid = new L11_FudgeCraft_Compression.Grid();
    let camera;
    let fragment;
    let currentFragment;
    let rotator = new f.Node("Rotator");
    // export let rows: Rows = {};
    //SETUP
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        camera = new L11_FudgeCraft_Compression.CameraOrbit();
        rotator.appendChild(camera);
        //Light
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L11_FudgeCraft_Compression.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L11_FudgeCraft_Compression.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L11_FudgeCraft_Compression.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L11_FudgeCraft_Compression.game.addComponent(cmpLight);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("GREY")));
        L11_FudgeCraft_Compression.game.addComponent(cmpLightAmbient);
        //Viewport
        L11_FudgeCraft_Compression.viewport = new f.Viewport();
        L11_FudgeCraft_Compression.viewport.initialize("Viewport", L11_FudgeCraft_Compression.game, camera.getComponent(f.ComponentCamera), canvas);
        L11_FudgeCraft_Compression.viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst
        createStart();
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad
    function createStart() {
        rotator.addComponent(new f.ComponentTransform());
        L11_FudgeCraft_Compression.game.appendChild(rotator);
        //Boden erstellen
        for (let x = -5; x < 6; x++) {
            for (let z = -5; z < 6; z++) {
                let position = new f.Vector3(x, 0, z);
                let cube = new L11_FudgeCraft_Compression.Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.CSS("WHITE"))));
                cube.cmpTransform.local.translation = position;
                L11_FudgeCraft_Compression.grid.push(position, new L11_FudgeCraft_Compression.GridElement(cube));
            }
        }
        let rndFragNum = Math.floor(Math.random() * 7);
        fragment = new L11_FudgeCraft_Compression.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);
        f.RenderManager.update();
        L11_FudgeCraft_Compression.viewport.draw();
    } //close createStart
    //WHILE GAME
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event) {
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
        }
        else if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT) {
            rotateAroundNode(-90, rotator);
            if (checkIfHit()) {
                rotateAroundNode(90, rotator);
            }
        }
        else if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT) {
            rotateAroundNode(90, rotator);
            if (checkIfHit()) {
                rotateAroundNode(-90, rotator);
            }
        }
    } //close handleKeyDown
    function createNewFragment() {
        rotator.removeChild(currentFragment);
        let rndFragNum = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new L11_FudgeCraft_Compression.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 10, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);
        f.RenderManager.update();
        L11_FudgeCraft_Compression.viewport.draw();
        if (checkIfHit()) {
            console.log("GameOver");
        }
    } //close createNewFragment
    function checkIfHit() {
        for (let cube of currentFragment.getChildren()) {
            let element = L11_FudgeCraft_Compression.grid.pull(cube.mtxWorld.translation);
            if (element) {
                return true;
            }
        }
        return false;
    } //close checkIfHit
    function findFullRows() {
        let rows = {};
        fillRowsArray(rows);
        // let rowsToSlide: number[] = [];
        //volle rows finden
        for (let y in rows) {
            console.log("Testet Reihe " + y);
            if (rows[y].length >= 4) {
                L11_FudgeCraft_Compression.grid.popRow(Number(y));
                rows[y] = []; //Array wird irgendwie nicht richtig geleert?
                console.log(rows[y]);
                L11_FudgeCraft_Compression.grid.slideRowsDown(Number(y));
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
        L11_FudgeCraft_Compression.viewport.draw();
    } //close findFullRow
    function fillRowsArray(_rows) {
        _rows = [];
        for (let element of L11_FudgeCraft_Compression.grid.values()) {
            let yPos = element.cube.mtxWorld.translation.y;
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
    function moveFragment(_event, _moveOn) {
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
        L11_FudgeCraft_Compression.viewport.draw();
    } //close process Input
    function rotateAroundNode(_direction, _node) {
        _node.cmpTransform.local.rotateY(-_direction);
        f.RenderManager.update();
        L11_FudgeCraft_Compression.viewport.draw();
    } //close rotateFragmentAround
})(L11_FudgeCraft_Compression || (L11_FudgeCraft_Compression = {})); //close Namespace
//# sourceMappingURL=Main.js.map