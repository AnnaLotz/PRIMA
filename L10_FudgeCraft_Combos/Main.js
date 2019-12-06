"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L10_FudgeCraft_Combos;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L10_FudgeCraft_Combos) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    L10_FudgeCraft_Combos.game = new f.Node("Game");
    L10_FudgeCraft_Combos.grid = new L10_FudgeCraft_Combos.Grid();
    let camera;
    let fragment;
    let currentFragment;
    let rotator = new f.Node("Rotator");
    //SETUP
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        camera = new L10_FudgeCraft_Combos.CameraOrbit();
        rotator.appendChild(camera);
        //Light
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L10_FudgeCraft_Combos.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L10_FudgeCraft_Combos.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L10_FudgeCraft_Combos.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(50, 10, -50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L10_FudgeCraft_Combos.game.addComponent(cmpLight);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.GREY));
        L10_FudgeCraft_Combos.game.addComponent(cmpLightAmbient);
        //Viewport
        L10_FudgeCraft_Combos.viewport = new f.Viewport();
        L10_FudgeCraft_Combos.viewport.initialize("Viewport", L10_FudgeCraft_Combos.game, camera.getComponent(f.ComponentCamera), canvas);
        L10_FudgeCraft_Combos.viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst
        createStart();
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad
    function createStart() {
        rotator.addComponent(new f.ComponentTransform());
        console.log(rotator.cmpTransform.local.translation);
        L10_FudgeCraft_Combos.game.appendChild(rotator);
        //Boden erstellen
        for (let x = -5; x < 6; x++) {
            for (let z = -5; z < 6; z++) {
                let position = new f.Vector3(x, 0, z);
                let cube = new L10_FudgeCraft_Combos.Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.WHITE)));
                cube.cmpTransform.local.translation = position;
                L10_FudgeCraft_Combos.grid.push(position, new L10_FudgeCraft_Combos.GridElement(cube));
            }
        }
        let rndFragNum = Math.floor(Math.random() * 7);
        fragment = new L10_FudgeCraft_Combos.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);
        f.RenderManager.update();
        L10_FudgeCraft_Combos.viewport.draw();
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
        let rndFragNum = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new L10_FudgeCraft_Combos.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 10, 5));
        currentFragment = fragment;
        rotator.appendChild(fragment);
        f.RenderManager.update();
        L10_FudgeCraft_Combos.viewport.draw();
        if (checkIfHit()) {
            console.log("GameOver");
        }
    } //close createNewFragment
    function checkIfHit() {
        for (let cube of currentFragment.getChildren()) {
            let element = L10_FudgeCraft_Combos.grid.pull(cube.mtxWorld.translation);
            if (element) {
                return true;
            }
        }
        return false;
    } //close checkIfHit
    function findFullRows() {
        let rows = {};
        for (let element of L10_FudgeCraft_Combos.grid.values()) {
            let yPos = element.yPos;
            if (yPos != 0) {
                if (rows[yPos] == undefined)
                    rows[yPos] = [element];
                else
                    rows[yPos].push(element);
            }
        }
        console.log(rows);
        for (let y in rows) {
            console.log(y);
            if (rows[y].length >= 5) {
                deleteRow(Number(y));
            }
        }
    } //close findFullRow
    function deleteRow(_row) {
        console.log("over 5 in row " + _row);
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
        L10_FudgeCraft_Combos.viewport.draw();
    } //close process Input
    function rotateAroundNode(_direction, _node) {
        console.log("rotate" + _direction);
        _node.cmpTransform.local.rotateY(-_direction);
        f.RenderManager.update();
        L10_FudgeCraft_Combos.viewport.draw();
    } //close rotateFragmentAround
})(L10_FudgeCraft_Combos || (L10_FudgeCraft_Combos = {})); //close Namespace
//# sourceMappingURL=Main.js.map